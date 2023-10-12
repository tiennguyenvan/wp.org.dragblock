import { __ } from '@wordpress/i18n';
import { cloneDeep } from 'lodash';
export const initDragBlockAttrs = (propname) => {
	let dragBlockAttrs = new Array();
	if ('dragblock/image' === propname) {
		dragBlockAttrs.push(cloneDeep({ slug: 'src', value: '[dragblock.post.image.src]' }))
	}
	return cloneDeep(dragBlockAttrs);
}
export const DragBlockFormatted = {
	'href': {
		keyword: 'href link url',
		label: __('Href', 'dragblock'),
		note: __('URL of the link', 'dragblock'),
		type: 'text'
	},
	'target': {
		keyword: 'target',
		label: __('Target', 'dragblock'),
		note: __('Target window, tab, or element to open the link', 'dragblock'),
		type: 'select',
		options: [
			{ value: '', label: __('Default', 'dragblock') },
			{ value: '_blank', label: __('Blank', 'dragblock') },
			{ value: '_parent', label: __('Parent', 'dragblock') },
			{ value: '_self', label: __('Self', 'dragblock') },
			{ value: '_top', label: __('Top', 'dragblock') },
		]
	},
	'rel': {
		keyword: 'rel',
		label: __('Rel', 'dragblock'),
		note: __('Relationship between the linked resource and the current document', 'dragblock'),
		type: 'text'
	},
	'tabindex': {
		keyword: 'tabindex',
		label: __('Tab Index', 'dragblock'),
		note: __('Order in focus navigating sequence', 'dragblock'),
		type: 'number'
	},
	'src': {
		keyword: 'src',
		label: __('Src', 'dragblock'),
		note: __('URL of the media', 'dragblock'),
		type: 'text',
	},
	'alt': {
		keyword: 'alt',
		label: __('Alt', 'dragblock'),
		note: __('Alternative text', 'dragblock'),
		type: 'multilingual-text',
	},
	'name': {
		keyword: 'name',
		label: __('Name', 'dragblock'),
		note: __('Name', 'dragblock'),
		type: 'text',
	},
	'placeholder': {
		keyword: 'placeholder',
		label: __('Placeholder', 'dragblock'),
		note: __('Placeholder', 'dragblock'),
		type: 'multilingual-text',
	},
	'title': {
		keyword: 'title',
		label: __('Title', 'dragblock'),
		note: __('title', 'dragblock'),
		type: 'multilingual-text',
	},
	'type': {
		keyword: 'type',
		label: __('Type', 'dragblock'),
		note: __('type', 'dragblock'),
		type: 'select',
		options: [
			{ value: 'text', label: __('Text', 'dragblock') },
			{ value: 'submit', label: __('Submit', 'dragblock') },
			{ value: 'password', label: __('Password', 'dragblock') },
			{ value: 'checkbox', label: __('Checkbox', 'dragblock') },
			{ value: 'radio', label: __('Radio', 'dragblock') },
			{ value: 'button', label: __('Button', 'dragblock') },
			{ value: 'number', label: __('Number', 'dragblock') },
			{ value: 'email', label: __('Email', 'dragblock') },
			{ value: 'tel', label: __('Phone', 'dragblock') },
			{ value: 'url', label: __('URL', 'dragblock') },
			{ value: 'date', label: __('Date', 'dragblock') },
			{ value: 'time', label: __('Time', 'dragblock') },
			{ value: 'month', label: __('Month', 'dragblock') },
			{ value: 'week', label: __('Week', 'dragblock') },
			{ value: 'range', label: __('Range', 'dragblock') },
			{ value: 'color', label: __('Color', 'dragblock') },
			{ value: 'search', label: __('Search', 'dragblock') },
			{ value: 'file', label: __('File', 'dragblock') },
			{ value: 'hidden', label: __('Hidden', 'dragblock') },
			{ value: 'reset', label: __('Reset', 'dragblock') },
		]
	},
	'value': {
		keyword: 'value',
		label: __('Value', 'dragblock'),
		note: __('value', 'dragblock'),
		type: 'multilingual-text',
	},
	'disabled': {
		keyword: 'disabled',
		label: __('Disabled', 'dragblock'),
		note: __('Not mutable, focusable, submitted', 'dragblock'),
		type: 'text',
	},
	'required': {
		keyword: 'required',
		label: __('Required', 'dragblock'),
		note: __('required', 'dragblock'),
		type: 'text',
	},
	'selected': {
		keyword: 'selected',
		label: __('Selected', 'dragblock'),
		note: __('selected', 'dragblock'),
		type: 'text',
	},
	'action': {
		keyword: 'action',
		label: __('Action', 'dragblock'),
		note: __('action', 'dragblock'),
		type: 'action',
	},
	'method': {
		keyword: 'method',
		label: __('Method', 'dragblock'),
		note: __('method', 'dragblock'),
		type: 'select',
		options: [
			{ value: 'POST', label: __('POST', 'dragblock') },
			{ value: 'GET', label: __('GET', 'dragblock') },
		]
	},
	'for': {
		keyword: 'for',
		label: __('For', 'dragblock'),
		note: __('For a block with certain ID', 'dragblock'),
		type: 'text',
	},
	'sizes': {
		keyword: 'sizes',
		label: __('Sizes', 'dragblock'),
		note: __('Image sizes in different screen', 'dragblock'),
		type: 'unit',
	},
}
export const DragBlockEmpty = (attrList, slug) => {
	if (attrList) {
		for (let [index, attr] of attrList.entries()) {
			if (attr['slug'] === slug && !attr['disabled']) return index
		}
	}
	return -1;
}
export const DragBlockGoogle = (attrList, slug) => {
	let index = DragBlockEmpty(attrList, slug)
	if (index === -1) return null
	return attrList[index]['value']
}
export const DragBlockExisting = (attrList, slug) => {
	let index = DragBlockEmpty(attrList, slug);
	if (index > -1) {
		attrList.splice(index, 1);
	}
}
export const DragBlockAdd = (attrList, slug, value) => {
	let index = DragBlockEmpty(attrList, slug)
	if (index === -1) {
		attrList.unshift({
			'slug': slug,
			'value': value
		});
		return attrList;
	}
	attrList[index]['value'] = value;
	return attrList;
}
wp.hooks.addFilter(
	'blocks.registerBlockType',
	'dragblock/attributes-register',
	function (settings, name) {
		settings = Object.assign({}, settings, {
			attributes: Object.assign({}, settings.attributes, {
				dragBlockClientId: {
					type: 'string',
				},
				anchor: {
					type: 'string',
					source: 'attribute',
					default: '',
					attribute: 'id',
					selector: '*', // very important
				},
				className: {
					type: 'string',
					default: '',
				},
				dragBlockAttrs: {
					type: 'array',
					default: '',
				},
			}),
		});
		if ((name.indexOf('dragblock') !== -1)) {
			settings = Object.assign({}, settings, {
				attributes: Object.assign({}, settings.attributes, {
				}),
				supports: Object.assign({}, settings.supports, {
					anchor: true,
				}),
			});
		}
		return settings;
	}
);