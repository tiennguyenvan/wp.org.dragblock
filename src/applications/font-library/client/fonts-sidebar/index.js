import { _n } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import { DragBlockLastFrom } from '../utils';
import './fonts-sidebar.css';
import { Button } from '@wordpress/components';
import { trash } from '@wordpress/icons';
function DragBlockLastParent( {
	title,
	fontsOutline,
	handleDeleteFontFace,
	handleDeleteFontFamily,
} ) {
	const [ fileSizes, setFileSizes ] = useState( {} );
	const DragBlockLastJustify = Object.keys( fontsOutline )
		.map( ( family ) => {
			return fontsOutline[ family ].faces.map( ( face ) => {
				return {
					family,
					weight: face.weight,
					style: face.style,
					src: face.src,
				};
			} );
		} )
		.flat();
	useEffect( () => {
		const promises = DragBlockLastJustify.map( ( face ) => {
			return fetch( face.src, { method: 'HEAD' } );
		} );
		Promise.all( promises ).then( ( responses ) => {
			const sizes = {};
			responses.forEach( ( response ) => {
				sizes[ response.url ] =
					response.headers.get( 'content-length' );
			} );
			setFileSizes( sizes );
		} );
	}, [ fontsOutline ] );
	const DragBlockLastAlign = Object.keys( fontsOutline ).reduce(
		( acc, family ) => {
			return acc + fontsOutline[ family ].faces.length;
		},
		0
	);
	const DragBlockLastEnable = ( url ) => {
		return fileSizes[ url ] ? DragBlockLastFrom( fileSizes[ url ] ) : null;
	};
	const DragBlockLastGet = DragBlockLastFrom(
		DragBlockLastJustify.reduce( ( acc, face ) => {
			return acc + parseInt( fileSizes[ face.src ] );
		}, 0 )
	);
	return (
		<div className="sidebar">
			<div className="sidebar-container">
				<div className="variants-outline">
					<h2>{ title }</h2>
					<h3>{ fontsOutline.family }</h3>
					{ !! fontsOutline && (
						<>
							<div className="variants-list">
								<div className="content">
									{ Object.keys( fontsOutline ).map(
										( key, i ) => (
											<div
												className="variants-family"
												key={ `variants-family-${ i }` }
											>
												<div className="header">
													<span className="name">
														{
															fontsOutline[ key ]
																.family
														}{ ' ' }
													</span>
													<div>
														<span className="variants">
															{ !! fontsOutline[
																key
															].faces.length && (
																<>
																	({ ' ' }
																	{
																		fontsOutline[
																			key
																		].faces
																			.length
																	}{ ' ' }
																	{ _n(
																		'Variant',
																		'Variants',
																		fontsOutline[
																			key
																		].faces
																			.length,
																		'dragblock'
																	) }{ ' ' }
																	)
																</>
															) }
														</span>
														<Button
															icon={ trash }
															iconSize={ 15 }
															isSmall
															onClick={ () =>
																handleDeleteFontFamily(
																	fontsOutline[
																		key
																	].family
																)
															}
														/>
													</div>
												</div>
												{ fontsOutline[ key ].faces.map(
													( face, faceIndex ) => (
														<div
															className="variant-row"
															key={ `selected-variant-${ faceIndex }` }
														>
															<div className="variant">
																{ face.weight }{ ' ' }
																{ face.style }
															</div>
															<div className="size">
																{ DragBlockLastEnable(
																	face.src
																) }
															</div>
															<div>
																<Button
																	onClick={ () =>
																		handleDeleteFontFace(
																			fontsOutline[
																				key
																			]
																				.family,
																			face.weight,
																			face.style
																		)
																	}
																	icon={
																		trash
																	}
																	iconSize={
																		15
																	}
																	isSmall
																/>
															</div>
														</div>
													)
												) }
											</div>
										)
									) }
								</div>
							</div>
						</>
					) }
					<div className="variants-total">
						<div className="variant">
							{ DragBlockLastAlign }{ ' ' }
							{ _n(
								'Variant',
								'Variants',
								DragBlockLastAlign,
								'dragblock'
							) }
						</div>
						<div className="size">{ DragBlockLastGet }</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default DragBlockLastParent;