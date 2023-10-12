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
	__experimentalNumberControl,
} from '@wordpress/components'
import DragBlockLastVariants from './dimension-control';
import BorderStyleControl from './border-style-control';
import {dragBlockShadowValue} from '../ultils/styling'
import {Spinner} from '@wordpress/components';
export default function DragBlockCurrentMask({value, onChange, colors}) {
	if (typeof(value) === 'undefined') value = '';
	let func = value.split('(')[0];
	value = value.replace('(', '').replace(')', '').replace(func, '').split(',');
	let DragBlockCurrentCltr = value[0] ? parseInt(value[0]) : '';
	if (isNaN(DragBlockCurrentCltr)) {
		DragBlockCurrentCltr = ''
	} else {		
		if (DragBlockCurrentCltr < 0) {
			DragBlockCurrentCltr = 360 + DragBlockCurrentCltr % 360;
		} else {
			DragBlockCurrentCltr = DragBlockCurrentCltr % 360;
		}
	}
	return (		
		<div className='dragblock-transform-control'>
			<SelectControl
				value={func}
				options={[
					{ value: '', label: __('Default', 'dragblock')},
					{ value: 'none', label: __('None', 'dragblock')},
					{ value: 'rotate', label: __('Rotate', 'dragblock')},
					{ value: 'rotateX', label: __('RotateX', 'dragblock')},
					{ value: 'rotateY', label: __('RotateY', 'dragblock')},
					{ value: 'rotateZ', label: __('RotateZ', 'dragblock')},
					{ value: 'scale', label: __('Scale', 'dragblock')},
					{ value: 'scaleX', label: __('ScaleX', 'dragblock')},
					{ value: 'scaleY', label: __('ScaleY', 'dragblock')},
					{ value: 'scaleZ', label: __('ScaleZ', 'dragblock')},
				]}
				onChange={(newFunc) => {
					if (['rotate', 'rotateX', 'rotateY', 'rotateZ'].includes(newFunc)) {
						let val = value[0] ? parseInt(value[0]) : 0;
						if (val < 0) val = 0
						if (val > 360) val = value % 360
						onChange(newFunc+'('+val+'deg)');
					} 
					else if (['scale', 'scaleX', 'scaleY', 'scaleZ'].includes(newFunc)) {
						let val = value[0] ? parseInt(value[0]) : 0;
						if (val < 0) val = 0
						if (val > 3) val = 3						
						onChange(newFunc+'('+val+')');
					} 
					else {
						onChange(newFunc+'('+value.join(',')+')');
					}
				}}
			/>
			{['rotate', 'rotateX', 'rotateY', 'rotateZ'].includes(func)  && (
				<Tooltip
					text={__('Angle', 'dragblock')}
					position='middle left'
					delay={10}
				>	
					<div>
						<__experimentalNumberControl
							value={ DragBlockCurrentCltr }
							min={0}
							max={360}
							step={1}
							onChange={ ( angle ) => {
								onChange(func+'('+angle+'deg)')
							}}
						/>
					</div>
				</Tooltip>
			)}
			{['scale', 'scaleX', 'scaleY', 'scaleZ'].includes(func)  && (
				<Tooltip
					text={__('Ratio', 'dragblock')}
					position='middle left'
					delay={10}
				>	<div>
					<__experimentalNumberControl
						value={ value[0] }
						min={0}
						max={3}
						step={0.1}
						onChange={ ( ratio ) => {
							onChange(func+'('+ratio+')')
						}}
					/>
					</div>	
				</Tooltip>
			)}						
		</div>
	)
}