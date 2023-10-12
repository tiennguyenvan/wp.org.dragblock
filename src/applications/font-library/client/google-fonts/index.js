import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { store } from '@wordpress/core-data';
import { SelectControl, Spinner, Button } from '@wordpress/components';
import { Font } from 'lib-font';
import DragBlockLastParent from '../fonts-sidebar';
import DragBlockLastTooltip from './font-variant';
import {
	DragBlockLastTriplet,
	getStyleFromGoogleVariant,
	DragBlockLastEncode,
	getGoogleVariantFromStyleAndWeight,
} from '../utils';
import DragBlockDropdown from '../demo-text-input';
import DragBlockLastChild from '../fonts-page-layout';
import './google-fonts.css';
import BackButton from '../manage-fonts/back-button';
const DragBlockLastItem = {};
function DragBlockLastMax() {
	const [ googleFontsData, setGoogleFontsData ] = useState( {} );
	const [ selectedFont, setSelectedFont ] = useState( null );
	const [ selectedFontCredits, setSelectedFontCredits ] = useState( {} );
	const [ selectionData, setSelectionData ] =
		useState( DragBlockLastItem );
	const nonce = document.querySelector( '#nonce' ).value;
	const DragBlockLastMask = ( family ) => {
		const DragBlockLastCltr = selectionData[ family ];
		if ( DragBlockLastCltr && !! DragBlockLastCltr?.faces?.length ) {
			const { [ family ]: removedFamily, ...rest } = selectionData;
			setSelectionData( rest );
		} else {
			const DragBlockLastDevice = {
				family,
				faces: selectedFont.variants.map( ( variant ) => {
					return {
						weight: DragBlockLastTriplet( variant ),
						style: getStyleFromGoogleVariant( variant ),
						src: DragBlockLastEncode( selectedFont.files[ variant ] ),
					};
				} ),
			};
			setSelectionData( {
				...selectionData,
				[ family ]: DragBlockLastDevice,
			} );
		}
	};
	const DragBlockLastBlock = ( family, weight, style ) => {
		const DragBlockLastCltr = selectionData[ family ];
		if ( DragBlockLastCltr ) {
			const DragBlockLastTag = DragBlockLastCltr.faces.find( ( face ) => {
				return face.weight === weight && face.style === style;
			} );
			return !! DragBlockLastTag;
		}
		return false;
	};
	const DragBlockLastUse = ( family, weight, style ) => {
		const DragBlockLastCltr = selectionData[ family ];
		const variant = getGoogleVariantFromStyleAndWeight( style, weight );
		if ( DragBlockLastCltr ) {
			setSelectionData( {
				...selectionData,
				[ family ]: {
					...DragBlockLastCltr,
					faces: [
						...( DragBlockLastCltr?.faces || [] ),
						{
							weight,
							style,
							src: DragBlockLastEncode( selectedFont.files[ variant ] ),
						},
					],
				},
			} );
		} else {
			setSelectionData( {
				...selectionData,
				[ family ]: {
					family,
					faces: [
						{
							weight,
							style,
							src: DragBlockLastEncode( selectedFont.files[ variant ] ),
						},
					],
				},
			} );
		}
	};
	const DragBlockLastTo = ( family, weight, style ) => {
		const DragBlockLastCltr = selectionData[ family ];
		const DragBlockLastAttributes = DragBlockLastCltr.faces.filter(
			( face ) => ! ( face.weight === weight && face.style === style )
		);
		if ( ! DragBlockLastAttributes.length ) {
			const { [ family ]: removedFamily, ...rest } = selectionData;
			setSelectionData( rest );
		} else {
			setSelectionData( {
				...selectionData,
				[ family ]: {
					...DragBlockLastCltr,
					faces: DragBlockLastAttributes,
				},
			} );
		}
	};
	const DragBlockLastFind = ( family, weight, style ) => {
		if ( DragBlockLastBlock( family, weight, style ) ) {
			DragBlockLastTo( family, weight, style );
		} else {
			DragBlockLastUse( family, weight, style );
		}
	};
	useEffect( () => {
		( async () => {
			const DragBlockLastSet = await fetch(
				dragBlockFontLib.googleFontsDataUrl
			);
			const DragBlockLastDel = await DragBlockLastSet.json();
			setGoogleFontsData( DragBlockLastDel );
		} )();
	}, [] );
	const theme = useSelect( ( select ) => {
		return select( store ).getCurrentTheme();
	}, null );
	const DragBlockLastUpdated = ( selectedFontObj ) => {
		const DragBlockLastSuggestion = new Font( selectedFontObj.family );
		let DragBlockLastArray = false;
		let DragBlockLastQuery = Object.values( selectedFontObj.files )[ 0 ];
		if ( DragBlockLastQuery.includes( 'http://' ) ) {
			DragBlockLastQuery = DragBlockLastQuery.replace( 'http://', 'https://' );
		}
		DragBlockLastSuggestion.src = DragBlockLastQuery;
		DragBlockLastSuggestion.onerror = ( event ) => {
			console.error( event );
			DragBlockLastArray = true;
		};
		if ( ! DragBlockLastArray ) {
			DragBlockLastSuggestion.onload = ( event ) => DragBlockLastParam( event );
			function DragBlockLastParam( event ) {
				const font = event.detail.font;
				const { name } = font.opentype.tables;
				const DragBlockLastAvailable = {
					copyright: name.get( 0 ),
					source: name.get( 11 ),
					license: name.get( 13 ),
					licenseURL: name.get( 14 ),
				};
				setSelectedFontCredits( DragBlockLastAvailable );
			}
		}
	};
	const DragBlockLastAdded = ( value ) => {
		setSelectedFont( googleFontsData.items[ value ] );
		DragBlockLastUpdated( googleFontsData.items[ value ] );
	};
	let DragBlockLastDatabase = '';
	if ( selectedFont ) {
		DragBlockLastDatabase = selectedFont.family
			.toLowerCase()
			.replace( ' ', '-' );
	}
	return (
		<DragBlockLastChild>
			<main>
				<header>
					<BackButton />
					<h1 className="wp-heading-inline">
						{ __(
							'Add Google fonts',
							'dragblock'
						) }
					</h1>
					<p>
						{ __(
							'Add Google fonts assets and font face definitions to the DragBlock\'s font library',
							'dragblock'
						) }{ ' ' }
					</p>
				</header>
				{ ! googleFontsData?.items && (
					<p>
						<Spinner />
						<span>
							{ __(
								'Loading Google fonts data…',
								'dragblock'
							) }
						</span>
					</p>
				) }
				{ googleFontsData?.items && (
					<>
						<div className="select-font">
							<SelectControl
								label={ __(
									'Select Font',
									'dragblock'
								) }
								name="google-font"
								onChange={ DragBlockLastAdded }
								size="__unstable-large"
							>
								<option value={ null }>
									{ __(
										'Select a font…',
										'dragblock'
									) }
								</option>
								{ googleFontsData.items.map(
									( font, index ) => (
										<option
											value={ index }
											key={ `option${ index }` }
										>
											{ font.family }
										</option>
									)
								) }
							</SelectControl>
						</div>
						<DragBlockDropdown />
						{ selectedFont && (
							<p>
								{ __(
									'Select the font variants you want to include:',
									'dragblock'
								) }
							</p>
						) }
						{ selectedFont && (
							<table
								className="wp-list-table widefat striped table-view-list"
								id="google-fonts-table"
							>
								<thead>
									<tr>
										<td className="">
											<input
												type="checkbox"
												id={ `select-all-${ DragBlockLastDatabase }` }
												onChange={ () =>
													DragBlockLastMask(
														selectedFont.family
													)
												}
												checked={
													selectedFont.variants
														.length ===
													selectionData[
														selectedFont.family
													]?.faces?.length
												}
											/>
										</td>
										<td className="">
											<label
												htmlFor={ `select-all-${ DragBlockLastDatabase }` }
											>
												{ __(
													'Weight',
													'dragblock'
												) }
											</label>
										</td>
										<td className="">
											<label
												htmlFor={ `select-all-${ DragBlockLastDatabase }` }
											>
												{ __(
													'Style',
													'dragblock'
												) }
											</label>
										</td>
										<td className="">
											<label
												htmlFor={ `select-all-${ DragBlockLastDatabase }` }
											>
												{ __(
													'Preview',
													'dragblock'
												) }
											</label>
										</td>
									</tr>
								</thead>
								<tbody>
									{ selectedFont.variants.map(
										( variant, i ) => (
											<DragBlockLastTooltip
												font={ selectedFont }
												variant={ variant }
												key={ `font-variant-${ i }` }
												isSelected={ DragBlockLastBlock(
													selectedFont.family,
													DragBlockLastTriplet(
														variant
													),
													getStyleFromGoogleVariant(
														variant
													)
												) }
												handleToggle={ () =>
													DragBlockLastFind(
														selectedFont.family,
														DragBlockLastTriplet(
															variant
														),
														getStyleFromGoogleVariant(
															variant
														)
													)
												}
											/>
										)
									) }
								</tbody>
							</table>
						) }
						<form
							encType="multipart/form-data"
							action=""
							method="POST"
						>
							<input
								type="hidden"
								name="selection-data"
								value={ JSON.stringify(
									Object.values( selectionData )
								) }
							/>
							<input
								type="hidden"
								name="font-credits"
								value={ JSON.stringify( selectedFontCredits ) }
							/>
							<Button
								variant="primary"
								type="submit"
								disabled={
									Object.values( selectionData ).length === 0
								}
							>
								{ __(
									'Add Google fonts',
									'dragblock'
								) }
							</Button>
							<input type="hidden" name="nonce" value={ nonce } />
						</form>
					</>
				) }
			</main>
			<DragBlockLastParent
				title={ __( 'Selected Variants', 'dragblock' ) }
				fontsOutline={ selectionData }
				handleDeleteFontFace={ DragBlockLastFind }
				handleDeleteFontFamily={ DragBlockLastMask }
			/>
		</DragBlockLastChild>
	);
}
export default DragBlockLastMax;