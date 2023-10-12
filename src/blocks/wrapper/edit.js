import { __ } from '@wordpress/i18n';
import './editor.scss';
import { SelectControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import {
	useBlockProps, InspectorControls,
	useInnerBlocksProps,
	InnerBlocks
} from '@wordpress/block-editor';
export default function Edit(props) {
	const {
		attributes,
		setAttributes,
		clientId,		
		isSelected
	} = props;
	let {		
		dragBlockTagName
	} = attributes;
	const DragBlockTo = useSelect(select => { return select('core/block-editor').getBlockOrder(clientId); });
	let blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(
		blockProps,
		{
			orientation: 'horizontal',
			renderAppender: false,
			templateInsertUpdatesSelection: false,
		}
	);
	const DragBlockLastImage = (
		<>
			{(dragBlockTagName === 'div' || !dragBlockTagName) && (
				<div {...innerBlocksProps} data-content-length={DragBlockTo.length} />				
			)}
			{(dragBlockTagName === 'section') && (<section {...innerBlocksProps} />)}
			{(dragBlockTagName === 'header') && (<header {...innerBlocksProps} />)}
			{(dragBlockTagName === 'footer') && (<footer {...innerBlocksProps} />)}
			{(dragBlockTagName === 'main') && (<main {...innerBlocksProps} />)}
			{(dragBlockTagName === 'article') && (<article {...innerBlocksProps} />)}
			{(dragBlockTagName === 'aside') && (<aside {...innerBlocksProps} />)}
			{(dragBlockTagName === 'nav') && (<nav {...innerBlocksProps} />)}
			{(dragBlockTagName === 'button') && (<button {...innerBlocksProps} />)}
			{(dragBlockTagName === 'ul') && (<ul {...innerBlocksProps} />)}
			{(dragBlockTagName === 'li') && (<li {...innerBlocksProps} />)}
			{(dragBlockTagName === 'blockquote') && (<blockquote {...innerBlocksProps} />)}
			{(dragBlockTagName === 'pre') && (<pre {...innerBlocksProps} />)}
			{(dragBlockTagName === 'h1') && (<h1 {...innerBlocksProps} />)}
			{(dragBlockTagName === 'h2') && (<h2 {...innerBlocksProps} />)}
			{(dragBlockTagName === 'h3') && (<h3 {...innerBlocksProps} />)}
			{(dragBlockTagName === 'h4') && (<h4 {...innerBlocksProps} />)}
			{(dragBlockTagName === 'h5') && (<h5 {...innerBlocksProps} />)}
			{(dragBlockTagName === 'h6') && (<h6 {...innerBlocksProps} />)}
			{(dragBlockTagName === 'label') && (<label {...innerBlocksProps} />)}
			{(dragBlockTagName === 'fieldset') && (<fieldset {...innerBlocksProps} />)}
			{(dragBlockTagName === 'legend') && (<legend {...innerBlocksProps} />)}
		</>
	)
	return (
		<>
			<InspectorControls __experimentalGroup="advanced">
				<SelectControl
					label={__('Tag Name', 'dragblock')}
					value={dragBlockTagName}
					onChange={(value) => {
						setAttributes({ dragBlockTagName: value })
					}}
					options={
						[
							{ value: 'div', label: __('<div> (Default)', 'dragblock') },
							{ value: 'button', label: __('<button>', 'dragblock') },
							{ value: 'h1', label: __('<h1>', 'dragblock') },
							{ value: 'h2', label: __('<h2>', 'dragblock') },
							{ value: 'h3', label: __('<h3>', 'dragblock') },
							{ value: 'h4', label: __('<h4>', 'dragblock') },
							{ value: 'h5', label: __('<h5>', 'dragblock') },
							{ value: 'h6', label: __('<h6>', 'dragblock') },
							{ value: 'ul', label: __('<ul>', 'dragblock') },
							{ value: 'li', label: __('<li>', 'dragblock') },
							{ value: 'blockquote', label: __('<blockquote>', 'dragblock') },
							{ value: 'section', label: __('<footer>', 'dragblock') },
							{ value: 'header', label: __('<header>', 'dragblock') },
							{ value: 'footer', label: __('<footer>', 'dragblock') },
							{ value: 'main', label: __('<main>', 'dragblock') },
							{ value: 'article', label: __('<article>', 'dragblock') },
							{ value: 'aside', label: __('<aside>', 'dragblock') },
							{ value: 'nav', label: __('<nav>', 'dragblock') },
							{ value: 'pre', label: __('<pre>', 'dragblock') },
							{ value: 'label', label: __('<label>', 'dragblock') },
							{ value: 'fieldset', label: __('<fieldset>', 'dragblock') },
							{ value: 'legend', label: __('<legend>', 'dragblock') },
						]
					}
				/>
			</InspectorControls>
			{DragBlockLastImage}
		</>
	);
}