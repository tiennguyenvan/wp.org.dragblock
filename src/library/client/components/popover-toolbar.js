import classnames from 'classnames';
import { ToolbarButton } from '@wordpress/components';
import { Dropdown } from '@wordpress/components';
import { NavigableMenu } from '@wordpress/components';
import { MenuItem } from '@wordpress/components';
import { Popover } from '@wordpress/components';
import {
    close
} from '@wordpress/icons'
import { useState } from '@wordpress/element';
export default function DragBlockCurrentSave({
    children,
    icon,
    label,
    onKeyDown
}) {
    const [isPopoverToolbarOpen, setPopoverToolbarOpen] = useState(false);
    const DragBlockCurrentInline = () => {
        setPopoverToolbarOpen(false);
    }
    const DragBlockCurrentFont = () => {
        setPopoverToolbarOpen(true);
    }
    let DragBlockLastObject = null;
    return (
        <>
            <ToolbarButton onClick={DragBlockCurrentFont} icon={icon} label={label} tooltipPosition='top center' />
            {isPopoverToolbarOpen && (
                <Popover
                    onKeyDown={onKeyDown}
                    className='dragblock-toolbar-popover'
                    onFocusOutside={DragBlockCurrentInline}
                    onClose={DragBlockCurrentInline}
                    onMouseMove={(e) => {
                        if (DragBlockLastObject === null) {
                            DragBlockLastObject = { X: e.clientX, Y: e.clientY }
                            return;
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (DragBlockLastObject === null || DragBlockLastObject.X === e.clientX || DragBlockLastObject.Y === e.clientY) {
                            return;
                        }
                        DragBlockCurrentInline();
                    }}
                >
                    {children}
                </Popover>
            )}
        </>
    );
}