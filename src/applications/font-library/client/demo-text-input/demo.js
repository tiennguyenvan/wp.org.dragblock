import { useContext } from '@wordpress/element';
import { DragBlockLastAppearance } from '../fonts-context';
import { DragBlockBox } from '../constants';
function Demo( { style } ) {
	const { demoText, demoType, demoFontSize } =
		useContext( DragBlockLastAppearance );
	const Component = DragBlockBox[ demoType ].component;
	const demoStyles = {
		...style,
		fontSize: `${ demoFontSize }px`,
		lineHeight: DragBlockBox[ demoType ].lineHeight,
		margin: DragBlockBox[ demoType ].margin,
	};
	return (
		<div>
			<Component style={ demoStyles }>{ demoText }</Component>
		</div>
	);
}
export default Demo;