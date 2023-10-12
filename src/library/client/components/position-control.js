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
export default function DragBlockCurrentBg({value, onChange}) {	
	return (
        <SelectControl
            value={ value }
            options={  [
				{ value: '', label: __('Default', 'dragblock')},
				{ value: 'static', label: __('Static', 'dragblock')},
				{ value: 'relative', label: __('Relative', 'dragblock')},
				{ value: 'absolute', label: __('Absolute', 'dragblock')},
				{ value: 'fixed', label: __('Fixed', 'dragblock')},
				{ value: 'sticky', label: __('Sticky', 'dragblock')},
			] }
            onChange={ ( value ) => onChange( value ) }
        />
    );
}