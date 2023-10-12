import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { cloneDeep, isEmpty } from 'lodash';
import { createHigherOrderComponent } from '@wordpress/compose'
import { useEffect, useState } from '@wordpress/element'
import { useBlockProps } from '@wordpress/block-editor';
import {
    InspectorAdvancedControls,
    InspectorControls,
    useSetting,
    __experimentalPanelColorGradientSettings,
} from '@wordpress/block-editor'
import {
    ToggleControl,
    PanelBody,
    SearchControl,
    ColorPicker,
    ColorPalette,
    Tooltip,
    Popover,
    Autocomplete,
    Button,
    ButtonGroup,
    __experimentalNumberControl
} from '@wordpress/components'
import DragBlockLastVariants from '../../../library/client/components/dimension-control';
import DragBlockCurrentOpen from '../../../library/client/components/font-size-control';
import DragBlockCurrentClose from '../../../library/client/components/font-weight-control';
import DragBlockCurrentMaster from '../../../library/client/components/line-height-control';
import DragBlockCurrentTooltip from '../../../library/client/components/text-decoration-control';
import DragBlockCurrentGrid from '../../../library/client/components/text-decoration-line-control';
import TextDecorationStyleControl from '../../../library/client/components/text-decoration-style-control';
import DragBlockCurrentMax from '../../../library/client/components/text-transform-control';
import BorderStyleControl from '../../../library/client/components/border-style-control';
import DragBlockLastBanned from '../../../library/client/components/border-control';
import DragBlockCurrentText from '../../../library/client/components/text-shadow-control';
import DragBlockLastFull from '../../../library/client/components/box-shadow-control';
import DragBlockCurrentBg from '../../../library/client/components/position-control';
import DragBlockCurrentCurrent from '../../../library/client/components/display-control';
import {
    dragBlockMatchingColors,
    dragBlockMatchingBorderColors,
    dragBlockUnmatchingColors,
    dragBlockUnmatchingBorderColors,
    DragBlockAvaiTotal,
    dragBlockUnmatchingSizes,
    dragBlockMatchingSizes
} from '../../../library/client/ultils/styling';
import {
    DragBlockFormatted,
    defaultAttributes,
    DragBlockEmpty,
    initDragBlockAttrs
} from './attributes-settings';
import { TextControl } from '@wordpress/components';
import { Flex } from '@wordpress/components';
import { FlexItem } from '@wordpress/components';
import DragBlockCurrentDevice from '../../../library/client/components/translate-control';
import DragBlockCurrentMask from '../../../library/client/components/transform-control';
import DragBlockLastLegend from '../../../library/client/components/align-items-control';
import DragBlockCurrentStart from '../../../library/client/components/justify-content-control';
import DragBlockCurrentWide from '../../../library/client/components/flex-wrap-control';
import DragBlockCurrentContent from '../../../library/client/components/flex-direction-control';
import DragBlockCurrentHolder from '../../../library/client/components/margin-control';
import DragBlockCurrentGet from '../../../library/client/components/text-align-control';
import DragBlockCurrentBlock from '../../../library/client/components/width-control';
import DragBlockCurrentParent from '../../../library/client/components/selectors-control';
import DragBlockCurrentNew from '../../../library/client/components/popover-property';
import DragBlockLastMultillingual from '../../../library/client/components/autocomplete-search-box';
import { SelectControl, FormFileUpload } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { select } from '@wordpress/data'
import { DragBlockAvaiInverse } from '../../../library/client/ultils/banning';
import DragBlockLastInvert from '../../../library/client/components/chosen-control';
import { dragBlockQueryShortcodes } from '../../../library/client/ultils/shortcodes';
import { DragBlockAvaiReplicate } from '../../../library/client/ultils/selector';
import DragBlockCurrentOrdered from '../../../library/client/components/multilingual-text-control';
import { DragBlockAvaiCond, DragBlockAvaiCon, DragBlockAvaiAction, DragBlockCurrentManage, DragBlockCurrentType, DragBlockAvaiJustify, DragBlockAvaiCol } from '../../../library/client/icons/icons';
import { getLowestCommonAncestorWithSelectedBlock } from '@wordpress/block-editor/build/store/selectors';
const dragBlockAttributesControls = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        const { attributes, setAttributes, clientId, isSelected, isMultiSelected } = props;
        const [showControlPopover, setShowControlPopover] = useState(-1);
        const [selectedCtrl, setSelectedCtrl] = useState({})
        let { dragBlockClientId, dragBlockAttrs } = attributes;
        if (!dragBlockAttrs) {
            dragBlockAttrs = initDragBlockAttrs(props.name);
        }
        const DragBlockTriplet = (index) => {
            setShowControlPopover(index);
            setSelectedCtrl({});
        }
        const updateDragBlockAttrs = (value, index, locale) => {
            let DragBlockEncode = cloneDeep(dragBlockAttrs)
            DragBlockEncode[index]['value'] = value;
            if (locale) {
                DragBlockEncode[index]['locale'] = locale;
            }
            setAttributes({ dragBlockAttrs: DragBlockEncode })
        }
        const DragBlockMaster = (styleList, index, device) => {
            let style = cloneDeep(styleList)
            if (!style[index]['devices']) style[index]['devices'] = '';
            if (style[index]['devices'].indexOf(device) === -1) style[index]['devices'] += device;
            else style[index]['devices'] = style[index]['devices'].replace(device, '')
            if (style[index]['devices'] === '') delete style[index]['devices']
            return style;
        }
        const DragBlockFrom = (text, icon, value, index, prop) => {
            return (
                <>
                    <Tooltip
                        text={text}
                        delay={10}
                        position='top center'
                    >
                        <a className={
                            classnames('extra-item', {
                                'active': prop['devices'] && prop['devices'].indexOf(value) !== -1
                            })
                        }
                            onClick={() => {
                                setAttributes({ dragBlockAttrs: DragBlockMaster(dragBlockAttrs, index, value) })
                            }}
                        >
                            {icon}
                        </a>
                    </Tooltip>
                </>
            )
        }
        if (DragBlockAvaiInverse(props)) {
            return (<><BlockEdit {...props} /></>)
        }
        return (
            <>
                <BlockEdit {...props} />
                <InspectorControls><div className='dragblock-inspector-controls attributes' onKeyDown={(e) => {
                }}>
                    <PanelBody
                        title={__('Attributes', 'dragblock')}
                        initialOpen={dragBlockAttrs.length > 0}
                    >
                        {
                        }
                        <DragBlockLastMultillingual
                            placeholder={__('+ Add an Attribute', 'dragblock')}
                            onSelect={(slug) => {
                                let attr = cloneDeep(dragBlockAttrs)
                                attr.unshift({
                                    value: '',
                                    slug: slug,
                                });
                                setAttributes({ dragBlockAttrs: attr })
                                DragBlockTriplet(0);
                            }}
                            suggestions={DragBlockFormatted}
                        />
                        {
                        }
                        {Object.keys(selectedCtrl).length > 0 && (
                            <div className='dragblock-attributes-clipboard'>
                                <a className='copy' onClick={() => {
                                    window['dragblock-attributes-clipboard'] = []
                                    for (let id in selectedCtrl) {
                                        window['dragblock-attributes-clipboard'].push(cloneDeep(dragBlockAttrs[id]));
                                    }
                                    setSelectedCtrl({});
                                }}>
                                    {DragBlockAvaiAction} {__('Copy', 'dragblock')}
                                </a>
                            </div>
                        )}
                        {!!window['dragblock-attributes-clipboard'] && window['dragblock-attributes-clipboard'].length > 0 && (
                            <div className='dragblock-attributes-clipboard'>
                                <a className='paste' onClick={() => {
                                    let DragBlockPrefix = cloneDeep(dragBlockAttrs);
                                    DragBlockPrefix.unshift(...window['dragblock-attributes-clipboard']);
                                    setAttributes({ dragBlockAttrs: DragBlockPrefix });
                                    setSelectedCtrl({})
                                }}>
                                    {DragBlockAvaiCond} {__('Paste', 'dragblock')}
                                </a>
                                <a className='clear' onClick={() => {
                                    delete window['dragblock-attributes-clipboard'];
                                    setSelectedCtrl({})
                                }}>
                                    {DragBlockAvaiCon} {__('Clear', 'dragblock')}
                                </a>
                            </div>
                        )}
                        {
                        }
                        {dragBlockAttrs && 0 !== dragBlockAttrs.length && (
                            <div className='properties'>
                                {
                                    dragBlockAttrs.map((prop, index) => {
                                        return (
                                            <div key={index}>
                                                {
                                                }
                                                <Tooltip
                                                    delay={10}
                                                    text={DragBlockFormatted[prop.slug].note}
                                                    position='middle left'
                                                >
                                                    <a
                                                        className={
                                                            classnames('', {
                                                                'disabled': !!prop['disabled'],
                                                                'selected': !!selectedCtrl[index]
                                                            })
                                                        }
                                                        onKeyDown={(e) => {
                                                        }}
                                                        onClick={(e) => {
                                                            if (e.ctrlKey && !e.altKey && !e.shiftKey && !e.key) {
                                                                let selected = cloneDeep(selectedCtrl);
                                                                if (selected[index]) {
                                                                    delete selected[index];
                                                                }
                                                                else {
                                                                    selected[index] = true;
                                                                }
                                                                setSelectedCtrl(selected);
                                                                return;
                                                            }
                                                            DragBlockTriplet(index);
                                                        }}
                                                    >
                                                        {prop['devices'] ? <strong className='devices'>{prop['devices']}</strong> : null}
                                                        <code>{DragBlockFormatted[prop.slug].label}{
                                                            prop['locale'] ? (
                                                                <span>{prop['locale']}</span>
                                                            ) : null
                                                        }:</code>
                                                        {prop.value}
                                                    </a>
                                                </Tooltip>
                                                {
                                                }
                                                {
                                                    showControlPopover === index ? (
                                                        <DragBlockCurrentNew
                                                            className='dragblock-attributes-control-popover'
                                                            onClose={() => { DragBlockTriplet(-1); }}
                                                            onMouseLeave={() => { DragBlockTriplet(-1); }}
                                                            onKeyDown={(event) => {
                                                                if (event.key === 'Escape' || event.key === 'Enter') {
                                                                    DragBlockTriplet(-1);
                                                                }
                                                            }}
                                                            actions={{ hidden: false }}
                                                            onAction={(action, newList) => {
                                                                if ('disable' === action) {
                                                                    if (newList[index]['disabled']) {
                                                                        delete newList[index]['disabled'];
                                                                    } else {
                                                                        newList[index]['disabled'] = '*';
                                                                    }
                                                                }
                                                                DragBlockTriplet(-1);
                                                                setAttributes({ dragBlockAttrs: newList })
                                                            }}
                                                            title={DragBlockFormatted[prop.slug].label}
                                                            disabled={prop['disabled']}
                                                            list={dragBlockAttrs}
                                                            index={index}
                                                        >
                                                            {
                                                            }
                                                            <div className='value'>
                                                                {
                                                                }
                                                                {DragBlockFormatted[prop.slug].type === 'action' && (
                                                                    <DragBlockLastInvert
                                                                        options={
                                                                            {
                                                                                '[dragblock.form.action]': __('DragBlock Form Action'),
                                                                            }
                                                                        }
                                                                        onChange={(value) => {
                                                                            updateDragBlockAttrs(value, index)
                                                                        }}
                                                                        value={prop.value}
                                                                        placeholder={__('Input Action Type', 'dragblock')}
                                                                    />
                                                                )}
                                                                {
                                                                }
                                                                {DragBlockFormatted[prop.slug].type === 'unit' && (
                                                                    <DragBlockLastVariants
                                                                        value={prop.value}
                                                                        units={
                                                                            DragBlockFormatted[prop.slug]['units'] ? DragBlockFormatted[prop.slug]['units'] : null
                                                                        }
                                                                        onChange={(value) => {
                                                                            updateDragBlockAttrs(value, index)
                                                                        }}
                                                                    />
                                                                )}
                                                                {
                                                                }
                                                                {DragBlockFormatted[prop.slug].type === 'multilingual-text' && (
                                                                    <DragBlockCurrentOrdered
                                                                        onChange={(value, locale) => {
                                                                            updateDragBlockAttrs(value, index, locale)
                                                                        }}
                                                                        value={prop['value']}
                                                                        locale={prop['locale']}
                                                                    />
                                                                )}
                                                                {
                                                                }
                                                                {DragBlockFormatted[prop.slug].type === 'text' && (
                                                                    <DragBlockLastInvert
                                                                        options={Object.fromEntries(Object.entries(dragBlockQueryShortcodes).map(([key, value]) => [key, value['label']]))}
                                                                        onChange={(value) => {
                                                                            updateDragBlockAttrs(value, index)
                                                                        }}
                                                                        value={prop.value}
                                                                        placeholder={__('Type [ for shortcodes', 'dragblock')}
                                                                    />
                                                                )}
                                                                {
                                                                }
                                                                {DragBlockFormatted[prop.slug].type === 'number' && (
                                                                    <__experimentalNumberControl
                                                                        value={(prop.value ? Number(prop.value) : '')}
                                                                        min={-99}
                                                                        max={9999}
                                                                        step={1}
                                                                        onChange={(value) => { updateDragBlockAttrs(value, index) }}
                                                                    />
                                                                )}
                                                                {
                                                                }
                                                                {DragBlockFormatted[prop.slug].type === 'select' && (
                                                                    <SelectControl
                                                                        value={prop.value}
                                                                        options={DragBlockFormatted[prop.slug].options ? DragBlockFormatted[prop.slug].options : []}
                                                                        onChange={(value) => { updateDragBlockAttrs(value, index) }}
                                                                    />
                                                                )}
                                                            </div>
                                                            {
                                                            }
                                                            {
                                                            }
                                                            {
                                                                prop.slug === 'sizes' && (
                                                                    <Flex className='extra devices'>
                                                                        <FlexItem className='label'>{__('Devices', 'dragblock')}</FlexItem>
                                                                        <FlexItem className='control'>
                                                                            {DragBlockFrom(
                                                                                __('Desktop (d)', 'dragblock'),
                                                                                DragBlockCurrentManage,
                                                                                'd',
                                                                                index,
                                                                                prop
                                                                            )}
                                                                            {DragBlockFrom(
                                                                                __('Tablet (t)', 'dragblock'),
                                                                                DragBlockAvaiCol,
                                                                                't',
                                                                                index,
                                                                                prop
                                                                            )}
                                                                            {DragBlockFrom(
                                                                                __('Mobile (m)', 'dragblock'),
                                                                                DragBlockCurrentType,
                                                                                'm',
                                                                                index,
                                                                                prop
                                                                            )}
                                                                        </FlexItem>
                                                                    </Flex>
                                                                )
                                                            }
                                                        </DragBlockCurrentNew>
                                                    ) : null
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )}
                    </PanelBody>
                </div></InspectorControls >
            </>
        );
    };
}, 'dragBlockAttributesControls');
wp.hooks.addFilter(
    'editor.BlockEdit',
    'dragblock/attributes-controls',
    dragBlockAttributesControls
);
var dragBlockClientPrevId = '';
var dragBlockClientIds = {};
var dragBlockAttrInit = false;
const dragBlockAttributesControlsUniqueID = createHigherOrderComponent((BlockListBlock) => {
    return (props) => {
        const { attributes, setAttributes, clientId, isSelected, name } = props;
        let { dragBlockClientId, dragBlockAttrs, dragBlockStyles, className, anchor } = attributes;
        let dragBlockClientIdCollision = false;
        if (dragBlockClientId) {
            if (!dragBlockClientIds[dragBlockClientId]) {
                dragBlockClientIds[dragBlockClientId] = true;
            } else {
                dragBlockClientIdCollision = true;
            }
        }
        useEffect(() => {
            if (!dragBlockClientId || dragBlockClientIdCollision) {
                setAttributes({ dragBlockClientId: clientId });
            }
            dragBlockClientIds = {};
            if (!isSelected) {
                return;
            }
            return;
            function DragBlockManage($blocks, $parentSelectors = []) {
                for (const { clientId, attributes } of $blocks) {
                    const DragBlockReset = new Set();
                    if (attributes['className']) {
                        attributes['className'].split(' ').map(e => {
                            DragBlockReset.add('.' + e);
                            window['dragBlockSelectors'].classes.add('.' + e);
                        });
                    }
                    if (attributes['anchor']) {
                        attributes['anchor'].split(' ').map(e => {
                            DragBlockReset.add('#' + e);
                            window['dragBlockSelectors'].ids.add('#' + e);
                        });
                    }
                    const selectors = Array.from(DragBlockReset);
                    for (let parSel of $parentSelectors) {
                        for (let childSel of DragBlockReset) {
                            selectors.push(parSel + ' ' + childSel);
                        }
                    }
                    selectors.map(e => {
                        window['dragBlockSelectors'].selectors.add(e);
                    })
                    let children = wp.data.select('core/block-editor').getBlock(clientId);
                    if (children !== null) {
                        const { innerBlocks } = children;
                        if (innerBlocks.length) {
                            DragBlockManage(innerBlocks, selectors)
                        }
                    }
                }
            }
            if (isEmpty(window['dragBlockSelectors'])) {
                window['dragBlockSelectors'] = {
                    classes: new Set(),
                    ids: new Set(),
                };
            }
            window['dragBlockSelectors']['selectors'] = new Set();
            if (className) {
                className.split(' ').map(e => {
                    window['dragBlockSelectors'].classes.add('.' + e);
                    window['dragBlockSelectors'].selectors.add('.' + e);
                });
            }
            if (anchor) {
                anchor.split(' ').map(e => {
                    window['dragBlockSelectors'].ids.add('#' + e);
                    window['dragBlockSelectors'].selectors.add('#' + e);
                });
            }
            let children = wp.data.select('core/block-editor').getBlock(clientId);
            if (children !== null) {
                const { innerBlocks } = children;
                if (innerBlocks.length) {
                    DragBlockManage(innerBlocks);
                }
            }
            if (dragBlockStyles && dragBlockStyles.length) {
                for (let style of dragBlockStyles) {
                    if (style['selectors']) {
                        window['dragBlockSelectors'].selectors.add(style['selectors']);
                    }
                }
            }
            if (DragBlockAvaiReplicate[props.name]) {
                DragBlockAvaiReplicate[props.name].map(e => {
                    window['dragBlockSelectors'].selectors.add(e)
                    window['dragBlockSelectors'].classes.add(e);
                })
            }
        });
        let wrapperProps = {
            ...props.wrapperProps,
            'data-dragblock-client-id': dragBlockClientId,
            onSubmit: (e) => {
                if (name === 'dragblock/form') {
                    e.preventDefault(); // Prevent form submission
                }
            }
        };
        if ((!dragBlockAttrInit || isSelected) && dragBlockAttrs && dragBlockAttrs.length) {
            dragBlockAttrInit = true;
            for (let attr of dragBlockAttrs) {
                if (isEmpty(attr['value']) || !isEmpty(attr['disabled'])) {
                    continue;
                }
                let value = '';
                if (attr['slug'] === 'href') {
                    value = '#dragBlock-attribute-placeholder';
                }
                else if (attr['slug'] === 'target') {
                    value = '';
                }
                else if (DragBlockFormatted[attr['slug']].type === 'multilingual-text') {
                    if (attr['locale'] === dragBlockEditorInit.siteLocale) {
                        value = attr['value'];
                    }
                }
                else {
                    value = attr['value'];
                }
                if (!value) {
                    continue;
                }
                wrapperProps[attr['slug']] = value;
            }
        }
        if (dragBlockAttrs && dragBlockAttrs.length) {
            for (let attr of dragBlockAttrs) {
                if (isEmpty(attr['value']) ||
                    !isEmpty(attr['disabled']) ||
                    isEmpty(attr['slug']) ||
                    (attr['slug'] !== 'type' && DragBlockFormatted[attr['slug']].type !== 'multilingual-text')) {
                    continue;
                }
                if (isEmpty(wrapperProps[attr['slug']]) || attr['locale'] === dragBlockEditorInit.siteLocale) {
                    wrapperProps[attr['slug']] = attr['value'];
                }
            }
        }
        if (anchor) {
            wrapperProps['className'] = 'dragblock-id-classname-placeholder--' + anchor;
        }
        return (
            <>
                <BlockListBlock {...props} wrapperProps={wrapperProps} />
            </>
        );
    };
}, 'dragBlockAttributesControlsUniqueID');
wp.hooks.addFilter(
    'editor.BlockListBlock',
    'dragblock/attributes-controls-unique-id',
    dragBlockAttributesControlsUniqueID
);