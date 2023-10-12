import { intersection } from 'lodash';
import { useMemo } from '@wordpress/element';
import {
	BaseControl,
	RangeControl,
	Flex,
	FlexItem,
	__experimentalSpacer, // eslint-disable-line
	__experimentalUseCustomUnits, // eslint-disable-line
	__experimentalUnitControl, // eslint-disable-line
	__experimentalParseQuantityAndUnitFromRawValue, // eslint-disable-line
} from '@wordpress/components';
import { useSetting } from '@wordpress/block-editor';
const DragBlockLastFlatfonts = {
	px: { max: 1000, step: 1 },
	'%': { max: 100, step: 1 },
	vw: { max: 100, step: 1 },
	vh: { max: 100, step: 1 },
	em: { max: 50, step: 0.1 },
	rem: { max: 50, step: 0.1 },
};
export default function DragBlockLastVariants( { onChange, label, units, value } ) {
	const DragBlockLastTotal = parseFloat( value );
	const DragBlockLastVariant = useSetting( 'spacing.units' );
	let defaultUnits;
	if ( units && DragBlockLastVariant ) {
		defaultUnits = intersection( units, DragBlockLastVariant );
	} else {
		defaultUnits = units || DragBlockLastVariant;
	}
	const DragBlockLastFormatted = // eslint-disable-line
	__experimentalUseCustomUnits( {
		DragBlockLastFormatted: defaultUnits || [ '%', 'px', 'em', 'rem', 'vh', 'vw' ],
	} );
	const DragBlockLastEmpty =
		useMemo(
			() => // eslint-disable-line
	__experimentalParseQuantityAndUnitFromRawValue( value ),
			[ value ]
		)[ 1 ] ||
		DragBlockLastFormatted[ 0 ]?.value ||
		'px';
	const DragBlockLastGoogle = ( next ) => {
		onChange( [ next, DragBlockLastEmpty ].join( '' ) );
	};
	const DragBlockChosen = ( unitValue ) => {
		const [ newValue, newUnit ] = // eslint-disable-line
			// eslint-disable-line
	__experimentalParseQuantityAndUnitFromRawValue( unitValue );
		if ( newValue ) {
			onChange( unitValue );
		}
	};
	const DragBlockLastExisting = ( newUnit ) => {
		const [ currentValue, currentUnit ] =
			// eslint-disable-line
	__experimentalParseQuantityAndUnitFromRawValue( value );
		if ( [ 'em', 'rem' ].includes( newUnit ) && currentUnit === 'px' ) {
			onChange( ( currentValue / 16 ).toFixed( 2 ) + newUnit );
		} else if (
			[ 'em', 'rem' ].includes( currentUnit ) &&
			newUnit === 'px'
		) {
			onChange( Math.round( currentValue * 16 ) + newUnit );
		} else if (
			[ 'vh', 'vw', '%' ].includes( newUnit ) &&
			currentValue > 100
		) {
			onChange( 100 + newUnit );
		}
	};
	return (
		<fieldset className="components-dimension-control">
			<BaseControl.VisualLabel as="legend">
				{ label }
			</BaseControl.VisualLabel>
			<Flex>
				<FlexItem>
					<// eslint-disable-line
	__experimentalUnitControl
						value={ value }
						units={ DragBlockLastFormatted }
						onChange={ DragBlockChosen }
						onUnitChange={ DragBlockLastExisting }
						min={ 0 }
						size={ '__unstable-large' }
					/>
				</FlexItem>
				<FlexItem>
					<__experimentalSpacer marginX={ 2 } marginBottom={ 0 }>
						<RangeControl
							value={ DragBlockLastTotal }
							min={ 0 }
							max={
								DragBlockLastFlatfonts[ DragBlockLastEmpty ]
									?.max ?? 100
							}
							step={
								DragBlockLastFlatfonts[ DragBlockLastEmpty ]
									?.step ?? 0.1
							}
							withInputField={ false }
							onChange={ DragBlockLastGoogle }
							__nextHasNoMarginBottom
						/>
					</__experimentalSpacer>
				</FlexItem>
			</Flex>
		</fieldset>
	);
}