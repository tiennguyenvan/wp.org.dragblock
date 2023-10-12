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
import BorderStyleControl from './border-style-control';
export default function DragBlockLastBanned({value, onChange, colors}) {
	if (typeof(value) === 'undefined') value = '';
	let color = '';
	let width = '';
	let style = '';
	const styles = [
		'solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset', 'hidden'
	];
	value.trim().split(' ').map(e=> {
		if (e.indexOf('#') !==-1) color = e.trim();
		else if (styles.includes(e)) style = e		
	})
	width = value.replace(color, '').replace(style, '').trim();	
	return (		
		<div className='dragblock-border-control'>
			<BorderStyleControl
				value={style}
				onChange={(newStyle) => {
					onChange(width + (newStyle ? ' ' + newStyle : '') + (color ? ' ' + color : ''))					
				}}
			/>
			{style?(
				<>
					<DragBlockLastVariants
						value={ width }
						onChange={ ( newWidth ) => {	
							onChange(newWidth+ (style ? ' ' + style : '') + (color ? ' ' + color : ''))					
						}}
					/>
					<__experimentalPanelColorGradientSettings
						enableAlpha={ true }
						settings={[
							{   
								colorValue:  color,
								onColorChange:(newColor) => {
									onChange(width+ (style ? ' ' + style : '') + (newColor ? ' ' + newColor : ''))
								},
								label: __( 'Line Color', 'dragblock' ),
							},
						]}
						__experimentalHasMultipleOrigins={ true }
					>                        
					</__experimentalPanelColorGradientSettings>
				</>
			) : null}
		</div>
	)
}