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
export default function DragBlockCurrentMaster({ value, onChange }) {
	const buttons = [
		{ text: __('Default', 'dragblock'), label: '', value: '' },
		{ text: __('Single', 'dragblock'), label: '', value: '1em' },
		{ text: '1.15', label: '', value: '1.15em' },
		{ text: '1.5', label: '', value: '1.5em' },
		{ text: __('Double', 'dragblock'), label: __(''), value: '2em' },
	];
	return (
		<div className='dragblock-line-height-control'>
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