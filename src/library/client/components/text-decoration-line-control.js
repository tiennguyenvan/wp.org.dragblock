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
export default function DragBlockCurrentGrid({ value, onChange }) {
	const buttons = [
		{ text: '-', label: __('Default', 'dragblock'), value: '' },
		{ text: 'X', label: __('None', 'dragblock'), value: 'none' },
		{ text: 'U', label: __('Underline', 'dragblock'), value: 'underline' },
		{ text: 'O', label: __('Overline', 'dragblock'), value: 'overline' },
		{ text: 'S', label: __('Line-Through', 'dragblock'), value: 'line-through' },
		{ text: 'UO', label: __('Underline Overline', 'dragblock'), value: 'underline overline' },
		{ text: 'US', label: __('Underline Line-Through', 'dragblock'), value: 'underline line-through' },
	];
	return (
		<div className='dragblock-text-decoration-line-control'>
			<ButtonGroup>
				{
					buttons.map((b, _i) =>
						<Button
							key={_i}
							style={{ textDecorationLine: b.value }}
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
		</div>
	)
}