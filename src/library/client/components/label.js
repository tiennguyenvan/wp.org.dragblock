import {
	BaseControl,
} from '@wordpress/components';
export default function DragBlockCurrentSupported( props) {
    const { children } = props;
    if (!children) return (<></>);
    return (
        <BaseControl.VisualLabel as='legend'>
            { children }
        </BaseControl.VisualLabel>
    )
}