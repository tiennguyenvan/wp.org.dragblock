import { __ } from '@wordpress/i18n';
import { cloneDeep } from 'lodash';
import { createHigherOrderComponent } from '@wordpress/compose';
import {
    BlockControls, useInnerBlocksProps
} from '@wordpress/block-editor';
import {
    initDragBlockStyles
} from './appearance-settings';
import {
    flipHorizontal,
    flipVertical,
    rotateRight,
    rotateLeft
} from '@wordpress/icons';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';
import { ToolbarButton } from '@wordpress/components';
import {
    DragBlockCurrentNext
} from '../../../library/client/icons/icons';
import { DragBlockAvaiInverse } from '../../../library/client/ultils/banning';
import { DragBlockApperanceToolbarLayout } from './apperanace-toolbar-layout';
const dragBlockApperanceToolbar = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        const { attributes, setAttributes, isSelected, clientId, context, isMultiSelected, name } = props;
        let { dragBlockStyles, dragBlockClientId } = attributes;
        if (!dragBlockStyles) {
            dragBlockStyles = initDragBlockStyles(props.name);
        }
        const getCurrentStyleProperty = (slug, device = '') => {
            for (let i = 0; i < dragBlockStyles.length; i++) {
                let st = dragBlockStyles[i];
                if (st['slug'] === slug &&
                    !st['disabled'] &&
                    !st['selectors']
                ) {
                    if (!device && !st['devices'] || (st['devices'] && (device === st['devices']))) return i
                }
            }
            return -1;
        }
        const setCurrentStyleProperty = function (slug, index = -1, value = '', device = '') {
            let style = cloneDeep(dragBlockStyles);
            if (index === -1) {
                let new_style = {
                    slug: slug,
                    value: value,
                }
                if (device) {
                    new_style.devices = device
                }
                style.unshift(cloneDeep(new_style))
            } else {
                style[index]['value'] = value
            }
            setAttributes({ dragBlockStyles: style });
        }
        let DragBlockRow = '';
        let DragBlockItem = .1;
        let DragBlockMax = getCurrentStyleProperty('font-size');
        let DragBlockMask = '';
        if (DragBlockMax !== -1) {
            DragBlockRow = dragBlockStyles[DragBlockMax]['value']
        }
        if (!DragBlockRow) {
            DragBlockRow = '1em';
        }
        if (DragBlockRow.indexOf('px') !== -1) DragBlockItem = 2;
        else if (DragBlockRow.indexOf('em') !== -1) DragBlockItem = 0.5;
        DragBlockMask = DragBlockRow.replace(parseFloat(DragBlockRow), '');
        DragBlockRow = parseFloat(DragBlockRow);
        let DragBlockCltr = '';
        let DragBlockDevice = getCurrentStyleProperty('background-image');
        if (DragBlockDevice !== -1) {
            DragBlockCltr = dragBlockStyles[DragBlockDevice]['value'];
            DragBlockCltr = DragBlockCltr.replaceAll('url(', '').replaceAll(')', '').replaceAll('\'', '').replaceAll('"', '');
        }
        if (DragBlockAvaiInverse(props)) {
            return (<><BlockEdit {...props} /></>)
        }
        return (
            <>
                <BlockEdit {...props} />
                <BlockControls>
                    {(['dragblock/form', 'dragblock/wrapper'].includes(props.name)) && (
                        <DragBlockApperanceToolbarLayout {...props} />
                    )}
                    {(props.name.indexOf('dragblock') !== -1) && (
                        <>
                            {['dragblock/icon', 'dragblock/link', 'dragblock/text'].includes(props.name) && (
                                <ToolbarGroup>
                                    <ToolbarButton
                                        label={__('Decrease size', 'dragblock')}
                                        onClick={() => {
                                            if (DragBlockRow - DragBlockItem > 0) {
                                                DragBlockRow -= DragBlockItem
                                                let style = cloneDeep(dragBlockStyles);
                                                if (DragBlockMax === -1) {
                                                    style.unshift({
                                                        slug: 'font-size',
                                                        value: DragBlockRow + DragBlockMask
                                                    })
                                                } else {
                                                    style[DragBlockMax]['value'] = DragBlockRow + DragBlockMask
                                                }
                                                setAttributes({ dragBlockStyles: style })
                                            }
                                        }}
                                    >
                                        <span className='dragblock-toolbar-text-icon'>A-</span>
                                    </ToolbarButton>
                                    <ToolbarButton
                                        label={__('Increase size', 'dragblock')}
                                        onClick={() => {
                                            DragBlockRow += DragBlockItem;
                                            let style = cloneDeep(dragBlockStyles);
                                            if (DragBlockMax === -1) {
                                                style.unshift({
                                                    slug: 'font-size',
                                                    value: DragBlockRow + DragBlockMask
                                                })
                                            } else {
                                                style[DragBlockMax]['value'] = DragBlockRow + DragBlockMask
                                            }
                                            setAttributes({ dragBlockStyles: style })
                                        }}
                                    >
                                        <span className='dragblock-toolbar-text-icon'>A+</span>
                                    </ToolbarButton>
                                </ToolbarGroup>
                            )}
                            {props.name === 'dragblock/wrapper' && (
                                <>
                                    {
                                    }
                                    <MediaUploadCheck>
                                        <MediaUpload
                                            onSelect={(media) => {
                                                let style = cloneDeep(dragBlockStyles);
                                                let value = `url("${media.url}")`;
                                                if (DragBlockDevice === -1) {
                                                    style.unshift({
                                                        slug: 'background-image',
                                                        value: value
                                                    })
                                                } else {
                                                    style[DragBlockDevice]['value'] = value
                                                }
                                                setAttributes({ dragBlockStyles: style })
                                            }}
                                            allowedTypes={['image']}
                                            value={DragBlockCltr}
                                            render={({ open }) => {
                                                return (
                                                    <ToolbarGroup>
                                                        <ToolbarButton label={__('Background Image')}
                                                            onClick={open}
                                                            className='dragblock-toolbar-background-image'>
                                                            {DragBlockCurrentNext}
                                                        </ToolbarButton>
                                                    </ToolbarGroup>
                                                )
                                            }}
                                        />
                                    </MediaUploadCheck>
                                </>
                            )}
                            {props.name.indexOf('dragblock/icon') !== -1 && (
                                <>
                                    <ToolbarButton
                                        icon={rotateRight}
                                        label={__('Rotate', 'dragblock')}
                                        onClick={() => {
                                            let style = cloneDeep(dragBlockStyles);
                                            let value = 0;
                                            let index = -1;
                                            for (let i = 0; i < style.length; i++) {
                                                let st = style[i];
                                                if (st['slug'] === 'transform' &&
                                                    !st['disabled'] &&
                                                    !st['devices'] &&
                                                    !st['selectors'] &&
                                                    st['value'] && st['value'].indexOf('rotate(') !== -1
                                                ) {
                                                    value = st['value'].replace('rotate(', '').replace(')', '').replace('deg', '')
                                                    if (isNaN(value)) value = 0;
                                                    else value = parseInt(value)
                                                    if (value % 45) continue;
                                                    index = i;
                                                    break;
                                                }
                                            }
                                            value = 'rotate(' + (value + 45) + 'deg)';
                                            if (index === -1) {
                                                style.unshift({
                                                    slug: 'transform',
                                                    value: value
                                                })
                                            } else {
                                                style[index]['value'] = value
                                            }
                                            setAttributes({ dragBlockStyles: style })
                                        }}
                                    />
                                    <ToolbarButton
                                        icon={rotateLeft}
                                        label={__('Rotate', 'dragblock')}
                                        onClick={() => {
                                            let style = cloneDeep(dragBlockStyles);
                                            let value = 0;
                                            let index = -1;
                                            for (let i = 0; i < style.length; i++) {
                                                let st = style[i];
                                                if (st['slug'] === 'transform' &&
                                                    !st['disabled'] &&
                                                    !st['devices'] &&
                                                    !st['selectors'] &&
                                                    st['value'] && st['value'].indexOf('rotate(') !== -1
                                                ) {
                                                    value = st['value'].replace('rotate(', '').replace(')', '').replace('deg', '')
                                                    if (isNaN(value)) value = 0;
                                                    else value = parseInt(value)
                                                    if (value % 45) continue;
                                                    index = i;
                                                    break;
                                                }
                                            }
                                            value = 'rotate(' + (value - 45) + 'deg)';
                                            if (index === -1) {
                                                style.unshift({
                                                    slug: 'transform',
                                                    value: value
                                                })
                                            } else {
                                                style[index]['value'] = value
                                            }
                                            setAttributes({ dragBlockStyles: style })
                                        }}
                                    />
                                    <ToolbarButton
                                        icon={flipHorizontal}
                                        label={__('Flip Horizontal', 'dragblock')}
                                        onClick={() => {
                                            let style = cloneDeep(dragBlockStyles);
                                            let value = 0;
                                            let index = -1;
                                            for (let i = 0; i < style.length; i++) {
                                                let st = style[i];
                                                if (st['slug'] === 'transform' &&
                                                    !st['disabled'] &&
                                                    !st['devices'] &&
                                                    !st['selectors'] &&
                                                    st['value'] && st['value'].indexOf('rotateY(') !== -1
                                                ) {
                                                    value = st['value'].replace('rotateY(', '').replace(')', '').replace('deg', '')
                                                    if (isNaN(value)) value = 0;
                                                    else value = parseInt(value)
                                                    if (value % 180) continue;
                                                    index = i;
                                                    break;
                                                }
                                            }
                                            value = 'rotateY(' + (value + 180) + 'deg)';
                                            if (index === -1) {
                                                style.unshift({
                                                    slug: 'transform',
                                                    value: value
                                                })
                                            } else {
                                                style[index]['value'] = value
                                            }
                                            setAttributes({ dragBlockStyles: style })
                                        }}
                                    />
                                    <ToolbarButton
                                        icon={flipVertical}
                                        label={__('Flip Vertical', 'dragblock')}
                                        onClick={() => {
                                            let style = cloneDeep(dragBlockStyles);
                                            let value = 0;
                                            let index = -1;
                                            for (let i = 0; i < style.length; i++) {
                                                let st = style[i];
                                                if (st['slug'] === 'transform' &&
                                                    !st['disabled'] &&
                                                    !st['devices'] &&
                                                    !st['selectors'] &&
                                                    st['value'] && st['value'].indexOf('rotateX(') !== -1
                                                ) {
                                                    value = st['value'].replace('rotateX(', '').replace(')', '').replace('deg', '')
                                                    if (isNaN(value)) value = 0;
                                                    else value = parseInt(value)
                                                    if (value % 180) continue;
                                                    index = i;
                                                    break;
                                                }
                                            }
                                            value = 'rotateX(' + (value + 180) + 'deg)';
                                            if (index === -1) {
                                                style.unshift({
                                                    slug: 'transform',
                                                    value: value
                                                })
                                            } else {
                                                style[index]['value'] = value
                                            }
                                            setAttributes({ dragBlockStyles: style })
                                        }}
                                    />
                                </>
                            )}
                        </>
                    )}
                </BlockControls>
            </>
        );
    };
}, 'dragBlockApperanceToolbar');
wp.hooks.addFilter(
    'editor.BlockEdit',
    'dragblock/apperance-toolbar',
    dragBlockApperanceToolbar
);