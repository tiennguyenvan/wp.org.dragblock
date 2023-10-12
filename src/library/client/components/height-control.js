import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent } from '@wordpress/compose'
import { useState } from '@wordpress/element'
import {
	ToggleControl,
	PanelBody,
	SearchControl,
	ColorPicker,
	ColorPalette,
	Tooltip,
	Popover,
	Autocomplete,
	Button,
	ButtonGroup
} from '@wordpress/components'
import {
	InspectorAdvancedControls,
	InspectorControls,
	useSetting,
	__experimentalPanelColorGradientSettings,
} from '@wordpress/block-editor'
import DragBlockLastVariants from './dimension-control';
export default function DragBlockCurrentClip({ value, onChange }) {
	const DragBlockWide = useSetting('layout.DragBlockWide');
	const DragBlockOpen = useSetting('layout.DragBlockOpen');
	const DragBlockCurrentIs = [
		{ text: __('Default', 'dragblock'), value: '' },
		{ text: __('100%', 'dragblock'), value: '100%' },
		{ text: __('Auto', 'dragblock'), value: 'auto' },
	];
	const [heightNumerator, setHeightNumerator] = useState(0);
	const [heightDenominator, setHeightDenominator] = useState(0);
	let DragBlockCurrentDelete = []
	for (let denominator = 2; denominator < 7; denominator++) {
		let DragBlockCurrentShow = [];
		for (let i = 0; i < denominator; i++) {
			DragBlockCurrentShow.push(
				<span key={i} className={classnames('item', { 'is-active': (heightNumerator > i) })} onMouseEnter={() => { setHeightNumerator(i + 1) }}></span>
			)
		}
		DragBlockCurrentDelete.push(
			<div className={classnames('components-layout-control', { 'is-active': (heightDenominator === denominator) })}
				onMouseEnter={() => { setHeightDenominator(denominator) }}
			>
				{}
				<Tooltip text={heightNumerator + '/' + heightDenominator} delay={10} position='bottom center'><div className='items' onMouseDown={() => {
					let value = (100 * heightNumerator / heightDenominator).toFixed(2) + '%'
					onChange(value);
				}}>
					{DragBlockCurrentShow.map(e => e)}
				</div></Tooltip>
			</div>
		)
	}
	return (
		<div className='dragblock-height-control'>
			<ButtonGroup>
				{
					DragBlockCurrentIs.map((b, _i) =>
						<Button
							key={_i}
							variant={(value == b.value) ? 'primary' : ''}
							onClick={() => {
								onChange(b.value)
							}}
							showTooltip={true}
							tooltipPosition='top center'
							label={b.label}
						>
							{b.text}
						</Button>
					)
				}
			</ButtonGroup>
			<DragBlockLastVariants
				value={value}
				units={{ px: { value: 'px', label: 'px', min: 0, max: 3000, step: 1, default: 0 } }}
				onChange={(value) => {
					onChange(value)
				}}
			/>
			{}
		</div>
	)
}