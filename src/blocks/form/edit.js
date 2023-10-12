import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, InnerBlocks, InspectorControls, ButtonBlockAppender } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';
import { useSelect, dispatch, select } from '@wordpress/data';
import './editor.scss';
import { cloneDeep } from 'lodash';
import { useEffect } from '@wordpress/element';
export default function Edit(props) {
	const {
		attributes,
		setAttributes,
		clientId,
	} = props;
	let { dragBlockAttrs, dragBlockClientId } = attributes;
	useEffect(() => {
		if (!dragBlockAttrs) {
			const DragBlockEncode = [
				{ slug: 'name', value: dragBlockClientId ? dragBlockClientId : clientId },
				{ slug: 'method', value: 'POST' },
				{ slug: 'action', value: '[dragblock.form.action]' },
			];
			setAttributes({ dragBlockAttrs: cloneDeep(DragBlockEncode) });
			dragBlockAttrs = DragBlockEncode;
		}
	});
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(
		blockProps,
		{
			orientation: "horizontal",
			renderAppender: false,
			templateInsertUpdatesSelection: false,
		}
	);
	return <form {...innerBlocksProps} />
}