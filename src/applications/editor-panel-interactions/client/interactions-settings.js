import { __ } from '@wordpress/i18n';
export const DragBlockColon = {
	'click': {
		keyword: 'mouse click',
		label: __('Click', 'dragblock'),
		note: __('Mouse Click', 'dragblock'),
		type: 'mouse'
	},
	'mouseenter': {
		keyword: 'mouse enter',
		label: __('MouseEnter', 'dragblock'),
		note: __('Mouse Enter an Element', 'dragblock'),
		type: 'mouse'
	},
	'mouseleave': {
		keyword: 'mouse leave',
		label: __('MouseLeave', 'dragblock'),
		note: __('Mouse Leave an Element', 'dragblock'),
		type: 'mouse'
	}
}
wp.hooks.addFilter(
	'blocks.registerBlockType',
	'dragblock/interactions-register',
	function (settings, name) {
		settings = Object.assign({}, settings, {
			attributes: Object.assign({}, settings.attributes, {
				dragBlockScripts: { type: 'array', default: '', },
				dragBlockJS: { type: 'string', default: '' },
			}),
		});
		return settings;
	}
);