import { createHigherOrderComponent } from '@wordpress/compose';
import {
	useSetting
} from '@wordpress/block-editor';
import { cloneDeep } from 'lodash';
import { useEffect } from '@wordpress/element';
export function dragBlockAppearanceCSS({ props, colors, DragBlockWide, DragBlockOpen }) {
	const { attributes, setAttributes, isSelected, clientId, name } = props;
	let { dragBlockStyles, dragBlockClientId, dragBlockCSS } = attributes;
	let DragBlockJustify = '';
	let DragBlockAlign = '';
	if (dragBlockStyles) {
		let DragBlockEnable = '.wp-block-' + name.replace('core/', '').split('/').join('-') + '[data-dragblock-client-id="' + dragBlockClientId + '"]'; // already modify in BlockListBlock
		if (name === 'core/query-pagination') {
			DragBlockEnable = '.wp-block-query-pagination.block-editor-block-list__layout' + DragBlockEnable;
		}
		let DragBlockGet = '[data-dragblock-client-id="' + dragBlockClientId + '"]';
		if (name === 'core/post-template') {
			DragBlockGet = '.wp-block-post-template' + DragBlockGet;
		}
		const DragBlockTooltip = '{default_self_selector}'
		let DragBlockGrid = '{default_body_selector}'
		let DragBlockText = '{default_id_selector}';
		let style = {
			'ALL': {
			}
		}
		let style_props = cloneDeep(dragBlockStyles);
		style_props.reverse();
		for (let prop of style_props) {
			if (
				prop['disabled'] ||
				prop['value'] === ''
			) continue;
			let devices = '';
			if (prop['devices']) {
				if (prop['devices'].indexOf('d') !== -1) devices += 'd';
				if (prop['devices'].indexOf('t') !== -1) devices += 't';
				if (prop['devices'].indexOf('m') !== -1) devices += 'm';
			}
			if (!devices || devices.length === 3) devices = 'ALL';
			let selectors = prop['selectors'] ? prop['selectors'].split(',').map(selector => {
				selector = selector.trim()
				if (selector.indexOf(':') === 0) {
					selector = DragBlockTooltip + selector;
				} else {
					if (selector.indexOf('&') !== -1) {
						selector = selector.replace('&', DragBlockTooltip);
					}
					else {
						selector = DragBlockTooltip + ' ' + selector;
					}
				}
				if (selector.indexOf(DragBlockTooltip) === 0) {
					if ((name === 'core/navigation-submenu' || name === 'core/navigation-link')) {
						selector = '.wp-block-navigation ' + selector;
					} else if (name === 'core/navigation') {
						selector = selector.replace(DragBlockTooltip, DragBlockTooltip + ' .wp-block-navigation__container');
					}
				}
				selector = DragBlockGrid + selector;
				return selector;
			}).join(',') : DragBlockGrid + (
				(((name === 'core/navigation-submenu' || name === 'core/navigation-link')
				) ?
					'.wp-block-navigation ' : ''
				) +
				DragBlockTooltip
				+ (
					name === 'core/navigation' ? ' .wp-block-navigation__container' : ''
				)
			) // if missing selector, select self: & 
			selectors = selectors.replaceAll('#', DragBlockText);
			if (!style[devices]) style[devices] = {}
			if (!style[devices][selectors]) style[devices][selectors] = {};
			if (!style[devices][selectors][prop.slug]) {
				style[devices][selectors][prop.slug] = '';
			}
			prop.value = String(prop.value);
			if (prop.slug.indexOf('-shadow') !== -1 || prop.slug === 'background-img') {
				style[devices][selectors][prop.slug] += (style[devices][selectors][prop.slug] ? ',' : '') + prop.value;
			}
			else if (prop.slug === 'transform') {
				style[devices][selectors][prop.slug] += (style[devices][selectors][prop.slug] ? ' ' : '') + prop.value;
			}
			else {
				style[devices][selectors][prop.slug] = prop.value;
			}
		}
		for (let devices in style) {
			let DragBlockCol = '';
			for (let selector in style[devices]) {
				DragBlockCol += (
					selector + '{' +
					Object.entries(style[devices][selector]).map(([key, value]) => (key + ':' + value)).join(';')
					+ '}'
				)
			}
			if (devices === 'ALL') DragBlockAlign += DragBlockCol;
			if (devices === 'd') DragBlockAlign += '@media screen and (min-width: 1025px) {' + DragBlockCol + '}';
			if (devices === 't') DragBlockAlign += '@media screen and (min-width: 768px) and (max-width: 1024px) {' + DragBlockCol + '}';
			if (devices === 'm') DragBlockAlign += '@media screen and (max-width: 767px) {' + DragBlockCol + '}';
			if (devices === 'dt') DragBlockAlign += '@media screen and (min-width: 768px) {' + DragBlockCol + '}';
			if (devices === 'dm') DragBlockAlign += '@media screen and (min-width: 1025px), screen and (max-width: 767px) {' + DragBlockCol + '}';
			if (devices === 'tm') DragBlockAlign += '@media screen and (max-width: 1024px) {' + DragBlockCol + '}';
		}
		DragBlockJustify = DragBlockAlign;
		for (let color of colors) {
			DragBlockJustify = DragBlockJustify.replaceAll('{c=' + color.slug + '}', color.color);
			DragBlockJustify = DragBlockJustify.replaceAll('{c=' + color.slug + '@}', color.color.substring(0, 7));
		}
		DragBlockJustify = DragBlockJustify.replaceAll(DragBlockTooltip, DragBlockEnable)
		DragBlockJustify = DragBlockJustify.replaceAll(DragBlockGrid, '.editor-styles-wrapper ');
		DragBlockJustify = DragBlockJustify.replaceAll(DragBlockText, '.dragblock-id-classname-placeholder--');
		DragBlockAlign = DragBlockAlign.replaceAll(DragBlockTooltip, DragBlockGet)
		DragBlockAlign = DragBlockAlign.replaceAll(DragBlockGrid, '');
		DragBlockAlign = DragBlockAlign.replaceAll(DragBlockText, '#');
	}
	useEffect(() => {
		if (dragBlockCSS !== DragBlockAlign) {
			setAttributes({ dragBlockCSS: DragBlockAlign });
		}
	});
	if (DragBlockJustify) return (
		<>
			<style>{DragBlockJustify}</style>
		</>
	)
	return (<></>)
}
const dragBlockAppearanceStyle = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		const DragBlockContent = useSetting('color.palette.theme').concat(useSetting('color.palette.custom') || [])
		const DragBlockWide = useSetting('layout.DragBlockWide');
		const DragBlockOpen = useSetting('layout.DragBlockOpen');
		return (
			<>
				{ true && (
					<>
						{dragBlockAppearanceCSS({ props, colors: DragBlockContent, DragBlockWide, DragBlockOpen })}
					</>
				)
				}
				<BlockEdit {...props} />
			</>
		);
	};
}, 'dragBlockAppearanceStyle');
wp.hooks.addFilter(
	'editor.BlockListBlock',
	'dragblock/apperance-style',
	dragBlockAppearanceStyle
);