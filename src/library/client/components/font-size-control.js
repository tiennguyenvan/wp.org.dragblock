import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent } from '@wordpress/compose'
import { useState } from '@wordpress/element'
import {
	InspectorAdvancedControls,
	InspectorControls,
	useSetting,
	__experimentalPanelColorGradientSettings,
} from '@wordpress/block-editor'
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
import DragBlockLastVariants from './dimension-control';
export default function DragBlockCurrentOpen({ value, onChange }) {
	const buttons = [
		{ text: 'S', label: __('Small', 'dragblock'), value: '13px' },
		{ text: '-', label: __('Default', 'dragblock'), value: '' },
		{ text: 'M', label: __('Medium', 'dragblock'), value: '20px' },
		{ text: 'L', label: __('Large', 'dragblock'), value: '36px' },
		{ text: 'XL', label: __('Extra Large', 'dragblock'), value: '42px' },
	];
	return (
		<div className='dragblock-font-size-control'>
			<ButtonGroup>
				{
					buttons.map((b, _i) =>
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
				onChange={(value) => {
					onChange(value)
				}}
			/>
		</div>
	)
}