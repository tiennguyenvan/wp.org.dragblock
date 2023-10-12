import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';
import './editor.scss';
import { TextControl, Button } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { DragBlockGoogle, DragBlockAdd } from '../../applications/editor-panel-attributes/client/attributes-settings';
import { dragBlockQueryShortcodes } from '../../library/client/ultils/shortcodes';
import { DragBlockAvaiFormatted } from '../../library/client/ultils/text';
import { cloneDeep } from 'lodash';
import { useEffect } from '@wordpress/element';
import { useRef } from '@wordpress/element';
export default function Edit(props) {
    const { attributes, setAttributes, isSelected } = props;
    const { dragBlockAttrs } = attributes;
    let DragBlockLastBorder = DragBlockGoogle(dragBlockAttrs, 'src');
    let blockProps = useBlockProps();
    let DragBlockPrefix = null;
    if (!DragBlockLastBorder) {
        blockProps['src'] = dragBlockEditorInit.blankDemoImgUrl;
    } else {
        if (DragBlockLastBorder.indexOf('[') !== -1 && DragBlockLastBorder.indexOf(']') !== -1) {
            for (let shortcode in dragBlockQueryShortcodes) {
                let sc = dragBlockQueryShortcodes[shortcode];
                if (sc['placeholder']) {
                    DragBlockLastBorder = DragBlockLastBorder.replaceAll(shortcode, sc['placeholder'])
                } else {
                    DragBlockLastBorder = DragBlockLastBorder.replaceAll(shortcode, dragBlockEditorInit.blankDemoImgUrl);
                }
            }
        }
        else {
            let DragBlockLastBox = DragBlockAvaiFormatted(DragBlockLastBorder);
            if (DragBlockLastBox && DragBlockLastBox != DragBlockLastBorder) {
                DragBlockPrefix = cloneDeep(dragBlockAttrs);
                DragBlockAdd(DragBlockPrefix, 'src', DragBlockLastBox);
                DragBlockLastBorder = DragBlockLastBox;
            }
        }
        blockProps['src'] = DragBlockLastBorder;
    }
    useEffect(() => {
        if (null !== DragBlockPrefix) {
            setAttributes({ dragBlockAttrs: DragBlockPrefix });
        }
    });
    return (
        <img {...blockProps} />
    );
}