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
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
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
import { DragBlockCurrentOptions, DragBlockAvaiFind } from '../icons/icons';
import { FormFileUpload } from '@wordpress/components';
import { TextControl } from '@wordpress/components';
export default function DragBlockCurrentUpdate({ value, onChange, label, text }) {
    return (
        <>
            <MediaUploadCheck>
                <MediaUpload
                    onSelect={(media) => {
                        onChange(media);
                    }}
                    allowedTypes={['image']}
                    value={value}
                    render={({ open }) => {
                        return (
                        <Button label={label} onClick={open} className='dragblock-upload-media-control'>
                            {text}
                        </Button>
                    )}}
                />
            </MediaUploadCheck>
        </>
    );
}