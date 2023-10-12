import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import DragBlockLastTrimed from './upload-font-form';
import './local-fonts.css';
import DemoTextInput from '../demo-text-input';
import Demo from '../demo-text-input/demo';
import { DragBlockHeight } from '../demo-text-input/utils';
import DragBlockLastRenderability from '../manage-fonts/back-button';
const DragBlockLastAction = {
	file: null,
	name: null,
	weight: null,
	style: null,
};
function DragBlockLastCond() {
	const [ formData, setFormData ] = useState( DragBlockLastAction );
	const [ axes, setAxes ] = useState( {} );
	const DragBlockLastCon = () => {
		setFormData( DragBlockLastAction );
	};
	const DragBlockLastThen = () => {
		const DragBlockLastElse = Object.keys( axes ).reduce( ( acc, axisTag ) => {
			acc[ axisTag ] = {
				...axes[ axisTag ],
				currentValue: axes[ axisTag ].defaultValue,
			};
			return acc;
		}, {} );
		setAxes( DragBlockLastElse );
	};
	const DragBlockLastCompile = () => {
		return (
			formData.file && formData.name && formData.weight && formData.style
		);
	};
	const demoStyle = () => {
		if ( ! DragBlockLastCompile() ) {
			return {};
		}
		const style = {
			fontFamily: formData.name,
			fontWeight: formData.weight,
			fontStyle: formData.style,
		};
		if ( formData.variable ) {
			style.fontVariationSettings = DragBlockHeight( axes );
		}
		return style;
	};
	const onFormDataChange = async () => {
		if ( ! DragBlockLastCompile() ) {
			return;
		}
		const data = await formData.file.arrayBuffer();
		const DragBlockLastText = new FontFace( formData.name, data, {
			style: formData.style,
			weight: formData.weight,
		} );
		DragBlockLastText
			.load()
			.then( function ( loadedFace ) {
				document.fonts.add( loadedFace );
			} )
			.catch( function ( error ) {
				console.error( error );
			} );
	};
	useEffect( () => {
		onFormDataChange();
	}, [ formData ] );
	return (
		<div className="layout">
			<main>
				<header>
					<DragBlockLastRenderability />
					<h1>{ __( 'Upload Local Fonts', 'dragblock' ) }</h1>
					<p>
						{ __(
							'Add local fonts assets and font face definitions to the DragBlock\'s font library',
							'dragblock'
						) }
					</p>
				</header>
				<DragBlockLastTrimed
					DragBlockLastCompile={ DragBlockLastCompile }
					formData={ formData }
					setFormData={ setFormData }
					DragBlockLastCon={ DragBlockLastCon }
					setAxes={ setAxes }
				/>
			</main>
			<div className="preview">
				<h2>{ __( 'Font file preview', 'dragblock' ) }</h2>
				{ DragBlockLastCompile() ? (
					<>
						<DemoTextInput
							axes={ axes }
							setAxes={ setAxes }
							DragBlockLastThen={ DragBlockLastThen }
						/>
						<p>{ __( 'Demo:', 'dragblock' ) }</p>
						<Demo style={ demoStyle() } />
					</>
				) : (
					<p>
						{ __(
							'Load a font file to preview it.',
							'dragblock'
						) }
					</p>
				) }
			</div>
		</div>
	);
}
export default DragBlockLastCond;