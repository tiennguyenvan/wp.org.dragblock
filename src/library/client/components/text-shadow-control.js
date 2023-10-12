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
export default function DragBlockCurrentText({value, onChange, colors}) {
	if (typeof(value) === 'undefined') value = '';
	let color = '';
	let DragBlockCurrentCol = '';
	let DragBlockCurrentRow = '';
	let DragBlockCurrentItem = '';
	value.trim().split(' ').map(e=> {
		if (e.indexOf('#') !==-1) color = e.trim();
	})
	value = value.trim().replace(color, '').split(' ');
	DragBlockCurrentCol = value[0]
	if (value.length > 1) DragBlockCurrentRow = value[1]
	if (value.length > 2) DragBlockCurrentItem = value[2]
	if (!DragBlockCurrentCol) DragBlockCurrentCol = '0px';
	if (!DragBlockCurrentRow) DragBlockCurrentRow = '0px';
	return (		
		<div className='dragblock-text-shadow-control'>
			<Tooltip
				text={__('Horizontal', 'dragblock')}
				position='middle left'
				delay={10}
			>
				<div>
					<DragBlockLastVariants
						value={ DragBlockCurrentCol }
						placeholder = 'X'
						units = {{px: {value: 'px', label: 'px', min: -50, max: 50, step: 1, default: 0}}}
						onChange={ ( newX ) => {								
							let DragBlockCond = newX + (DragBlockCurrentRow ? ' ' + DragBlockCurrentRow : '');
							if (newX && DragBlockCurrentRow) {
								DragBlockCond += (DragBlockCurrentItem ? ' ' + DragBlockCurrentItem : '') + (color ? ' ' + color : '')
							}
							onChange(DragBlockCond);					
						}}
					/>
				</div>
			</Tooltip>
			<Tooltip
				text={__('Vertical', 'dragblock')}
				position='middle left'
				delay={10}
			>
				<div>
					<DragBlockLastVariants
						value={ DragBlockCurrentRow }
						placeholder = 'Y'
						units = {{px: {value: 'px', label: 'px', min: -50, max: 50, step: 1, default: 0}}}
						onChange={ ( newY ) => {								
							let DragBlockCond = DragBlockCurrentCol + (newY ? ' ' + newY : '');						
							if (DragBlockCurrentCol && newY) {
								DragBlockCond += (DragBlockCurrentItem ? ' ' + DragBlockCurrentItem : '') + (color ? ' ' + color : '')
							}
							onChange(DragBlockCond);
						}}
					/>
				</div>
			</Tooltip>
			{(DragBlockCurrentCol && DragBlockCurrentRow) && (
				<>
					<Tooltip
						text={__('Blur', 'dragblock')}
						position='middle left'
						delay={10}
					>
						<div>
						<DragBlockLastVariants
							value={ DragBlockCurrentItem }
							placeholder = {__('Blur', 'dragblock')}
							units = {{px: {value: 'px', label: 'px', min: 0, max: 50, step: 1, default: 0}}}
							onChange={ ( newBlur ) => {	
								let DragBlockCond = DragBlockCurrentCol + ' ' + DragBlockCurrentRow + (newBlur ? ' ' + newBlur : '') + (color ? ' ' + color : '');
								onChange(DragBlockCond);
							}}
						/>
						</div>
					</Tooltip>
					<__experimentalPanelColorGradientSettings
						enableAlpha={ true }
						settings={[
							{   
								colorValue:  color,
								onColorChange:(newColor) => {
									let DragBlockCond = DragBlockCurrentCol + ' ' + DragBlockCurrentRow + (DragBlockCurrentItem ? ' ' + DragBlockCurrentItem : '') + (newColor ? ' ' + newColor : '');
									onChange(DragBlockCond);
								},
								label: __( 'Shadow Color', 'dragblock' ),
							},
						]}
						__experimentalHasMultipleOrigins={ true }
					>
					</__experimentalPanelColorGradientSettings>
				</>
			)}
		</div>
	)
}