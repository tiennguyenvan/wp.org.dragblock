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
export default function DragBlockCurrentMax({value, onChange}) {
	const buttons = [
		{text:'--',label:__('Default', 'dragblock'), value: ''},
		{text:'AB',label:__('Uppercase', 'dragblock'), value: 'uppercase'},
		{text:'ab',label:__('Lowercase', 'dragblock'), value: 'lowercase'},
		{text:'Ab',label:__('Capitalize', 'dragblock'), value: 'capitalize'},		
	];
	return (
		<div className='dragblock-text-transform-control'>
			<ButtonGroup>
				{
					buttons.map((b, _i) =>
						<Tooltip
							key={_i}
							text={b.label}
							position='top center'
							delay={10}
						>
							<Button
								variant={(value === b.value) ? 'primary' : ''}
								onClick={()=>{
									onChange(b.value)
								}}
							>
								{b.text}
							</Button>
						</Tooltip>
					)
				}
			</ButtonGroup>
		</div>
	)
}