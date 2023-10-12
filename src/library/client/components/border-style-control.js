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
export default function BorderStyleControl({value, onChange}) {
	const buttons = [
		{label:__('Default', 'dragblock'), value: ''},
		{label:__('Solid', 'dragblock'), value: 'solid'},
		{label:__('None', 'dragblock'), value: 'none'},
		{label:__('Dashed', 'dragblock'), value: 'dashed'},
		{label:__('Dotted', 'dragblock'), value: 'dotted'},
		{label:__('Double', 'dragblock'), value: 'double'},
		{label:__('Groove', 'dragblock'), value: 'groove'},		
		{label:__('Ridge', 'dragblock'), value: 'ridge'},		
		{label:__('Inset', 'dragblock'), value: 'inset'},		
		{label:__('Outset', 'dragblock'), value: 'outset'},		
		{label:__('Hidden', 'dragblock'), value: 'hidden'},
		{label:__('Inherit', 'dragblock'), value: 'inherit'},
		{label:__('Initial', 'dragblock'), value: 'initial'},
		{label:__('Revert', 'dragblock'), value: 'revert'},		
		{label:__('Auto', 'dragblock'), value: 'auto'},
	];
	return (
		<div className='dragblock-border-style-control'>
			<ButtonGroup>
				{
					buttons.map((b, _i)=>
						<Button
							key={_i}
							variant={(value==b.value) ? 'primary' : ''}
							onClick={()=>{
								onChange(b.value)
							}}
							showTooltip={true}
							tooltipPosition='top center'
							label={b.label}
						>
							<span style={{borderStyle: b.value}}><span>{b.label.substring(0,3)}</span></span>
						</Button>
					)
				}
			</ButtonGroup>
		</div>
	)
}