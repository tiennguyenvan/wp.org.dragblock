import {
	useBlockProps
} from '@wordpress/block-editor';
import DragBlockLastInit from './utils/parse-icon';
export default function Save(props) {
	const {
		icon,
	} = props.attributes;
	if (!icon) {
		return null;
	}
	return (
		<span {...useBlockProps.save()} dangerouslySetInnerHTML={{ __html: icon }} />
	)
}