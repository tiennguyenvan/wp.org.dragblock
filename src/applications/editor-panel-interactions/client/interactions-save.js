import { useBlockProps } from "@wordpress/block-editor/build/components";
wp.hooks.addFilter(
	'blocks.getSaveContent.extraProps',
	'dragblock/interactions-save',
	function (extraProps, blockType, attributes) {
		const { dragBlockScripts } = attributes;
		if (dragBlockScripts) {
			for (let script of dragBlockScripts) {
			}
		}
		return extraProps;
	}
);