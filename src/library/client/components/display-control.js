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
export default function DragBlockCurrentCurrent({value, onChange}) {
	return (
        <SelectControl
            value={ value }
            options={  [
				{ value: '', label: __('Default', 'dragblock')},
				{ value: 'none', label: __('None', 'dragblock')},
				{ value: 'block', label: __('Block', 'dragblock')},
				{ value: 'flex', label: __('Flex', 'dragblock')},
				{ value: 'grid', label: __('Grid', 'dragblock')},
				{ value: 'contents', label: __('Contents', 'dragblock')},
				{ value: 'flow-root', label: __('Flow Root', 'dragblock')},
				{ value: 'inline', label: __('Inline', 'dragblock')},
				{ value: 'inline-block', label: __('Inline Block', 'dragblock')},
				{ value: 'inline-flex', label: __('Inline Flex', 'dragblock')},
				{ value: 'inline-grid', label: __('Inline Grid', 'dragblock')},
				{ value: 'inline-table', label: __('Inline Table', 'dragblock')},
				{ value: 'table', label: __('Table', 'dragblock')},
				{ value: 'table-row', label: __('Table Row', 'dragblock')},
				{ value: 'table-cell', label: __('Table Cell', 'dragblock')},
				{ value: 'table-column', label: __('Table Column', 'dragblock')},
				{ value: 'table-column-group', label: __('Table Column Group', 'dragblock')},
				{ value: 'table-caption', label: __('Table Caption', 'dragblock')},
				{ value: 'table-row-group', label: __('Table Row Group', 'dragblock')},
				{ value: 'table-header-group', label: __('Table Header Group', 'dragblock')},
				{ value: 'table-footer-group', label: __('Table Footer Group', 'dragblock')},
			] }
            onChange={ ( value ) => onChange( value ) }
        />
    );
}