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
import { TextControl } from '@wordpress/components';
import { dragBlockLanguages } from '../ultils/lang';
import { cloneDeep } from 'lodash';
import DragBlockLastMultillingual from './autocomplete-search-box';
import DragBlockLastInvert from './chosen-control';
import { dragBlockQueryShortcodes } from '../ultils/shortcodes';
export default function DragBlockCurrentOrdered({ value, locale, onChange }) {
    if (!locale) {
        locale = dragBlockEditorInit.siteLocale;
    }
    return (
        <div className='dragblock-multilingual-text-control'>            
            <DragBlockLastInvert
                options={Object.fromEntries(Object.entries(dragBlockQueryShortcodes).map(([key, value]) => [key, value['label']]))}
                onChange={(newValue) => {
                    onChange(newValue, locale)
                }}
                value={value}
                placeholder={__('Type [ for shortcodes', 'dragblock')}
            />
            <DragBlockLastMultillingual
                placeholder={locale ? dragBlockLanguages[locale] : dragBlockLanguages['en_US']}
                onSelect={(newLocale) => {
                    onChange(value, newLocale)
                }}
                suggestions={dragBlockLanguages}
            />
        </div>
    );
}