import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';
import { useState } from '@wordpress/element';
import './editor.scss';
import { TextControl } from '@wordpress/components';
import { cloneDeep } from 'lodash';
import {
	BlockControls
} from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import DragBlockCurrentAvai from '../../library/client/components/dropdown-toolbar';
import DragBlockLastMultillingual from '../../library/client/components/autocomplete-search-box';
import { dragBlockLanguages } from '../../library/client/ultils/lang';
export default function Edit(props) {
	const { attributes, setAttributes, isSelected, clientId } = props;
	let { dragBlockText, dragBlockAttrs, dragBlockClientId } = attributes;
	let blockProps = useBlockProps();
	if (!dragBlockAttrs) {
		const DragBlockEncode = [
			{slug: 'name', value: dragBlockClientId ? dragBlockClientId : clientId},
			{slug: 'placeholder', value: 'Input a Text Group', locale: 'en_US' },
		];
		setAttributes({dragBlockAttrs: cloneDeep(DragBlockEncode)});
		dragBlockAttrs = DragBlockEncode;
	}
	return (
		<>			
			<textarea {...blockProps} onChange={()=>{}}/>
		</>
	);
}