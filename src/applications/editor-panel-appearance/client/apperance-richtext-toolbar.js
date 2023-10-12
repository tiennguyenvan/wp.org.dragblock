import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent } from '@wordpress/compose'
import { useState } from '@wordpress/element'
import {
	InspectorAdvancedControls,
	InspectorControls,
	useSetting,
	__experimentalPanelColorGradientSettings,
	BlockControls,
	JustifyToolbar,
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
	__experimentalNumberControl,
} from '@wordpress/components'
import DragBlockLastVariants from '../../../library/client/components/dimension-control';
import DragBlockCurrentOpen from '../../../library/client/components/font-size-control';
import DragBlockCurrentClose from '../../../library/client/components/font-weight-control';
import DragBlockCurrentMaster from '../../../library/client/components/line-height-control';
import DragBlockCurrentTooltip from '../../../library/client/components/text-decoration-control';
import DragBlockCurrentGrid from '../../../library/client/components/text-decoration-line-control';
import TextDecorationStyleControl from '../../../library/client/components/text-decoration-style-control';
import DragBlockCurrentMax from '../../../library/client/components/text-transform-control';
import BorderStyleControl from '../../../library/client/components/border-style-control';
import DragBlockLastBanned from '../../../library/client/components/border-control';
import DragBlockCurrentText from '../../../library/client/components/text-shadow-control';
import DragBlockLastFull from '../../../library/client/components/box-shadow-control';
import DragBlockCurrentBg from '../../../library/client/components/position-control';
import DragBlockCurrentCurrent from '../../../library/client/components/display-control';
import {
	dragBlockMatchingColors,
	dragBlockMatchingBorderColors,
	dragBlockUnmatchingColors,
	dragBlockUnmatchingBorderColors,
	DragBlockAvaiTotal
} from '../../../library/client/ultils/styling';
import {
	dragBlockAppearanceStyle
} from './appearance-style';
import { TextControl } from '@wordpress/components';
import { Flex } from '@wordpress/components';
import { FlexItem } from '@wordpress/components';
import DragBlockCurrentDevice from '../../../library/client/components/translate-control';
import DragBlockCurrentMask from '../../../library/client/components/transform-control';
import DragBlockLastLegend from '../../../library/client/components/align-items-control';
import DragBlockCurrentStart from '../../../library/client/components/justify-content-control';
import DragBlockCurrentWide from '../../../library/client/components/flex-wrap-control';
import DragBlockCurrentContent from '../../../library/client/components/flex-direction-control';
import DragBlockCurrentHolder from '../../../library/client/components/margin-control';
import DragBlockCurrentGet from '../../../library/client/components/text-align-control';
import {
	flipHorizontal,
	flipVertical,
	link,
	rotateRight,
	wordpress,
} from '@wordpress/icons';
import { Dropdown } from '@wordpress/components';
import { registerFormatType, toggleFormat } from '@wordpress/rich-text';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { DragBlockAvaiUpdate, dragBlockIcons } from '../../../library/client/icons/icons';
import { insert, editor, getActiveObject, getTextContent, insertObject, create, replace, toHTMLString, applyFormat } from '@wordpress/rich-text';
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import DragBlockCurrentNew from '../../../library/client/components/popover-property';
import DragBlockLastMultillingual from '../../../library/client/components/autocomplete-search-box';
import { dragBlockQueryShortcodes } from '../../../library/client/ultils/shortcodes';
const dragBlockRichtextIconInserter = (props) => {
	const { isActive, onChange, value } = props;
	const [searchingIconQuery, setSearchingIconQuery] = useState('')
	const [searchResultIcons, setSearchResultIcons] = useState([])
	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					{
					}
				</ToolbarGroup>
			</BlockControls>
		</>
	);
};
registerFormatType('dragblock/richtext-icon-inserter', {
	title: 'Insert Icon',
	tagName: 'span',
	className: 'dragblock-icon',
	edit: dragBlockRichtextIconInserter,
});
const dragBlockShortcodes = {
	'current.post.title': {
		note: __('Custom get post loops need to be parsed to use this', 'dragblock'),
		label: __('Current Post Title'),
	}
}
const dragBlockRichtextShortCodeInserter = (props) => {
	const { isActive, onChange, value } = props;
	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<DragBlockLastMultillingual
						note={__('Shortcodes', 'dragblock')}
						className='dragblock-insert-shortcodes-box'
						placeholder={__('Search a shortcode')}
						icon={DragBlockAvaiUpdate}
						label={__('Insert a shortcode')}
						showTrigger={true}
						onSelect={(slug) => {
							const DragBlockDragblock = wp.richText.insert(value, slug, value.start);
							onChange(DragBlockDragblock);
						}}
						suggestions={dragBlockQueryShortcodes}
					/>
				</ToolbarGroup>
			</BlockControls>
		</>
	);
};
registerFormatType('dragblock/richtext-shortcode-inserter', {
	title: 'Insert Icon',
	tagName: 'span',
	className: 'dragblock-shortcode',
	edit: dragBlockRichtextShortCodeInserter,
});