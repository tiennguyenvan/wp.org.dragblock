import { __ } from '@wordpress/i18n';
import { cloneDeep } from 'lodash';
export const DragBlockChild = [
	{ slug: 'display', value: '' },
	{ slug: 'color', value: '' },
	{ slug: 'background-color', value: '' },
	{ slug: 'border', value: '' },
	{ slug: 'border-radius', value: '' },
	{ slug: 'padding', value: '' },
	{ slug: 'margin-top', value: '' },
	{ slug: 'margin', value: '' },
];
export const initDragBlockStyles = (propname) => {
	let dragBlockStyles = new Array();
	if (['dragblock/wrapper'].includes(propname)) {
		dragBlockStyles.push(cloneDeep({ slug: 'gap', value: '' }))
	}
	if (['dragblock/image'].includes(propname)) {
	}
	return cloneDeep(dragBlockStyles);
}
export const DragBlockParent = {
	'color': {
		keyword: 'text color',
		label: __('Text Color', 'dragblock'),
		note: __('Color for text', 'dragblock'),
		type: 'color'
	},
	'background-color': {
		keyword: 'background color',
		label: __('Background Color', 'dragblock'),
		note: __('Color for the background', 'dragblock'),
		type: 'color'
	},
	'font-size': {
		keyword: 'text font size',
		label: __('Font Size', 'dragblock'),
		note: __('Size of text', 'dragblock'),
		type: 'font-size'
	},
	'font-weight': {
		keyword: 'text font weight appearance bold',
		label: __('Font Weight', 'dragblock'),
		note: __('text weight / boldness ', 'dragblock'),
		type: 'font-weight'
	},
	'line-height': {
		keyword: 'line height',
		label: __('Line Height', 'dragblock'),
		note: __('Distance between text lines', 'dragblock'),
		type: 'line-height'
	},
	'text-decoration': {
		keyword: 'text underline strikethrough',
		label: __('Text Decoration', 'dragblock'),
		note: __('Text underline / strikethrough', 'dragblock'),
		type: 'text-decoration'
	},
	'text-transform': {
		keyword: 'capitalize uppercase lowercase letter text case transform',
		label: __('Text Transform', 'dragblock'),
		note: __('text letter case: uppercase, lowercase, capitalized', 'dragblock'),
		type: 'text-transform'
	},
	'width': {
		keyword: 'width horizontal size',
		label: __('Width', 'dragblock'),
		note: __('Horizontal Size', 'dragblock'),
		type: 'width'
	},
	'height': {
		keyword: 'height vertical size',
		label: __('Height', 'dragblock'),
		note: __('Vertical Size', 'dragblock'),
		type: 'height'
	},
	'border': {
		keyword: 'edge border strokes',
		label: __('Border', 'dragblock'),
		note: __('Stroke appearance', 'dragblock'),
		type: 'border'
	},
	'margin-top': {
		keyword: 'margin top outside space',
		label: __('Margin Top', 'dragblock'),
		note: __('Top outside space', 'dragblock'),
		type: 'margin' // could set a negative value
	},
	'margin': {
		keyword: 'margin outside space',
		label: __('Margin', 'dragblock'),
		note: __('Outside space', 'dragblock'),
		type: 'margin' // could set a negative value
	},
	'padding': {
		keyword: 'padding inside space',
		label: __('Padding', 'dragblock'),
		note: __('Inside space', 'dragblock'),
		type: 'margin'
	},
	'letter-spacing': {
		keyword: 'text character letter spacing',
		label: __('Letter Spacing', 'dragblock'),
		note: __('Horizontal space between text characters', 'dragblock'),
		type: 'unit',
		units: {
			px: {
				value: 'px', label: 'px', min: -10, max: 20, step: .5, default: 0
			}
		}
	},
	'text-align': {
		keyword: 'text align left right center',
		label: __('Text Align', 'dragblock'),
		note: __('Left right center text align', 'dragblock'),
		type: 'text-align'
	},
	'border-top': {
		keyword: 'edge border strokes top side',
		label: __('Border Top', 'dragblock'),
		note: __('Top stroke appearance', 'dragblock'),
		type: 'border'
	},
	'border-right': {
		keyword: 'edge border strokes right side',
		label: __('Border Right', 'dragblock'),
		note: __('Right stroke appearance', 'dragblock'),
		type: 'border'
	},
	'border-bottom': {
		keyword: 'edge border strokes bottom side',
		label: __('Border Bottom', 'dragblock'),
		note: __('Bottom stroke appearance', 'dragblock'),
		type: 'border'
	},
	'border-left': {
		keyword: 'edge border strokes bottom left',
		label: __('Border Left', 'dragblock'),
		note: __('Left stroke appearance', 'dragblock'),
		type: 'border'
	},
	'border-color': {
		keyword: 'edge border strokes color',
		label: __('Border Color', 'dragblock'),
		note: __('Stroke color', 'dragblock'),
		type: 'color'
	},
	'border-top-color': {
		keyword: 'edge border top stroke color',
		label: __('Border Top Color ', 'dragblock'),
		note: __('Top stroke color', 'dragblock'),
		type: 'color'
	},
	'border-right-color': {
		keyword: 'edge border right stroke color',
		label: __('Border Right Color ', 'dragblock'),
		note: __('Right stroke color', 'dragblock'),
		type: 'color'
	},
	'border-bottom-color': {
		keyword: 'edge border bottom stroke color',
		label: __('Border Bottom Color ', 'dragblock'),
		note: __('Bottom stroke color', 'dragblock'),
		type: 'color'
	},
	'border-left-color': {
		keyword: 'edge border left stroke color',
		label: __('Border Left Color ', 'dragblock'),
		note: __('Left stroke color', 'dragblock'),
		type: 'color'
	},
	'border-width': {
		keyword: 'edge border stroke width size',
		label: __('Border Width', 'dragblock'),
		note: __('Stroke size', 'dragblock'),
		type: 'unit'
	},
	'border-top-width': {
		keyword: 'edge border stroke top side width size',
		label: __('Border Top Width', 'dragblock'),
		note: __('Top stroke size', 'dragblock'),
		type: 'unit'
	},
	'border-right-width': {
		keyword: 'edge border stroke right side width size',
		label: __('Border Right Width', 'dragblock'),
		note: __('Right stroke size', 'dragblock'),
		type: 'unit'
	},
	'border-bottom-width': {
		keyword: 'edge border stroke bottom side width size',
		label: __('Border Bottom Width', 'dragblock'),
		note: __('Bottom stroke size', 'dragblock'),
		type: 'unit'
	},
	'border-left-width': {
		keyword: 'edge border stroke left side width size',
		label: __('Border Left Width', 'dragblock'),
		note: __('left stroke size', 'dragblock'),
		type: 'unit'
	},
	'border-style': {
		keyword: 'edge border stroke line style design dotted dashed solid',
		label: __('Border Style', 'dragblock'),
		note: __('Stroke line style', 'dragblock'),
		type: 'border-style'
	},
	'border-top-style': {
		keyword: 'edge border top side stroke style design dotted dashed solid',
		label: __('Border Top Style', 'dragblock'),
		note: __('Top stroke line style', 'dragblock'),
		type: 'border-style'
	},
	'border-right-style': {
		keyword: 'edge border right side stroke line style design dotted dashed solid',
		label: __('Border Right Style', 'dragblock'),
		note: __('Right stroke line style', 'dragblock'),
		type: 'border-style'
	},
	'border-bottom-style': {
		keyword: 'edge border bottom side stroke line style design dotted dashed solid',
		label: __('Border Bottom Style', 'dragblock'),
		note: __('Bottom stroke line style', 'dragblock'),
		type: 'border-style'
	},
	'border-left-style': {
		keyword: 'edge border left side stroke line style design dotted dashed solid',
		label: __('Border Left Style', 'dragblock'),
		note: __('Left stroke line style', 'dragblock'),
		type: 'border-style'
	},
	'border-radius': {
		keyword: 'border edge stroke radius round corner circular elliptical ',
		label: __('Border Radius', 'dragblock'),
		note: __('Rounds corners', 'dragblock'),
		type: 'margin',
	},
	'border-top-left-radius': {
		keyword: 'top left border edge stroke radius round corner circular elliptical ',
		label: __('Border Top Left Radius', 'dragblock'),
		note: __('Rounds top left corner', 'dragblock'),
		type: 'unit'
	},
	'border-top-right-radius': {
		keyword: 'top right border edge stroke radius round corner circular elliptical ',
		label: __('Border Top Right Radius', 'dragblock'),
		note: __('Rounds top right corner', 'dragblock'),
		type: 'unit'
	},
	'border-bottom-right-radius': {
		keyword: 'bottom right border edge stroke radius round corner circular elliptical ',
		label: __('Border Bottom Right Radius', 'dragblock'),
		note: __('Rounds bottom right corner', 'dragblock'),
		type: 'unit'
	},
	'border-bottom-left-radius': {
		keyword: 'bottom left border edge stroke radius round corner circular elliptical ',
		label: __('Border Bottom Left Radius', 'dragblock'),
		note: __('Rounds bottom left corner', 'dragblock'),
		type: 'unit'
	},
	'margin-right': {
		keyword: 'margin right outside space',
		label: __('Margin Right', 'dragblock'),
		note: __('Right outside space', 'dragblock'),
		type: 'margin' // could set a negative value
	},
	'margin-bottom': {
		keyword: 'margin bottom outside space',
		label: __('Margin Bottom', 'dragblock'),
		note: __('Top outside space', 'dragblock'),
		type: 'margin' // could set a negative value
	},
	'margin-left': {
		keyword: 'margin left outside space',
		label: __('Margin Left', 'dragblock'),
		note: __('Left outside space', 'dragblock'),
		type: 'margin' // could set a negative value
	},
	'padding-top': {
		keyword: 'padding top inside space',
		label: __('Padding Top', 'dragblock'),
		note: __('Top inside space', 'dragblock'),
		type: 'margin'
	},
	'padding-right': {
		keyword: 'padding right inside space',
		label: __('Padding Right', 'dragblock'),
		note: __('Right inside space', 'dragblock'),
		type: 'margin'
	},
	'padding-bottom': {
		keyword: 'padding bottom inside space',
		label: __('Padding Bottom', 'dragblock'),
		note: __('Bottom inside space', 'dragblock'),
		type: 'margin'
	},
	'padding-left': {
		keyword: 'padding left inside space',
		label: __('Padding Left', 'dragblock'),
		note: __('Left inside space', 'dragblock'),
		type: 'margin'
	},
	'box-shadow': {
		keyword: 'box shadow',
		label: __('Box Shadow', 'dragblock'),
		note: __('Shadow of block', 'dragblock'),
		type: 'box-shadow'
	},
	'text-shadow': {
		keyword: 'text shadow',
		label: __('Text Shadow', 'dragblock'),
		note: __('Shadows of text', 'dragblock'),
		type: 'text-shadow'
	},
	'z-index': {
		keyword: 'index layer order z- overlap zindex zorder',
		label: __('Z-index', 'dragblock'),
		note: __('Element layer order', 'dragblock'),
		type: 'number'
	},
	'overflow': {
		keyword: 'overflow hidden scroll',
		label: __('Overflow', 'dragblock'),
		note: __('If children bigger than parent', 'dragblock'),
		type: 'select',
		options: [
			{ value: '', label: __('Default', 'dragblock') },
			{ value: 'auto', label: __('Auto', 'dragblock') },
			{ value: 'hidden', label: __('Hidden', 'dragblock') },
			{ value: 'scroll', label: __('Scroll', 'dragblock') },
			{ value: 'visible', label: __('Visible', 'dragblock') },
		]
	},
	'position': {
		keyword: 'positioned location elements',
		label: __('Position', 'dragblock'),
		note: __('Location of positioned elements', 'dragblock'),
		type: 'position'
	},
	'top': {
		keyword: 'top',
		label: __('Top', 'dragblock'),
		note: __('Top', 'dragblock'),
		type: 'margin',
	},
	'bottom': {
		keyword: 'bottom',
		label: __('Bottom', 'dragblock'),
		note: __('bottom', 'dragblock'),
		type: 'margin',
	},
	'left': {
		keyword: 'left',
		label: __('Left', 'dragblock'),
		note: __('Left', 'dragblock'),
		type: 'margin',
	},
	'right': {
		keyword: 'right',
		label: __('Right', 'dragblock'),
		note: __('right', 'dragblock'),
		type: 'margin',
	},
	'display': {
		keyword: 'display',
		label: __('Display', 'dragblock'),
		note: __('Display', 'dragblock'),
		type: 'display'
	},
	'tranlate': {
		keyword: 'translate axis position elements coordinates 3D 3-directions',
		label: __('Translate', 'dragblock'),
		note: __('Element position in 3D', 'dragblock'),
		type: 'translate'
	},
	'transform': {
		keyword: 'transform matrix matrix3d perspective rotate rotate3d rotateX rotateY rotateZ translate translate3d translateX translateY translateZ scale scale3d scaleX scaleY scaleZ skew skewX skewY',
		label: __('Transform', 'dragblock'),
		note: __('Rotate, scale, skew, translate', 'dragblock'),
		type: 'transform'
	},
	'align-items': {
		keyword: 'align items vertical',
		label: __('Align Items', 'dragblock'),
		note: __('Align Vertically', 'dragblock'),
		type: 'align-items'
	},
	'justify-content': {
		keyword: 'justify content distribute space horizontal',
		label: __('Justify Content', 'dragblock'),
		note: __('Distributes space horizontally', 'dragblock'),
		type: 'select',
		options: [
			{ value: '', label: __('Default', 'dragblock') },
			{ value: 'left', label: __('Left', 'dragblock') },
			{ value: 'center', label: __('Center', 'dragblock') },
			{ value: 'right', label: __('Right', 'dragblock') },
			{ value: 'space-between', label: __('Space Between', 'dragblock') },
			{ value: 'space-around', label: __('Space Around', 'dragblock') },
			{ value: 'stretch', label: __('Stretch', 'dragblock') },
		]
	},
	'flex-wrap': {
		keyword: 'wrap flex multiple single lines',
		label: __('Flex Wrap', 'dragblock'),
		note: __('Push items on multiple or single lines', 'dragblock'),
		type: 'flex-wrap'
	},
	'flex-direction': {
		keyword: 'flex direction place row column',
		label: __('Flex Direction', 'dragblock'),
		note: __('Show items on rows or columns', 'dragblock'),
		type: 'flex-direction'
	},
	'flex-grow': {
		keyword: 'flex grow sizes ratio items',
		label: __('Flex Grow', 'dragblock'),
		note: __('Size ratio of items', 'dragblock'),
		type: 'number'
	},
	'flex-shrink': {
		keyword: 'flex shrink sizes ratio items',
		label: __('Flex Shrink', 'dragblock'),
		note: __('Size ratio of items', 'dragblock'),
		type: 'number'
	},
	'flex-basis': {
		keyword: 'flex basis item size width height ',
		label: __('Flex Basis', 'dragblock'),
		note: __('Item size/width/height', 'dragblock'),
		type: 'width'
	},
	'gap': {
		keyword: 'row column horizontal vertical gap gutter',
		label: __('Gap', 'dragblock'),
		note: __('Gaps between elements'),
		type: 'unit'
	},
	'row-gap': {
		keyword: 'row vertical gap gutter',
		label: __('Row Gap', 'dragblock'),
		note: __('Gaps / gutters between rows'),
		type: 'unit'
	},
	'column-gap': {
		keyword: 'column horizontal gap size gutter',
		label: __('Column Gap', 'dragblock'),
		note: __('Gaps / gutters between columns'),
		type: 'unit'
	},
	'grid-template-columns': {
		keyword: 'grid template columns',
		label: __('Grid Template Columns', 'dragblock'),
		note: __('Grid template columns', 'dragblock'),
		type: 'text'
	},
	'grid-template-rows': {
		keyword: 'grid template rows',
		label: __('Grid Template Rows', 'dragblock'),
		note: __('Grid template rows', 'dragblock'),
		type: 'text'
	},
	'grid-auto-flow': {
		keyword: 'grid auto flow',
		label: __('Grid Auto Flow', 'dragblock'),
		note: __('Grid auto flow', 'dragblock'),
		type: 'text'
	},
	'grid-column': {
		keyword: 'grid column',
		label: __('Grid Column', 'dragblock'),
		note: __('Grid Column', 'dragblock'),
		type: 'text'
	},
	'grid-row': {
		keyword: 'grid row',
		label: __('Grid Row', 'dragblock'),
		note: __('Grid Row', 'dragblock'),
		type: 'text'
	},
	'grid-area': {
		keyword: 'grid area',
		label: __('Grid Area', 'dragblock'),
		note: __('Grid Area', 'dragblock'),
		type: 'text'
	},
	'align-self': {
		keyword: 'align-self',
		label: __('Align Self', 'dragblock'),
		note: __('Align Self', 'dragblock'),
		type: 'text'
	},
	'justify-self': {
		keyword: 'justify-self',
		label: __('Justify Self', 'dragblock'),
		note: __('Justify Self', 'dragblock'),
		type: 'text'
	},
	'background-image': {
		keyword: 'background image',
		label: __('Background Image', 'dragblock'),
		note: __('SRC for background Image', 'dragblock'),
		type: 'text'
	},
	'background-size': {
		keyword: 'background size',
		label: __('Background Size', 'dragblock'),
		note: __('Size of background image'),
		type: 'select',
		options: [
			{ value: '', label: __('Default', 'dragblock') },
			{ value: 'cover', label: __('Cover', 'dragblock') },
			{ value: 'contain', label: __('Contain', 'dragblock') },
			{ value: 'auto', label: __('Auto', 'dragblock') },
		]
	},
	'background-position-x': {
		keyword: 'background position x',
		label: __('Background Position X', 'dragblock'),
		note: __('Position of background image on X axis', 'dragblock'),
		type: 'select',
		options: [
			{ value: '', label: __('Default', 'dragblock') },
			{ value: 'left', label: __('Left', 'dragblock') },
			{ value: 'center', label: __('Center', 'dragblock') },
			{ value: 'right', label: __('Right', 'dragblock') },
		]
	},
	'background-position-y': {
		keyword: 'background position y',
		label: __('Background Position Y', 'dragblock'),
		note: __('Position of background image on Y axis', 'dragblock'),
		type: 'select',
		options: [
			{ value: '', label: __('Default', 'dragblock') },
			{ value: 'top', label: __('Left', 'dragblock') },
			{ value: 'center', label: __('Center', 'dragblock') },
			{ value: 'bottom', label: __('Right', 'dragblock') },
		]
	},
	'background-repeat': {
		keyword: 'background repeat',
		label: __('Background Repeat', 'dragblock'),
		note: __('Repeatition of background image', 'dragblock'),
		type: 'select',
		options: [
			{ value: '', label: __('Default', 'dragblock') },
			{ value: 'no-repeat', label: __('No Repeat', 'dragblock') },
			{ value: 'space', label: __('Space', 'dragblock') },
			{ value: 'repeat-x', label: __('Repeat X', 'dragblock') },
			{ value: 'repeat-y', label: __('Repeat Y', 'dragblock') },
			{ value: 'repeat', label: __('Repeat', 'dragblock') },
			{ value: 'round', label: __('Round', 'dragblock') },
		]
	},
	'user-select': {
		keyword: 'user select',
		label: __('User Select', 'dragblock'),
		note: __('Selection of content', 'dragblock'),
		type: 'select',
		options: [
			{ value: '', label: __('Default', 'dragblock') },
			{ value: 'none', label: __('None', 'dragblock') },
			{ value: 'text', label: __('Text', 'dragblock') },
			{ value: 'contain', label: __('Contain', 'dragblock') },
			{ value: 'all', label: __('All', 'dragblock') },
		]
	},
	'cursor': {
		keyword: 'mouse cursor',
		label: __('Cursor', 'dragblock'),
		note: __('Icon of Mouse Cursor', 'dragblock'),
		type: 'select',
		options: [
			{ value: '', label: __('Default', 'dragblock') },
			{ value: 'pointer', label: __('Pointer', 'dragblock') },
			{ value: 'text', label: __('Text', 'dragblock') },
		]
	},
	'object-fit': {
		keyword: 'object fit',
		label: __('Object Fit', 'dragblock'),
		note: __('Way to fit content in containers', 'dragblock'),
		type: 'select',
		options: [
			{ value: '', label: __('Default', 'dragblock') },
			{ value: 'cover', label: __('Cover', 'dragblock') },
			{ value: 'contain', label: __('Contain', 'dragblock') },
			{ value: 'fill', label: __('Fill', 'dragblock') },
			{ value: 'none', label: __('None', 'dragblock') },
		]
	},
	'zoom': {
		keyword: 'zoom',
		label: __('Zoom', 'dragblock'),
		note: __('Scale element layout size', 'dragblock'),
		type: 'number',
		min: 0,
		max: 10,
		step: 0.1
	},
	'resize': {
		keyword: 'resize',
		label: __('Resize', 'dragblock'),
		note: __('Direction for resizing', 'dragblock'),
		type: 'select',
		options: [
			{ value: '', label: __('Default', 'dragblock') },
			{ value: 'horizontal', label: __('Horizontal', 'dragblock') },
			{ value: 'vertical', label: __('Vertical', 'dragblock') },
		]
	},
	'max-width': {
		keyword: 'max width horizontal size',
		label: __('Max Width', 'dragblock'),
		note: __('Max Horizontal Size', 'dragblock'),
		type: 'width'
	},
	'min-width': {
		keyword: 'min width horizontal size',
		label: __('Min Width', 'dragblock'),
		note: __('Min Horizontal Size', 'dragblock'),
		type: 'width'
	},
	'max-height': {
		keyword: 'max height vertical size',
		label: __('Max Height', 'dragblock'),
		note: __('Max vertical Size', 'dragblock'),
		type: 'width'
	},
	'min-height': {
		keyword: 'min height vertical size',
		label: __('Min Height', 'dragblock'),
		note: __('Min vertical Size', 'dragblock'),
		type: 'width'
	},
	'animation-name': {
		keyword: 'animation name',
		label: __('Animation Name', 'dragblock'),
		note: __('Defined animation name', 'dragblock'),
		type: 'animation-name'
	},
	'animation-duration': {
		keyword: 'animation duration',
		label: __('Animation Duration', 'dragblock'),
		note: __('Time period for Animation', 'dragblock'),
		type: 'unit',
		units: [
			{
				value: 's',
				label: __('s', 'dragblock'),
				min: 1,
				max: 10,
				step: 1,
				default: 1
			},
			{
				value: 'ms',
				label: __('ms', 'dragblock'),
				min: 50,
				max: 1000,
				step: 10,
				default: 200
			},
		]
	},
	'opacity': {
		keyword: 'opacity transparency',
		label: __('Opacity', 'dragblock'),
		note: __('Transparency', 'dragblock'),
		type: 'unit',
		units: [
			{
				value: '%',
				label: __('%', 'dragblock'),
				min: 1,
				max: 100,
				step: 1,
				default: 100
			}
		]
	},
	'outline': {
		keyword: 'edge outline strokes',
		label: __('Outline', 'dragblock'),
		note: __('Outline appearance', 'dragblock'),
		type: 'border'
	},
}
wp.hooks.addFilter(
	'blocks.registerBlockType',
	'dragblock/appearance-register',
	function (settings, name) {
		settings = Object.assign({}, settings, {
			attributes: Object.assign({}, settings.attributes, {
				dragBlockStyles: { type: 'array', default: '' },
				dragBlockCSS: { type: 'string', default: '' },
			}),
		});
		return settings;
	}
);