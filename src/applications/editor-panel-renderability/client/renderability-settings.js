import { __ } from '@wordpress/i18n';
export const DragBlockAllow = {
	'browser': {
		keyword: 'browser chrome firefox edge microsoft ie opera safari samsung',
		label: __('Browser', 'dragblock'),
		note: __('Browser Agent', 'dragblock'),
		type: 'select',
		options: [
			{ value: '', label: __('Default', 'dragblock') },
			{ value: 'chrome', label: __('Chrome', 'dragblock') },
			{ value: 'firefox', label: __('FireFox', 'dragblock') },
			{ value: 'edge', label: __('Edge', 'dragblock') },
			{ value: 'ie', label: __('IE', 'dragblock') },
			{ value: 'opera', label: __('Opera', 'dragblock') },
			{ value: 'safari', label: __('Safari', 'dragblock') },
			{ value: 'samsungi', label: __('Samsung Internet', 'dragblock') },
		]
	},
	'device': {
		keyword: 'device mobile desktop tablet',
		label: __('Device', 'dragblock'),
		note: __('Device', 'dragblock'),
		type: 'select',
		options: [
			{ value: '', label: __('Default', 'dragblock') },
			{ value: 'desktop', label: __('Desktop', 'dragblock') },
			{ value: 'mobile', label: __('Mobile', 'dragblock') },
			{ value: 'tablet', label: __('Tablet', 'dragblock') }
		]
	},
	'os': {
		keyword: 'os windows linux macintosh ios android',
		label: __('OS', 'dragblock'),
		note: __('OS', 'dragblock'),
		type: 'select',
		options: [
			{ value: '', label: __('Default', 'dragblock') },
			{ value: 'windows', label: __('Windows', 'dragblock') },
			{ value: 'linux', label: __('Linux', 'dragblock') },
			{ value: 'macintosh', label: __('Mac', 'dragblock') },
			{ value: 'ios', label: __('iOS', 'dragblock') },
			{ value: 'android', label: __('Android', 'dragblock') },
		]
	},
	'user-logged': {
		keyword: 'user logged out in ',
		label: __('User Logged', 'dragblock'),
		note: __('User Logged', 'dragblock'),
		type: 'select',
		options: [
			{ value: '', label: __('Default', 'dragblock') },
			{ value: 'out', label: __('Out', 'dragblock') },
			{ value: 'in', label: __('In', 'dragblock') },
		]
	},
}
export const DragBlockAnimation = (renderConds, slug) => {
	if (renderConds) {
		for (let [index, renderCond] of renderConds.entries()) {
			if (renderCond['slug'] === slug && !renderCond['disabled']) return index
		}
	}
	return -1;
}
export const DragBlockAppender = (renderConds, slug) => {
	let index = DragBlockAnimation(renderConds, slug)
	if (index === -1) return null
	return renderConds[index]['value']
}
export const DragBlockAutocomplete = (renderConds, slug) => {
	let index = DragBlockAnimation(renderConds, slug);
	if (index > -1) {
		renderConds.splice(index, 1);
	}
}
export const DragBlockInit = (renderConds, slug, value) => {
	let index = DragBlockAnimation(renderConds, slug)
	if (index === -1) {
		renderConds.unshift({
			'slug': slug,
			'value': value
		});
		return renderConds;
	}
	renderConds[index]['value'] = value;
	return renderConds;
}
wp.hooks.addFilter(
	'blocks.registerBlockType',
	'dragblock/renderability-register',
	function (settings, name) {
		settings = Object.assign({}, settings, {
			attributes: Object.assign({}, settings.attributes, {				
				dragBlockRenderability: {
					type: 'array',
					default: '',
				},
			}),
		});
		return settings;
	}
);