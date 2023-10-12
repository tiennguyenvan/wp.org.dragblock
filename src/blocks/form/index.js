import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import save from './save';
import metadata from './block.json';
registerBlockType( metadata.name, {
	usesContext: [ 'dragblockParentStyles' ], //dragblock/wrapper-dragBlockStyles
	edit: Edit,
	save
} );