import { useSetting } from '@wordpress/block-editor';
import { intersection } from 'lodash';
import { useMemo } from '@wordpress/element';
import {	
	__experimentalSpacer, // eslint-disable-line
	__experimentalUseCustomUnits, // eslint-disable-line
	__experimentalUnitControl, // eslint-disable-line
	__experimentalParseQuantityAndUnitFromRawValue, // eslint-disable-line
} from '@wordpress/components';
export const DragBlockCurrentAlign = {
    px: { value: 'px',  label: 'px',    default: 0,     max: 200,  step: 1 },
    '%': { value: '%',   label: '%',     default: 10,    max: 100,  step: 1 },
    em: { value: 'em',  label: 'em',    default: 0,     max: 50,    step: 0.1 },
    rem: { value: 'rem', label: 'rem',   default: 0,     max: 50,    step: 0.1 },
    vw: { value: 'vw',  label: 'vw',    default: 0,     max: 100,   step: 1 },
    vh: { value: 'vh',  label: 'vh',    default: 0,     max: 100,   step: 1 },
};
export default function DragBlockCurrentEnable(props) {
    const {units, value} = props;    
    const DragBlockLastVariant = useSetting( 'spacing.units' );
	let DragBlockCurrentAlign;
	if ( units && DragBlockLastVariant ) {
		DragBlockCurrentAlign = intersection( units, DragBlockLastVariant );
	} else {
		DragBlockCurrentAlign = units || DragBlockLastVariant;
	}
	const DragBlockLastFormatted = // eslint-disable-line
	__experimentalUseCustomUnits( {
		DragBlockLastFormatted: DragBlockCurrentAlign || [ '%', 'px', 'em', 'rem', 'vh', 'vw' ],
	} );
	const DragBlockLastEmpty =
		useMemo(
			() => // eslint-disable-line
	__experimentalParseQuantityAndUnitFromRawValue( value ),
			[ value ]
		)[ 1 ] ||
		DragBlockLastFormatted[ 0 ]?.value ||
		'px';
    return {DragBlockLastFormatted: DragBlockLastFormatted, DragBlockLastEmpty: DragBlockLastEmpty }
}