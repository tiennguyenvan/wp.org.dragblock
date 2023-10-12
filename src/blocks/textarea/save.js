import { useBlockProps, RichText } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';
export default function save(props) {	
	let blockProps = useBlockProps.save();
    return (			
		<textarea { ...blockProps }/>
	)
}