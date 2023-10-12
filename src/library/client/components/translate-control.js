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
	SelectControl,
} from '@wordpress/components'
import DragBlockLastVariants from './dimension-control';
import BorderStyleControl from './border-style-control';
import {dragBlockShadowValue} from '../ultils/styling'
export default function DragBlockCurrentDevice({value, onChange, colors}) {
	if (typeof(value) === 'undefined') value = '';	
	let x = '';
	let y = '';
	let z = '';	
	value = value.trim().split(' ');
	x = value[0]
	if (value.length > 1) y = value[1]
	if (value.length > 2) z = value[2]
	return (		
		<div className='dragblock-translate-control'>			
			<Tooltip
				text={__('X-coordinates', 'dragblock')}
				position='middle left'
				delay={10}
			>		
				<div>
					<DragBlockLastVariants
						value={ x }
						placeholder = 'X'
						units = {{px: {value: 'px', label: 'px', min: -500, max: 500, step: 1, default: 0}}}
						onChange={ ( newX ) => {													
							value[0] = newX;
							onChange(value.join(' '));
						}}
					/>
				</div>
			</Tooltip>
			<Tooltip
				text={__('Y-coordinates', 'dragblock')}
				position='middle left'
				delay={10}
			>		
				<div>
					<DragBlockLastVariants
						value={ y }
						placeholder = 'Y'
						units = {{px: {value: 'px', label: 'px', min: -500, max: 500, step: 1, default: 0}}}
						onChange={ ( newY ) => {
							if (!value[0]) value[0] = '0px';
							value[1] = newY
							onChange(value.join(' '));
						}}
					/>
				</div>
			</Tooltip>
			<Tooltip
				text={__('Z-coordinates', 'dragblock')}
				position='middle left'
				delay={10}
			>		
				<div>
					<DragBlockLastVariants
						value={ z }
						placeholder = 'Z'
						units = {{px: {value: 'px', label: 'px', min: -500, max: 500, step: 1, default: 0}}}
						onChange={ ( newZ ) => {
							if (!value[0]) value[0] = '0px';
							if (!value[1]) value[1] = '0px';
							value[2] = newZ
							onChange(value.join(' '));
						}}
					/>
				</div>
			</Tooltip>
		</div>
	)
}