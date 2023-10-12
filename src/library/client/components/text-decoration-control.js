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
	Flex, 
    FlexBlock,
    FlexItem, 
} from '@wordpress/components'
import DragBlockLastVariants from './dimension-control';
import DragBlockCurrentGrid from './text-decoration-line-control';
import TextDecorationStyleControl from './text-decoration-style-control';
export default function DragBlockCurrentTooltip({value, onChange, colors}) {
	if (typeof(value) === 'undefined') value = '';
	let color = value.split(' ').map(e=>e.indexOf('#') !==-1 ? e : '').join(' ').trim();
	const lines = [
		'underline overline', 'underline line-through', 'underline', 'overline', 'line-through', 'none'
	];
	let line = '';
	for (let l of lines) {
		if (value.indexOf(l) !==-1) {
			line = l;
			break;
		}
	}
	const styles = [
		'solid', 'double', 'dotted', 'dashed', 'wavy'		
	];
	let style = '';
	for (let s of styles) {
		if (value.indexOf(s) !==-1) {
			style = s;
			break;
		}
	}
	let thick = value.replace(color, '').replace(line, '').replace(style, '').trim();	
	return (
		<div className='dragblock-text-decoration-control'>		
			<DragBlockCurrentGrid
				value={line}
				onChange={(newLine) => {
					if (line) {
						value = value.replace(line, newLine);
					} else {
						value += (value ? ' ' : '') + newLine;
					}
					onChange(value);
				}}
			/>
			{line ? (
				<TextDecorationStyleControl
				value={style}
				onChange={(newStyle) => {
					if (style) {
						value = value.replace(style, newStyle);
					} else {
						value += (value ? ' ' : '') +newStyle;
					}
					onChange(value);
				}}
			/>
			) : null}
			{style? (
				<>
				<DragBlockLastVariants
					value={thick}
					onChange={(newThick) => {
						if (thick) {
							value = value.replace(thick, newThick);
						} else {
							value += (value ? ' ' : '') + newThick;
						}
						onChange(value);
					}}
				/>	
				{}
				{}
				<__experimentalPanelColorGradientSettings
					enableAlpha={ true }
					settings={[
						{   colorValue:  color,
							onColorChange:(newColor) => {
								if (color)  {
									value = value.replace(color, newColor);
								} else {
									value += (value ? ' ' : '') + newColor;
								}
								onChange(value);
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