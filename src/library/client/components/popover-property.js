import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { Popover, Tooltip } from '@wordpress/components';
import { useEffect, useRef, useState } from '@wordpress/element';
import { cloneDeep, isArray, isFunction } from 'lodash';
import { DragBlockAvaiAvailable, DragBlockAvaiArray, DragBlockAvaiQuery, DragBlockAvaiParam } from '../icons/icons';
export default function DragBlockCurrentNew({
    children,
    className,
    onClose,
    onAction, // post processing the actions (after pre-processes)
    onMouseLeave,
    onMouseEnter,
    onKeyDown,
    actions, // if a property is a function, we will use that as the pre-process actions
    title,
    disabled, // is this property disabled    
    hidden,
    list, // the list of properties
    index, // current index of the property in the property list
    position,
}) {
    let DragBlockCurrentDefault = null;
    const DragBlockCurrentAppearance = useRef(null);
    if (!onClose) onClose = () => { };
    if (!onMouseLeave) onMouseLeave = () => { };
    if (!onMouseEnter) onMouseEnter = () => { };
    if (!onKeyDown) onKeyDown = () => { };
    actions = Object.assign({}, {
        top: true,
        bottom: true,
        up: true,
        down: true,
        duplicate: true,
        disable: true,
        hidden: true,
        delete: true,
    }, actions);
    return (
        <>
            <Popover
                focusOnMount={false}
                position={position ? position : 'bottom center'}
                className={'dragblock-property-popover' + (className ? ' ' + className : '')}
                onFocusOutside={() => {
                    onClose();
                }}
                onClose={() => {
                    onClose();
                }}
                onClick={(e) => {
                    DragBlockCurrentDefault = { X: e.clientX, Y: e.clientY }
                }}
                onMouseMove={(e) => {
                    DragBlockCurrentDefault = { X: e.clientX, Y: e.clientY }
                }}
                onMouseLeave={(e) => {
                    if (DragBlockCurrentDefault === null || DragBlockCurrentDefault.X === e.clientX || DragBlockCurrentDefault.Y === e.clientY) {
                        return;
                    }
                    onMouseLeave();
                }}
                onKeyDown={(e) => {
                    if (e.key !== 'Escape' && e.key !== 'Enter') {
                        return;
                    }
                    if (e.key === 'Enter' && (
                        e.target.className.indexOf('components-search-control__input') !== -1 ||
                        e.target.className.indexOf('dragblock-chosen-control-input-showing') !== -1 ||
                        e.target.className.indexOf('components-select-control__input') !== -1
                    )
                    ) {
                        return;
                    }
                    onClose();
                }}
                ref={DragBlockCurrentAppearance}
            >
                {}
                <div className='actions'>
                    {}
                    {actions.top ? (
                        <Tooltip
                            delay={10}
                            text={__('Move Top', 'dragblock')}
                            position='top center'
                        >
                            <a
                                className={classnames('action front', { 'disabled': (index === 0) })}
                                onClick={() => {
                                    let DragBlockCurrentEdit = null;
                                    if (isFunction(actions['top'])) {
                                        DragBlockCurrentEdit = actions['top'](cloneDeep(list), index);
                                    } else {
                                        if (index === 0 || !Array.isArray(list)) return;
                                        DragBlockCurrentEdit = cloneDeep(list)
                                        let temp = cloneDeep(DragBlockCurrentEdit[index])
                                        DragBlockCurrentEdit.splice(index, 1)
                                        DragBlockCurrentEdit.unshift(temp);
                                    }
                                    onAction('top', DragBlockCurrentEdit);
                                }}
                            >
                                <svg style={{ transform: 'rotate(180deg)' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M2 12c0 3.6 2.4 5.5 6 5.5h.5V19l3-2.5-3-2.5v2H8c-2.5 0-4.5-1.5-4.5-4s2-4.5 4.5-4.5h3.5V6H8c-3.6 0-6 2.4-6 6zm19.5-1h-8v1.5h8V11zm0 5h-8v1.5h8V16zm0-10h-8v1.5h8V6z"></path></svg>
                            </a>
                        </Tooltip>
                    ) : null}
                    {}
                    {actions.bottom ? (
                        <Tooltip
                            delay={10}
                            text={__('Move Bottom', 'dragblock')}
                            position='top center'
                        >
                            <a
                                className={classnames('action back', { 'disabled': (index === list.length - 1) })}
                                onClick={() => {
                                    let DragBlockCurrentEdit = null;
                                    if (isFunction(actions['bottom'])) {
                                        DragBlockCurrentEdit = actions['bottom'](cloneDeep(list), index);
                                    } else {
                                        if (index === list.length - 1 || !Array.isArray(list)) return;
                                        DragBlockCurrentEdit = cloneDeep(list)
                                        let temp = cloneDeep(DragBlockCurrentEdit[index])
                                        DragBlockCurrentEdit.splice(index, 1)
                                        DragBlockCurrentEdit.push(temp);
                                    }
                                    onAction('bottom', DragBlockCurrentEdit);
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M2 12c0 3.6 2.4 5.5 6 5.5h.5V19l3-2.5-3-2.5v2H8c-2.5 0-4.5-1.5-4.5-4s2-4.5 4.5-4.5h3.5V6H8c-3.6 0-6 2.4-6 6zm19.5-1h-8v1.5h8V11zm0 5h-8v1.5h8V16zm0-10h-8v1.5h8V6z"></path></svg>
                            </a>
                        </Tooltip>
                    ) : null}
                    {}
                    {actions.up ? (
                        <Tooltip
                            delay={10}
                            text={__('Move Up', 'dragblock')}
                            position='top center'
                        >
                            <a
                                className={classnames('action up', { 'disabled': (index === 0) })}
                                onClick={() => {
                                    let DragBlockCurrentEdit = null;
                                    if (isFunction(actions['up'])) {
                                        DragBlockCurrentEdit = actions['up'](cloneDeep(list), index);
                                    } else {
                                        if (index === 0 || !Array.isArray(list)) return;
                                        DragBlockCurrentEdit = cloneDeep(list)
                                        let temp = cloneDeep(DragBlockCurrentEdit[index])
                                        DragBlockCurrentEdit[index] = DragBlockCurrentEdit[index - 1]
                                        DragBlockCurrentEdit[index - 1] = temp;
                                    }
                                    onAction('up', DragBlockCurrentEdit);
                                }}
                            >
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M6.5 12.4L12 8l5.5 4.4-.9 1.2L12 10l-4.5 3.6-1-1.2z"></path></svg>
                            </a>
                        </Tooltip>
                    ) : null}
                    {}
                    {actions.down ? (
                        <Tooltip
                            delay={10}
                            text={__('Move Down', 'dragblock')}
                            position='top center'
                        >
                            <a
                                className={classnames('action down', { 'disabled': (index === list.length - 1) })}
                                onClick={() => {
                                    let DragBlockCurrentEdit = null;
                                    if (isFunction(actions['down'])) {
                                        DragBlockCurrentEdit = actions['down'](cloneDeep(list), index);
                                    } else {
                                        if (index === list.length - 1 || !Array.isArray(list)) return;
                                        DragBlockCurrentEdit = cloneDeep(list)
                                        let temp = cloneDeep(DragBlockCurrentEdit[index])
                                        DragBlockCurrentEdit[index] = DragBlockCurrentEdit[index + 1]
                                        DragBlockCurrentEdit[index + 1] = temp;
                                    }
                                    onAction('down', DragBlockCurrentEdit);
                                }}
                            >
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z"></path></svg>
                            </a>
                        </Tooltip>
                    ) : null}
                    {}
                    {actions.duplicate ? (
                        <Tooltip
                            delay={10}
                            text={__('Duplicate', 'dragblock')}
                            position='top center'
                        >
                            <a
                                className='action duplicate'
                                onClick={() => {
                                    let DragBlockCurrentEdit = null;
                                    if (isFunction(actions['duplicate'])) {
                                        DragBlockCurrentEdit = actions['duplicate'](cloneDeep(list), index);
                                    } else {
                                        if (!Array.isArray(list)) {
                                            return;
                                        }
                                        DragBlockCurrentEdit = cloneDeep(list)
                                        DragBlockCurrentEdit.splice(index, 0, cloneDeep(DragBlockCurrentEdit[index]))
                                    }
                                    onAction('duplicate', DragBlockCurrentEdit);
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7 13.8h6v-1.5H7v1.5zM18 16V4c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2zM5.5 16V4c0-.3.2-.5.5-.5h10c.3 0 .5.2.5.5v12c0 .3-.2.5-.5.5H6c-.3 0-.5-.2-.5-.5zM7 10.5h8V9H7v1.5zm0-3.3h8V5.8H7v1.4zM20.2 6v13c0 .7-.6 1.2-1.2 1.2H8v1.5h11c1.5 0 2.7-1.2 2.7-2.8V6h-1.5z"></path></svg>
                            </a>
                        </Tooltip>
                    ) : null}
                    {}
                    {actions.disable ? (
                        <Tooltip
                            delay={10}
                            text={(!!disabled ? __('Enable', 'dragblock') : __('Disable', 'dragblock'))}
                            position='top center'
                        >
                            <a className={classnames('action visibility', {
                                'disabled': !!disabled
                            })}
                                onClick={() => {
                                    let DragBlockCurrentEdit = null;
                                    if (isFunction(actions['disable'])) {
                                        DragBlockCurrentEdit = actions['disable'](cloneDeep(list), index);
                                    } else {
                                        if (!Array.isArray(list)) {
                                            return
                                        }
                                        DragBlockCurrentEdit = cloneDeep(list)
                                    }
                                    onAction('disable', DragBlockCurrentEdit);
                                }}
                            >
                                {!!disabled ? (
                                    DragBlockAvaiAvailable
                                ) : (
                                    DragBlockAvaiParam
                                )}
                            </a>
                        </Tooltip>
                    ) : null}
                    {actions.hidden ? (
                        <Tooltip
                            delay={10}
                            text={('*' === hidden ? __('Show', 'dragblock') : __('Hide', 'dragblock'))}
                            position='top center'
                        >
                            <a className='action'
                                onClick={() => {
                                    let DragBlockCurrentEdit = null;
                                    if (isFunction(actions['hidden'])) {
                                        DragBlockCurrentEdit = actions['hidden'](cloneDeep(list), index);
                                    } else {
                                        if (!Array.isArray(list)) {
                                            return
                                        }
                                        DragBlockCurrentEdit = cloneDeep(list)
                                    }
                                    onAction('hidden', DragBlockCurrentEdit);
                                }}
                            >
                                {('*' === hidden) ? (
                                    DragBlockAvaiArray
                                ) : (
                                    DragBlockAvaiQuery
                                )}
                            </a>
                        </Tooltip>
                    ) : null}
                    {}
                    {actions.delete ? (
                        <Tooltip
                            delay={10}
                            text={__('Delete', 'dragblock')}
                            position='top center'
                        >
                            <a
                                className='action delete'
                                onClick={() => {
                                    let DragBlockCurrentEdit = null;
                                    if (isFunction(actions['delete'])) {
                                        DragBlockCurrentEdit = actions['delete'](cloneDeep(list), index);
                                    } else {
                                        DragBlockCurrentEdit = cloneDeep(list)
                                        if (isArray(list)) {
                                            DragBlockCurrentEdit.splice(index, 1)
                                        } else if (typeof (list) === 'object') {
                                            delete DragBlockCurrentEdit[index]
                                        }
                                    }
                                    onAction('delete', DragBlockCurrentEdit);
                                }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20 5h-5.7c0-1.3-1-2.3-2.3-2.3S9.7 3.7 9.7 5H4v2h1.5v.3l1.7 11.1c.1 1 1 1.7 2 1.7h5.7c1 0 1.8-.7 2-1.7l1.7-11.1V7H20V5zm-3.2 2l-1.7 11.1c0 .1-.1.2-.3.2H9.1c-.1 0-.3-.1-.3-.2L7.2 7h9.6z"></path></svg>
                            </a>
                        </Tooltip>
                    ) : null}
                    {actions['custom'] && (
                        <>
                            {Object.keys(actions['custom']).map((action, _i) => (
                                <span key={_i}>{actions['custom'][action]}</span>
                            ))}
                        </>
                    )}
                    {}
                    <Tooltip
                        delay={10}
                        text={__('Close', 'dragblock')}
                        position='top center'
                    >
                        <a className='action close' onClick={onClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M13 11.8l6.1-6.3-1-1-6.1 6.2-6.1-6.2-1 1 6.1 6.3-6.5 6.7 1 1 6.5-6.6 6.5 6.6 1-1z"></path></svg>
                        </a>
                    </Tooltip>
                </div>
                {}
                {
                    title ? (
                        <div className='title'>
                            {title}
                        </div>
                    ) : null
                }
                {}
                {children ? (
                    <div className='content'>{children}</div>
                ) : null}
            </Popover>
        </>
    );
}