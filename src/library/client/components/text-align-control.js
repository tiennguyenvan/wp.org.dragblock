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
	ButtonGroup,
	SVG, Path,
} from '@wordpress/components';
import {
	alignCenter,
	alignJustify,
	alignLeft,
	alignNone,
	alignRight,
} from '@wordpress/icons';
import DragBlockLastVariants from './dimension-control';
export default function DragBlockCurrentGet({ value, onChange }) {
	const buttons = [
		{ label: __('Default', 'dragblock'), text: alignNone, value: '' },
		{ label: __('Left', 'dragblock'), text: alignRight, value: 'left' },
		{ label: __('Right', 'dragblock'), text: alignLeft, value: 'right' },
		{ label: __('Center', 'dragblock'), text: alignCenter, value: 'center' },
		{ label: __('Justify', 'dragblock'), text: alignJustify, value: 'justify' },
	];
	return (
		<div className='dragblock-text-align-control'>
			<ButtonGroup>
				{
					buttons.map((b, _i) =>
						<Tooltip
							key={_i}
							text={b.label}
							delay={10}
							position='top center'
						>
							<Button
								variant={(value == b.value) ? 'primary' : ''}
								onClick={() => {
									onChange(b.value)
								}}
							>
								{b.label}
							</Button>
						</Tooltip>
					)
				}
			</ButtonGroup>
		</div>
	)
}