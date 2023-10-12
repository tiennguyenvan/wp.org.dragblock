import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';
import './editor.scss';
import { TextControl, Button } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { DragBlockGoogle } from '../../applications/editor-panel-attributes/client/attributes-settings';
import { dragBlockQueryShortcodes } from '../../library/client/ultils/shortcodes';
import { cloneDeep } from 'lodash';
export default function Edit(props) {
    const { attributes, setAttributes, isSelected, clientId } = props;
    let { dragBlockAttrs, dragBlockClientId } = attributes;
    if (!dragBlockAttrs) {
        const DragBlockEncode = [
            { slug: 'name', value: dragBlockClientId ? dragBlockClientId : clientId },
            { slug: 'type', value: 'text' },
            {
                slug: 'placeholder', value: 'Input a text', locale: 'en_US'
            }
        ];
        setAttributes({ dragBlockAttrs: cloneDeep(DragBlockEncode) });
        dragBlockAttrs = DragBlockEncode;
    }
    let blockProps = useBlockProps();
    return (
        <input {...blockProps} onChange={()=>{}} />
    );
}