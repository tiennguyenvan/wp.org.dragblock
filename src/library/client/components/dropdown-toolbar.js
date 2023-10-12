import classnames from 'classnames';
import { ToolbarButton } from '@wordpress/components';
import { Dropdown } from '@wordpress/components';
import { NavigableMenu } from '@wordpress/components';
import { MenuItem } from '@wordpress/components';
import {
    close
} from '@wordpress/icons'
export default function DragBlockCurrentAvai({
    options,
    onChange,
    value,
    label
}) {
    let icon = close;
    for (let option of options) {
        if (option.value === value) {
            icon = option.icon;
            break;
        }
    }
    return (
        <Dropdown
            renderToggle={({ onToggle }) => (
                <ToolbarButton
                    label={label}
                    tooltipPosition='top center'
                    onClick={onToggle}>
                    {icon}
                </ToolbarButton>
            )}
            renderContent={({ onClose }) => (
                <NavigableMenu className='dragblock-toolbar-dropdown'>
                    {
                        options.map((option, _i) => {
                            return (
                                <MenuItem
                                    key={_i}
                                    className={
                                        classnames('dragblock-toolbar-dropdown-item', {
                                            'active': (value === option.value)
                                        })
                                    }
                                    onClick={() => {
                                        onClose(true);
                                        onChange(option.value);
                                    }}
                                >
                                    {option.icon} <span>{option.label}</span>
                                </MenuItem>
                            )
                        })
                    }
                </NavigableMenu>
            )}
        >
        </Dropdown>);
}