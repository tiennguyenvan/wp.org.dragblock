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
export default function DragBlockLastLegend({value, onChange}) {
	return (
        <SelectControl
            value={ value }
            options={  [
				{ value: '', label: __('Default', 'dragblock')},
				{ value: 'start', label: __('Start', 'dragblock')},
				{ value: 'center', label: __('Center', 'dragblock')},
				{ value: 'end', label: __('End', 'dragblock')},
				{ value: 'stretch', label: __('Stretch', 'dragblock')},
				{ value: 'baseline', label: __('Baseline', 'dragblock')},
			] }
            onChange={ ( value ) => onChange( value ) }
        />
    );
}