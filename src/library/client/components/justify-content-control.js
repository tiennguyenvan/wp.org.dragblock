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
export default function DragBlockCurrentStart({value, onChange}) {
	return (
        <SelectControl
            value={ value }
            options={  [
				{ value: '', label: __('Default', 'dragblock')},
				{ value: 'left', label: __('Left', 'dragblock')},
				{ value: 'center', label: __('Center', 'dragblock')},
				{ value: 'right', label: __('Right', 'dragblock')},
				{ value: 'space-between', label: __('Space Between', 'dragblock')},
				{ value: 'space-around', label: __('Space Around', 'dragblock')},
				{ value: 'stretch', label: __('Stretch', 'dragblock')},
			] }
            onChange={ ( value ) => onChange( value ) }
        />
    );
}