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
export default function DragBlockCurrentClose({value, onChange}) {
	const buttons = [
		{text:'100',label:__('Thin', 'dragblock'), value: '100'},
		{text:'200',label:__('Extra Light', 'dragblock'), value: '200'},
		{text:'300',label:__('Light', 'dragblock'), value: '300'},
		{text:'---',label:__('Default', 'dragblock'), value: ''},
		{text:'500',label:__('Medium', 'dragblock'), value: '500'},
		{text:'600',label:__('Semi Bold', 'dragblock'), value: '600'},
		{text:'700',label:__('Bold', 'dragblock'), value: '700'},
		{text:'800',label:__('Extra Bold', 'dragblock'), value: '800'},
		{text:'900',label:__('Black', 'dragblock'), value: '900'},
	];
	return (
		<div className='dragblock-font-weight-control'>
			<ButtonGroup>
				{
					buttons.map((b,k)=>
						<Button
							key={k}
							style={{fontWeight: b.value}}
							variant={(value==b.value) ? 'primary' : ''}
							onClick={()=>{
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