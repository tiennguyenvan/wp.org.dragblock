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
	const [selectedLocale, setSelectedLocale] = useState(typeof(dragBlockEditorInit) !== 'undefined' ? dragBlockEditorInit.siteLocale : '');
	const { attributes, setAttributes, isSelected } = props;
	let { dragBlockText } = attributes;
	let blockProps = useBlockProps();
	if (!dragBlockText) {
		dragBlockText = []
	}
	let DragBlockLastChosen = -1;
	let DragBlockLastDropdown = '';	
	let DragBlockLastHeight = -1;
	for (DragBlockLastChosen = 0; DragBlockLastChosen < dragBlockText.length; DragBlockLastChosen++) {
		let text = dragBlockText[DragBlockLastChosen];		
		if (text['disabled']) continue;
		if (!text['value']) continue;
		DragBlockLastHeight = DragBlockLastChosen;
		if (text['slug'] === selectedLocale) {			
			break;
		}
	}
	if (DragBlockLastChosen >= dragBlockText.length) {
		if (DragBlockLastHeight !== -1) {
			DragBlockLastChosen = DragBlockLastHeight;
		} else {
			dragBlockText.unshift({
				slug: selectedLocale,
				value: ''
			});
			DragBlockLastChosen = 0;		
		}		
	} 
	DragBlockLastDropdown = dragBlockText[DragBlockLastChosen]['value'];
	let DragBlockLastButtons = '<span class="inner">';
	let DragBlockLastControl = DragBlockLastDropdown.indexOf(DragBlockLastButtons)
	if (DragBlockLastControl === 0) {
		DragBlockLastDropdown = DragBlockLastDropdown.substring(DragBlockLastButtons.length);
		DragBlockLastDropdown = DragBlockLastDropdown.substring(0, DragBlockLastDropdown.length - '</span>'.length);
	}
	return (
		<>
			{}
			<span {...blockProps}>
				<BlockControls>
					<ToolbarGroup>
						<DragBlockLastMultillingual
							showTrigger={true}
							label={__('Text for other languages', 'dragblock')}
							className='dragblock-text-language-selector'
							placeholder={dragBlockLanguages[selectedLocale]}
							onSelect={(slug) => {
								setSelectedLocale(slug);
							}}
							suggestions={dragBlockLanguages}
						/>
					</ToolbarGroup>
				</BlockControls>
				{}
				{}
				{}
				<RichText
					tagName="span" // The tag here is the element output and editable in the admin
					value={DragBlockLastDropdown} // Any existing content, either from the database or an attribute default
					allowedFormats={[
						'core/bold',
						'core/code',
						'core/italic',
						'core/image',
						'core/strikethrough',
						'core/underline',
						'core/text-color',
						'core/subscript',
						'core/superscript',
						'core/keyboard',
						'dragblock/richtext-shortcode-inserter',
					]} // Allow the content to be made bold or italic, but do not allow other formatting options
					onChange={(content) => {
						let DragBlockInitial = cloneDeep(dragBlockText);
						DragBlockInitial[DragBlockLastChosen]['value'] = content;
						setAttributes({ dragBlockText: DragBlockInitial })
					}} // Store updated content as a block attribute
					placeholder={__('Type a Text', 'dragblock')} // Display this text before any content has been added by the user					
				/>
				{}
				{}
			</span>
		</>
	);
}