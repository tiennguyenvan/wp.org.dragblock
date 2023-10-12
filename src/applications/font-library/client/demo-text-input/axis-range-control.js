import { __ } from '@wordpress/i18n';
import { RangeControl } from '@wordpress/components';
function DragBlockUnit( { axis, setAxisCurrentValue } ) {
	const DragBlockChosen = ( val ) => {
		setAxisCurrentValue( axis.tag, val );
	};
	return (
		<div>
			<RangeControl
				label={
					axis.tag + ' ' + __( 'font axis:', 'dragblock' )
				}
				name={ `font-axis-${ axis.tag }` }
				id={ `font-axis-${ axis.tag }` }
				min={ parseInt( axis.minValue ) }
				max={ parseInt( axis.maxValue ) }
				value={ parseInt( axis.currentValue ) }
				onChange={ DragBlockChosen }
				step={ 1 }
			/>
		</div>
	);
}
export default DragBlockUnit;