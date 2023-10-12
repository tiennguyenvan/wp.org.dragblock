import { __ } from '@wordpress/i18n';
import { Inserter } from '@wordpress/block-editor';
import { DragBlockCurrentImage } from '../icons/icons';
export default function DragBlockLastPart(
    { rootClientId },
) {
    return (
        <Inserter
            position="bottom center"
            rootClientId={rootClientId}
            __experimentalIsQuick
            renderToggle={({
                onToggle,
            }) => {                
                return (
                    <a
                        title={__('Add a Child', 'dragblock')}
                        onClick={onToggle}
                    >
                        {DragBlockCurrentImage}
                    </a>
                );
            }}
            isAppender={true}
        />
    );
}