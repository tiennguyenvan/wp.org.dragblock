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
export default function DragBlockCurrentWide({value, onChange}) {
	return (
        <SelectControl
            value={ value }
            options={  [
				{ value: '', label: __('Default', 'dragblock')},
				{ value: 'nowrap', label: __('No Wrap', 'dragblock')},
				{ value: 'wrap', label: __('Wrap', 'dragblock')},
				{ value: 'wrap-reverse', label: __('Wrap Reverse', 'dragblock')},
			] }
            onChange={ ( value ) => onChange( value ) }
        />
    );
}