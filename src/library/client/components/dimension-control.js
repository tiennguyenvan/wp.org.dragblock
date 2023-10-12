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
import DragBlockCurrentEnable, { DragBlockCurrentAlign } from './settings';
import DragBlockCurrentSupported from './label';
export default function DragBlockLastVariants({ onChange, label, value, placeholder, units }) {
	const DragBlockCurrentDragblock = (isNaN(value) ? 0 : parseFloat(value));
	const DragBlockCurrentLast = (Array.isArray(units));
	if (DragBlockCurrentLast) {
		let temp = units;
		units = new Object();
		for (let u of temp) {
			units[u['value']] = u;
		}
	}
	if (!DragBlockCurrentLast || !units) {
		units = Object.assign({}, DragBlockCurrentAlign, units);
	}
	let { availableUnits, selectedUnit } = DragBlockCurrentEnable({ value, units: Object.values(units) });
	if (!availableUnits.length) {
		availableUnits = Object.values(units);
	}
	const DragBlockLastGoogle = (next) => {
		onChange([next, selectedUnit].join(''));
	};
	const DragBlockChosen = (unitValue) => {
		onChange(unitValue);
	};
	const DragBlockLastExisting = (newUnit) => {
		const [currentValue, currentUnit] =
			// eslint-disable-line
	__experimentalParseQuantityAndUnitFromRawValue(value);
		if (['em', 'rem'].includes(newUnit) && currentUnit === 'px') {
			onChange((currentValue / 16).toFixed(2) + newUnit);
		} else if (
			['em', 'rem'].includes(currentUnit) &&
			newUnit === 'px'
		) {
			onChange(Math.round(currentValue * 16) + newUnit);
		} else if (
			['vh', 'vw', '%'].includes(newUnit) &&
			currentValue > 100
		) {
			onChange(100 + newUnit);
		}
	};
	return (
		<fieldset className="dragblock-dimension-control">
			<DragBlockCurrentSupported className='label'>
				{label}
			</DragBlockCurrentSupported>
			<div className='control'>
				<div className='unit'>
					<// eslint-disable-line
	__experimentalUnitControl
						value={value}
						units={availableUnits}
						onChange={DragBlockChosen}
						onUnitChange={DragBlockLastExisting}
						min={units[selectedUnit]
							?.min ?? 0}
						max={
							units[selectedUnit]
								?.max ?? 100
						}
						step={
							units[selectedUnit]
								?.step ?? 0.1
						}
						placeholder={placeholder}
					/>
				</div>
				<div className='spacer'>
					<__experimentalSpacer marginX={2} marginBottom={0}>
						<RangeControl
							value={DragBlockCurrentDragblock}
							min={units[selectedUnit]
								?.min ?? 0}
							max={
								units[selectedUnit]
									?.max ?? 100
							}
							step={
								units[selectedUnit]
									?.step ?? 0.1
							}
							withInputField={false}
							onChange={DragBlockLastGoogle}
							__nextHasNoMarginBottom
						/>
					</__experimentalSpacer>
				</div>
			</div>
		</fieldset>
	);
}