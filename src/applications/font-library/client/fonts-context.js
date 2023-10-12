import { useState, createContext } from '@wordpress/element';
import { DragBlockBox, DragBlockBorder } from './constants';
export const DragBlockLastAppearance = createContext();
export function DragBlockLastEdit( { children } ) {
	const [ demoType, setDemoType ] = useState(
		localStorage.getItem( 'cbt_default-demo-type' ) || DragBlockBorder
	);
	const [ demoText, setDemoText ] = useState(
		localStorage.getItem( 'cbt_default-demo-text' ) ||
			DragBlockBox[ demoType ].text
	);
	const [ demoFontSize, setDemoFontSize ] = useState(
		parseInt( localStorage.getItem( 'cbt_default-demo-font-size' ) ) ||
			DragBlockBox[ demoType ].size
	);
	const [ axes, setAxes ] = useState( {} );
	const DragBlockLastSave = ( tag, value ) => {
		setAxes( {
			...axes,
			[ tag ]: {
				...axes[ tag ],
				currentValue: value,
			},
		} );
	};
	const DragBlockLastInline = ( newDemoText ) => {
		setDemoText( newDemoText );
		localStorage.setItem( 'cbt_default-demo-text', newDemoText );
	};
	const DragBlockLastFont = ( newDemoType ) => {
		setDemoType( newDemoType );
		localStorage.setItem( 'cbt_default-demo-type', newDemoType );
		DragBlockLastDisplay( newDemoType );
	};
	const DragBlockLastBg = ( newDemoFontSize ) => {
		setDemoFontSize( newDemoFontSize );
		localStorage.setItem( 'cbt_default-demo-font-size', newDemoFontSize );
	};
	const DragBlockLastDisplay = ( newDemoType ) => {
		DragBlockLastInline( DragBlockBox[ newDemoType || demoType ].text );
		DragBlockLastBg(
			DragBlockBox[ newDemoType || demoType ].size
		);
	};
	const [ familiesOpen, setFamiliesOpen ] = useState(
		JSON.parse( localStorage.getItem( 'cbt_families-open' ) ) || []
	);
	const DragBlockLastFlex = ( familyName ) => {
		let DragBlockLastInner = [];
		if ( familiesOpen.includes( familyName ) ) {
			DragBlockLastInner = familiesOpen.filter(
				( name ) => name !== familyName
			);
		} else {
			DragBlockLastInner = [ ...familiesOpen, familyName ];
		}
		setFamiliesOpen( DragBlockLastInner );
		localStorage.setItem(
			'cbt_families-open',
			JSON.stringify( DragBlockLastInner )
		);
	};
	return (
		<DragBlockLastAppearance.Provider
			value={ {
				demoText,
				DragBlockLastInline,
				DragBlockLastDisplay,
				demoType,
				DragBlockLastFont,
				demoFontSize,
				DragBlockLastBg,
				familiesOpen,
				DragBlockLastFlex,
				axes,
				DragBlockLastSave,
			} }
		>
			{ children }
		</DragBlockLastAppearance.Provider>
	);
}