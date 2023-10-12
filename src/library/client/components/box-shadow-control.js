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
import {dragBlockShadowValue} from '../ultils/styling'
export default function DragBlockLastFull({value, onChange, colors}) {
	if (typeof(value) === 'undefined') value = '';
	let color = '';
	let x = '';
	let y = '';
	let blur = '';
	let spread = '';
	let inset = value.indexOf('inset') !==-1;
	value.trim().split(' ').map(e=> {
		if (e.indexOf('#') !==-1) color = e.trim();
	})
	value = value.replace(color, '').replace('inset', '').trim().split(' ');
	x = value[0]
	if (value.length > 1) y = value[1]
	if (value.length > 2) blur = value[2]
	if (value.length > 3) spread = value[3]
	if (!x) x = '0px'
	if (!y) y = '0px'
	if (!blur) blur = '0px'
	return (		
		<div className='dragblock-box-shadow-control'>
			<ToggleControl
				label={__('Inset', 'dragblock')}
				position='middle left'
				help={
					inset
						? __('Enabled inset', 'dragblock')
						: __('Disabled inset', 'dragblock')
				}
				checked={ inset }
				onChange={ () => {										
					onChange(dragBlockShadowValue({inset: !inset, x,y,blur,spread,color}));
				} }
			/>
			<Tooltip
				text={__('Horizontal', 'dragblock')}
				position='middle left'
				delay={10}
			>		
				<div>
					<DragBlockLastVariants
						value={ x }
						placeholder = 'X'
						units = {{px: {value: 'px', label: 'px', min: -50, max: 50, step: 1, default: 0}}}
						onChange={ ( newX ) => {													
							onChange(dragBlockShadowValue({inset, x: newX,y,blur,spread,color}));
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
					value={ y }
					placeholder = 'Y'
					units = {{px: {value: 'px', label: 'px', min: -50, max: 50, step: 1, default: 0}}}
					onChange={ ( newY ) => {							
						onChange(dragBlockShadowValue({inset, x, y: newY,blur,spread,color}));
					}}
				/>
				</div>
			</Tooltip>
			{(x && y) && (
				<>
					<Tooltip
						text={__('Blur', 'dragblock')}
						position='middle left'
						delay={10}
					>
						<div>
						<DragBlockLastVariants
							value={ blur }
							placeholder = {__('Blur', 'dragblock')}
							units = {{px: {value: 'px', label: 'px', min: 0, max: 50, step: 1, default: 0}}}
							onChange={ ( newBlur ) => {	
								onChange(dragBlockShadowValue({inset, x, y,blur:newBlur,spread,color}));
							}}
						/>
						</div>
					</Tooltip>
					{blur ? (
						<Tooltip
							text={__('Spread', 'dragblock')}
							position='middle left'
							delay={10}
						>
							<div>
							<DragBlockLastVariants
								value={ spread }
								placeholder = {__('Spread', 'dragblock')}
								units = {{px: {value: 'px', label: 'px', min: 0, max: 50, step: 1, default: 0}}}
								onChange={ ( newSpread ) => {	
									onChange(dragBlockShadowValue({inset, x, y,blur,spread:newSpread,color}));
								}}
							/>
							</div>
						</Tooltip>
					) : null}
					<__experimentalPanelColorGradientSettings
						enableAlpha={ true }
						settings={[
							{   
								colorValue:  color,
								onColorChange:(newColor) => {
									onChange(dragBlockShadowValue({inset, x, y,blur,spread,color:newColor}));
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