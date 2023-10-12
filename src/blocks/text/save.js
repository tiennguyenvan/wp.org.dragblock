import { useBlockProps, RichText } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';
export default function save(props) {
	const { attributes } = props;
	let { dragBlockText } = attributes;
	let blockProps = useBlockProps.save();
	return (
		<span {...blockProps}>
		</span>
	)
}