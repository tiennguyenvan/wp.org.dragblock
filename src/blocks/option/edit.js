import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';
import { useState } from '@wordpress/element';
import './editor.scss';
import { TextControl } from '@wordpress/components';
import { cloneDeep, isEmpty } from 'lodash';
import {
	BlockControls
} from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import DragBlockCurrentAvai from '../../library/client/components/dropdown-toolbar';
import DragBlockLastMultillingual from '../../library/client/components/autocomplete-search-box';
import { dragBlockLanguages } from '../../library/client/ultils/lang';
import { DragBlockAvaiAdd } from '../../library/client/ultils/text';
export default function Edit(props) {
	const { attributes, setAttributes, isSelected } = props;
	let { dragBlockText, dragBlockAttrs } = attributes;
	let blockProps = useBlockProps();
	if (!dragBlockText) {
		dragBlockText = [];
	}
	if (!dragBlockAttrs) {
        const DragBlockEncode = [
            { slug: 'value', value: '' },
        ];
        setAttributes({ dragBlockAttrs: cloneDeep(DragBlockEncode) });
        dragBlockAttrs = DragBlockEncode;
    }
	return (
		<>
			{}
			<option {...blockProps}>
			{DragBlockAvaiAdd(dragBlockText)}
			</option>
		</>
	);
}