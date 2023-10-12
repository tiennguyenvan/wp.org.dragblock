import { __ } from '@wordpress/i18n';
const DragBlockAjax = __(
	'The quick brown fox jumps over the lazy dog.',
	'dragblock'
);
const DragBlockFetch = __(
	'Incredible as it may seem, I believe that the Aleph of Garay Street was a false Aleph.',
	'dragblock'
);
const DragBlockResults = __(
	"First a glass of pseudo-cognac, he ordered, and then down you dive into the cellar. Let me warn you, you'll have to lie flat on your back. Total darkness, total immobility, and a certain ocular adjustment will also be necessary. From the floor, you must focus your eyes on the nineteenth step. Once I leave you, I'll lower the trapdoor and you'll be quite alone. You needn't fear the rodents very much though I know you will. In a minute or two, you'll see the Aleph, the microcosm of the alchemists and Kabbalists, our true proverbial friend, the multum in parvo!",
	'dragblock'
);
export const DragBlockBorder = 'sentence';
export const DragBlockBox = {
	heading: {
		text: DragBlockAjax,
		size: 30,
		lineHeight: 1.1,
		margin: '0.5em 0',
		component: 'h2',
	},
	sentence: {
		text: DragBlockFetch,
		size: 20,
		lineHeight: 1.3,
		margin: '0.5em 0',
		component: 'p',
	},
	paragraph: {
		text: DragBlockResults,
		size: 16,
		lineHeight: 1.5,
		margin: '0.5em 0',
		component: 'p',
	},
};