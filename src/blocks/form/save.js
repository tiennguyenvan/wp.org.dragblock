import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks'
export default function save(props) {		
	const {attributes} = props;	
	let blockProps = useBlockProps.save();
	return (
		<form {...blockProps}>			
				<InnerBlocks.Content />			
		</form>
	);
}