import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { cloneDeep, isString } from 'lodash';
import { createHigherOrderComponent } from '@wordpress/compose'
import { useEffect, useRef, useState } from '@wordpress/element'
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
    __experimentalNumberControl,
    Icon
} from '@wordpress/components'
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
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
    DragBlockParent,
    initDragBlockStyles
} from './appearance-settings'
import {
    dragBlockAppearanceStyle
} from './appearance-style';
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
import DragBlockCurrentClip from '../../../library/client/components/height-control';
import DragBlockLastInvert from '../../../library/client/components/chosen-control';
import { select } from '@wordpress/data'
import { DragBlockAvaiInverse } from '../../../library/client/ultils/banning';
import DragBlockCurrentUpdate from '../../../library/client/components/image-control';
import { SelectControl } from '@wordpress/components';
import { DragBlockAvaiByte } from '../../../library/client/ultils/selector';
import DragBlockLastLine from '../../../library/client/components/animation-control';
import { DragBlockAvaiThen, DragBlockCurrentCon, DragBlockAvaiAvailable, DragBlockCurrent, DragBlockAvaiArray, DragBlockAvaiQuery, DragBlockAvaiParam, DragBlockCurrentAllow, DragBlockCurrentImage, DragBlockAvaiCol, DragBlockAvaiUse } from '../../../library/client/icons/icons';
import { DragBlockCurrentManage } from '../../../library/client/icons/icons';
import { DragBlockCurrentType } from '../../../library/client/icons/icons';
const dragBlockApperanceControls = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        const { attributes, setAttributes, isSelected, clientId, isMultiSelected } = props;
        let { dragBlockStyles, className } = attributes;
        const [showControlPopover, setShowControlPopover] = useState(-1);
        const [editSelector, setEditSelector] = useState(false);
        const [groupIndex, setGroupIndex] = useState(-1);
        const [shownHiddenStyles, setShownHiddenStyles] = useState(false)
        const DragBlockContent = useSetting('color.palette.theme').concat(useSetting('color.palette.custom') || [])
        const DragBlockWide = useSetting('layout.DragBlockWide');
        const DragBlockOpen = useSetting('layout.DragBlockOpen');
        if (!dragBlockStyles) {
            dragBlockStyles = initDragBlockStyles(props.name);
        }
        const DragBlockClose = (index) => {
            setGroupIndex(-1);
            setShowControlPopover(index);
        }
        const DragBlockClip = () => {
            setShowControlPopover(-1);
            setEditSelector(false);
        }
        const DragBlockIs = 'dragblockStyleClipboard';
        const DragBlockDelete = (index) => {
            return (
                window[DragBlockIs] &&
                window[DragBlockIs]['id'] === clientId &&
                index >= window[DragBlockIs]['index'] &&
                index < window[DragBlockIs]['DragBlockState']
            )
        }
        const DragBlockShow = (index) => {
            return (
                window[DragBlockIs] &&
                window[DragBlockIs]['id'] === clientId &&
                index >= window[DragBlockIs]['index'] &&
                index < window[DragBlockIs]['DragBlockState'] &&
                window[DragBlockIs]['action'] &&
                window[DragBlockIs]['action'] == 'cut'
            )
        }
        const DragBlockUpdate = () => {
            return (
                window[DragBlockIs] &&
                window[DragBlockIs]['id'] === clientId
            )
        }
        const DragBlockStart = () => {
            delete window[DragBlockIs];
        }
        const DragBlockSupported = (value) => {
            if (!isString(value)) {
                return value;
            }
            if (value.indexOf('#') === -1) return value
            value = value.split('#');
            return (
                <>
                    <span>{value[0]}  </span>
                    <span className='color'
                        style={{
                            backgroundColor: '#' + value[1]
                        }}
                    ></span>#{value[1]}
                </>
            )
        }
        const updateDragBlockStyles = (value, index, color = false, size = false) => {
            if (typeof (value) === 'undefined') {
                return;
            }
            if (color) {
                value = dragBlockMatchingColors({ value: value.trim(), colors: DragBlockContent });
            }
            if (size) {
                value = dragBlockMatchingSizes({ value, DragBlockWide, DragBlockOpen });
            }
            let style = cloneDeep(dragBlockStyles)
            style[index].value = value;
            setAttributes({ dragBlockStyles: style })
        }
        const DragBlockMaster = (styleList, index, device) => {
            let style = cloneDeep(styleList)
            if (!style[index]['devices']) style[index]['devices'] = '';
            if (style[index]['devices'].indexOf(device) === -1) style[index]['devices'] += device;
            else style[index]['devices'] = style[index]['devices'].replace(device, '')
            if (style[index]['devices'] === '') delete style[index]['devices']
            return style;
        }
        const DragBlockHolder = (styleList, index, device = nulls, selectors = null) => {
            let style = cloneDeep(styleList)
            let prop = style[index];
            let i = index + 1;
            for (; i < style.length; i++) {
                let s = style[i];
                if (s['devices'] !== prop['devices'] || s['selectors'] !== prop['selectors']) {
                    break;
                }
            }
            for (let j = index; j < i; j++) {
                if (device !== null) {
                    style = DragBlockMaster(style, j, device);
                }
                if (selectors !== null) {
                    style[j]['selectors'] = selectors;
                }
            }
            return style;
        }
        const styleGroupLastIndex = (list, index) => {
            let DragBlockState = index + 1;
            for (; DragBlockState < list.length; DragBlockState++) {
                if (list[DragBlockState]['selectors'] !== list[index]['selectors'] ||
                    list[DragBlockState]['devices'] !== list[index]['devices']
                ) {
                    break;
                }
            }
            return DragBlockState;
        }
        const styleGroupStartIndex = (list, DragBlockState) => {
            let DragBlockOrdered = DragBlockState - 1;
            for (; DragBlockOrdered > -1; DragBlockOrdered--) {
                if (list[DragBlockState]['selectors'] !== list[DragBlockOrdered]['selectors'] ||
                    list[DragBlockState]['devices'] !== list[DragBlockOrdered]['devices']) {
                    break;
                }
            }
            return DragBlockOrdered + 1;
        }
        let DragBlockDisabled = {
            ':hover': __('(h) Mouse Hover', 'dragblock'),
            ':focus': __('(f) Tab Focus', 'dragblock'),
            ':checked': __('(c) Checked Input', 'dragblock'),
            ':target': __('(t) Targeted Element', 'dragblock'),
            ':active': __('(a) Activated Element', 'dragblock'),
        }
        let DragBlockNew = {
            'devices': '',
            'selectors': '',
            'shown': false
        };
        let hasHiddenStyles = false;
        for (let style of dragBlockStyles) {
            if (style['hidden']) {
                hasHiddenStyles = true;
                break;
            }
        }
        if (DragBlockAvaiInverse(props)) {
            return (<><BlockEdit {...props} /></>)
        }
        return (
            <>
                <BlockEdit {...props} />
                {
                }
                <InspectorControls><div className='dragblock-inspector-controls appearance'>
                    <PanelBody
                        title={__('Appearance', 'dragblock')}
                        initialOpen={dragBlockStyles.length > 0}
                    >
                        {
                        }
                        <DragBlockLastMultillingual
                            placeholder={__('+ Add a Property', 'dragblock')}
                            onSelect={(slug) => {
                                DragBlockStart();
                                let style = cloneDeep(dragBlockStyles)
                                if (groupIndex !== -1) {
                                    let item = {
                                        value: '',
                                        slug: slug,
                                    }
                                    if (style[groupIndex]['selectors']) {
                                        item['selectors'] = style[groupIndex]['selectors']
                                    }
                                    if (style[groupIndex]['devices']) {
                                        item['devices'] = style[groupIndex]['devices']
                                    }
                                    style.splice(groupIndex, 0, cloneDeep(item))
                                } else {
                                    style.unshift({
                                        value: '',
                                        slug: slug,
                                    });
                                }
                                setAttributes({ dragBlockStyles: style })
                                DragBlockClose(groupIndex !== -1 ? groupIndex : 0);
                            }}
                            suggestions={DragBlockParent}
                        />
                        {
                        }
                        {(!!window[DragBlockIs]) && window[DragBlockIs]['id'] !== clientId && (
                            <>
                                <Tooltip
                                    delay={10}
                                    text={__('Paste Style from Clipboard', 'dragblock')}
                                    position='top center'
                                >
                                    <a
                                        className={classnames('global-action paste')}
                                        onClick={() => {
                                            let clipboard = window[DragBlockIs]
                                            let newStyle = cloneDeep(dragBlockStyles);
                                            for (let attr of clipboard['attrs']) {
                                                newStyle.unshift(attr);
                                            }
                                            setAttributes({ dragBlockStyles: newStyle });
                                            if (clipboard['action'] === 'cut') {
                                                let DragBlockDefault = wp.data.select('core/block-editor').getBlockAttributes(clipboard['id']);
                                                if (DragBlockDefault && DragBlockDefault['dragBlockStyles']) {
                                                    DragBlockDefault = cloneDeep(DragBlockDefault)
                                                    let style = DragBlockDefault['dragBlockStyles'];
                                                    let attrs = clipboard['attrs'];
                                                    let match = true;
                                                    let j = 0;
                                                    for (let i = clipboard['index']; i < style.length && i < clipboard['DragBlockState']; i++, j++) {
                                                        for (let p in attrs[j]) {
                                                            if (style[i][p] !== attrs[j][p]) {
                                                                match = false;
                                                                break;
                                                            }
                                                        }
                                                    }
                                                    if (match) {
                                                        style.splice(clipboard['index'], clipboard['DragBlockState'] - clipboard['index']);
                                                        DragBlockDefault['dragBlockStyles'] = style;
                                                        wp.data.dispatch('core/block-editor').updateBlockAttributes(clipboard['id'], DragBlockDefault);
                                                    }
                                                }
                                            }
                                            DragBlockStart()
                                        }}>
                                        {DragBlockCurrentCon} {__('Paste Styles', 'dragblock')}
                                    </a>
                                </Tooltip>
                            </>
                        )}
                        {hasHiddenStyles && (
                            <>
                                <a className='global-action hidden-styles-toggle' onClick={() => {
                                    setShownHiddenStyles(!shownHiddenStyles);
                                }}>
                                    {shownHiddenStyles && (<>{DragBlockAvaiQuery} {__('Hide Hidden', 'dragblock')}</>)}
                                    {!shownHiddenStyles && (<>{DragBlockAvaiArray} {__('Show Hidden', 'dragblock')}</>)}
                                </a>
                            </>
                        )}
                        {
                        }
                        {dragBlockStyles && 0 !== dragBlockStyles.length && (
                            <div className='properties'>
                                {
                                    dragBlockStyles.map((prop, index) => {
                                        let DragBlockAppearance = false
                                        let devices = prop['devices'] ? prop['devices'] : '';
                                        let selectors = prop['selectors'] ? prop['selectors'] : '';
                                        if (DragBlockNew['devices'] !== devices ||
                                            DragBlockNew['selectors'] !== selectors
                                        ) {
                                            DragBlockNew['devices'] = devices;
                                            DragBlockNew['selectors'] = selectors;
                                            DragBlockAppearance = true && (!prop['hidden'] || shownHiddenStyles);
                                            if (!DragBlockAppearance) {
                                                DragBlockNew['shown'] = false;
                                            }
                                        }
                                        else if (DragBlockNew['shown'] === false) {
                                            DragBlockAppearance = true && (!prop['hidden'] || shownHiddenStyles);
                                        }
                                        if (DragBlockAppearance) {
                                            DragBlockNew['shown'] = true;
                                        }
                                        let DragBlockEdit = true;
                                        let DragBlockSave = new Object(); // {:hover = set('raw sel1', 'raw sel2'), ...}
                                        let DragBlockInline = '';
                                        if (prop['selectors']) {
                                            let selectors = prop['selectors'].split(',').map(e => e.trim());
                                            for (let selector of selectors) {
                                                if (selector.indexOf(':') !== -1) {
                                                    selector = selector.split(':');
                                                    if (!DragBlockDisabled[':' + selector[1]]) {
                                                        DragBlockEdit = false;
                                                        break;
                                                    }
                                                    if (DragBlockSave['']) {
                                                        DragBlockEdit = false;
                                                        break;
                                                    }
                                                    if (!DragBlockSave[':' + selector[1]]) {
                                                        DragBlockSave[':' + selector[1]] = new Set();
                                                    }
                                                    DragBlockSave[':' + selector[1]].add(selector[0]);
                                                    continue;
                                                }
                                                if (!DragBlockSave['']) {
                                                    DragBlockSave[''] = new Set();
                                                }
                                                DragBlockSave[''].add(selector);
                                            }
                                            if (DragBlockEdit) {
                                                for (let state in DragBlockSave) {
                                                    let DragBlockFont = [...DragBlockSave[state]].sort((a, b) => a > b).join(',');
                                                    if (!DragBlockInline) {
                                                        DragBlockInline = DragBlockFont;
                                                        continue;
                                                    }
                                                    if (DragBlockInline !== DragBlockFont) {
                                                        DragBlockEdit = false;
                                                        break;
                                                    }
                                                }
                                                if (DragBlockSave['']) {
                                                    delete DragBlockSave[''];
                                                }
                                            }
                                        }
                                        return (
                                            <div key={index} className={classnames('property-wrapper', {
                                            })}>
                                                {(DragBlockAppearance) ? (
                                                    <>
                                                        <div className='master-selector'>
                                                            <Tooltip
                                                                delay={10}
                                                                text={__('Edit selector', 'dragblock')}
                                                                position='middle left'
                                                            >
                                                                <a
                                                                    className='master-selector-name'
                                                                    onClick={function () {
                                                                        setEditSelector(true);
                                                                        DragBlockClose(index);
                                                                        if (DragBlockDelete(index)) {
                                                                            DragBlockStart();
                                                                        }
                                                                    }}>
                                                                    {prop['devices'] ? (<span className='devices'>{prop['devices']}</span>) : null}
                                                                    {prop['selectors'] ? <span className='selectors'>{
                                                                        prop['selectors'].indexOf('&') === 0 ? (
                                                                            <>
                                                                                <strong>&</strong>
                                                                                {prop['selectors'].substring(1)}
                                                                            </>
                                                                        ) : (
                                                                            prop['selectors']
                                                                        )
                                                                    }</span> : null}
                                                                </a>
                                                            </Tooltip>
                                                            <Tooltip
                                                                delay={10}
                                                                text={__('Add a property', 'dragblock')}
                                                                position='top center'
                                                            >
                                                                <a
                                                                    className='master-selector-add'
                                                                    onClick={function () {
                                                                        setGroupIndex(index);
                                                                        document.querySelector('.dragblock-inspector-controls.appearance .fake-search-button').click();
                                                                    }}>
                                                                    +
                                                                </a>
                                                            </Tooltip>
                                                        </div>
                                                    </>
                                                ) : ''}
                                                {(!prop['hidden'] || shownHiddenStyles) && (
                                                    <Tooltip
                                                        delay={10}
                                                        text={DragBlockParent[prop.slug].note}
                                                        position='middle left'
                                                    >
                                                        <a
                                                            className={
                                                                classnames('property', {
                                                                    'disabled': !!prop['disabled'],
                                                                    'hidden': !!prop['hidden'],
                                                                    'has-selector': (prop['devices'] || prop['selectors']),
                                                                    'default': !prop.value,
                                                                    'inClipboardCut': DragBlockShow(index)
                                                                })
                                                            }
                                                            onClick={() => {
                                                                if (DragBlockDelete(index)) {
                                                                    DragBlockStart();
                                                                }
                                                                setEditSelector(false);
                                                                DragBlockClose(index);
                                                            }}
                                                        >
                                                            <code>
                                                                {DragBlockParent[prop.slug].label}
                                                                {prop['hidden'] ? (<strong> 👁</strong>) : ':'}
                                                            </code>
                                                            {prop.value ?
                                                                (
                                                                    <span
                                                                        className={'value-preview ' + DragBlockParent[prop.slug].type}
                                                                    >
                                                                        {DragBlockSupported(
                                                                            dragBlockUnmatchingSizes({
                                                                                value: dragBlockUnmatchingColors({
                                                                                    value: prop.value, colors: DragBlockContent
                                                                                }),
                                                                                DragBlockWide,
                                                                                DragBlockOpen
                                                                            })
                                                                        )}
                                                                    </span>
                                                                )
                                                                :
                                                                (
                                                                    <span>default</span>
                                                                )
                                                            }
                                                        </a>
                                                    </Tooltip>
                                                )}
                                                {
                                                }
                                                {
                                                    showControlPopover === index ? (
                                                        <DragBlockCurrentNew
                                                            className='dragblock-appearance-control-popover'
                                                            onClose={DragBlockClip}
                                                            onMouseLeave={() => {
                                                                DragBlockClip();
                                                            }}
                                                            onKeyDown={(event) => {
                                                                if (event.key === 'Escape') {
                                                                    DragBlockClip()
                                                                }
                                                            }}
                                                            actions={
                                                                editSelector ? {
                                                                    top: function (newList, index) {
                                                                        if (index === 0) {
                                                                            return newList;
                                                                        }
                                                                        let DragBlockState = styleGroupLastIndex(newList, index)
                                                                        let group = newList.splice(index, DragBlockState - index);
                                                                        newList.unshift(...group);
                                                                        return newList;
                                                                    },
                                                                    bottom: function (newList, index) {
                                                                        let DragBlockState = styleGroupLastIndex(newList, index)
                                                                        if (DragBlockState >= newList.length - 1) {
                                                                            return newList;
                                                                        }
                                                                        let group = newList.splice(index, DragBlockState - index);
                                                                        newList.push(...group);
                                                                        return newList;
                                                                    },
                                                                    up: function (newList, index) {
                                                                        if (index === 0) {
                                                                            return newList;
                                                                        }
                                                                        let DragBlockState = styleGroupLastIndex(newList, index)
                                                                        let group = newList.splice(index, DragBlockState - index);
                                                                        let DragBlockBg = styleGroupStartIndex(newList, index - 1);
                                                                        newList.splice(DragBlockBg, 0, ...group);
                                                                        return newList;
                                                                    },
                                                                    down: function (newList, index) {
                                                                        let DragBlockState = styleGroupLastIndex(newList, index)
                                                                        if (DragBlockState >= newList.length - 1) {
                                                                            return newList;
                                                                        }
                                                                        let group = newList.splice(index, DragBlockState - index);
                                                                        let DragBlockDisplay = styleGroupLastIndex(newList, index + 1);
                                                                        newList.splice(DragBlockDisplay, 0, ...group);
                                                                        return newList;
                                                                    },
                                                                    duplicate: false,
                                                                    disable: function (newList, index) {
                                                                        let DragBlockState = styleGroupLastIndex(newList, index)
                                                                        let DragBlockFlex = true;
                                                                        for (let i = index; i < DragBlockState; i++) {
                                                                            if (!newList[i]['disabled']) {
                                                                                DragBlockFlex = false;
                                                                                break;
                                                                            }
                                                                        }
                                                                        if (DragBlockFlex) {
                                                                            for (let i = index; i < DragBlockState; i++) {
                                                                                delete newList[i]['disabled']
                                                                            }
                                                                        } else {
                                                                            for (let i = index; i < DragBlockState; i++) {
                                                                                newList[i]['disabled'] = '*';
                                                                            }
                                                                        }
                                                                        return newList;
                                                                    },
                                                                    hidden: false,
                                                                    delete: false,
                                                                    custom: {
                                                                        cut: (
                                                                            <Tooltip
                                                                                delay={10}
                                                                                text={__('Cut', 'dragblock')}
                                                                                position='top center'
                                                                            >
                                                                                <a className='action cut' onClick={() => {
                                                                                    let DragBlockState = styleGroupLastIndex(dragBlockStyles, index)
                                                                                    let attrs = [];
                                                                                    for (let i = index; i < DragBlockState; i++) {
                                                                                        attrs.push(cloneDeep(dragBlockStyles[i]));
                                                                                    }
                                                                                    window[DragBlockIs] = {
                                                                                        action: 'cut',
                                                                                        id: clientId,
                                                                                        index: index,
                                                                                        DragBlockState: DragBlockState,
                                                                                        attrs: attrs
                                                                                    };
                                                                                    DragBlockClip();
                                                                                }}>
                                                                                    {DragBlockCurrentAllow}
                                                                                </a>
                                                                            </Tooltip>
                                                                        ),
                                                                        copy: (
                                                                            <Tooltip
                                                                                delay={10}
                                                                                text={__('Copy', 'dragblock')}
                                                                                position='top center'
                                                                            >
                                                                                <a className='action copy' onClick={() => {
                                                                                    let DragBlockState = styleGroupLastIndex(dragBlockStyles, index)
                                                                                    let attrs = [];
                                                                                    for (let i = index; i < DragBlockState; i++) {
                                                                                        attrs.push(cloneDeep(dragBlockStyles[i]));
                                                                                    }
                                                                                    window[DragBlockIs] = {
                                                                                        action: 'copy',
                                                                                        id: clientId,
                                                                                        index: index,
                                                                                        DragBlockState: DragBlockState,
                                                                                        attrs: attrs
                                                                                    };
                                                                                    DragBlockClip();
                                                                                }}>
                                                                                    {DragBlockAvaiUse}
                                                                                </a>
                                                                            </Tooltip>
                                                                        )
                                                                    }
                                                                } : null
                                                            }
                                                            onAction={(action, newList) => {
                                                                if ('disable' === action && !editSelector) {
                                                                    if (newList[index]['disabled']) {
                                                                        delete newList[index]['disabled'];
                                                                    } else {
                                                                        newList[index]['disabled'] = '*';
                                                                    }
                                                                }
                                                                if ('hidden' === action && !editSelector) {
                                                                    if (newList[index]['hidden']) {
                                                                        delete newList[index]['hidden'];
                                                                    } else {
                                                                        newList[index]['hidden'] = '*';
                                                                    }
                                                                }
                                                                if (DragBlockDelete(index)) {
                                                                    DragBlockStart();
                                                                } else if (DragBlockUpdate()) {
                                                                    if ('top' === action && index >= window[DragBlockIs]['index'] ||
                                                                        'bottom' === action && index < window[DragBlockIs]['DragBlockState'] ||
                                                                        'up' === action && index === window[DragBlockIs]['DragBlockState'] ||
                                                                        'down' === action && index === window[DragBlockIs]['index'] - 1 ||
                                                                        'delete' === action && index < window[DragBlockIs]['DragBlockState'] ||
                                                                        'duplicate' === action
                                                                    ) {
                                                                        DragBlockStart();
                                                                    }
                                                                }
                                                                DragBlockClip()
                                                                setAttributes({ dragBlockStyles: newList })
                                                            }}
                                                            title={editSelector ? __('Edit Selectors', 'dragblock') : DragBlockParent[prop.slug].label}
                                                            disabled={prop['disabled']}
                                                            hidden={prop['hidden']}
                                                            list={dragBlockStyles}
                                                            index={index}
                                                        >
                                                            {
                                                            }
                                                            {(!editSelector) && (
                                                                <div className='value'>
                                                                    {
                                                                    }
                                                                    {DragBlockParent[prop.slug].type === 'color' && (
                                                                        <ColorPalette
                                                                            enableAlpha={true}
                                                                            colors={DragBlockContent}
                                                                            value={dragBlockUnmatchingColors({ value: prop.value, colors: DragBlockContent })}
                                                                            onChange={(value) => { updateDragBlockStyles(value, index, true) }}
                                                                        >
                                                                        </ColorPalette>
                                                                    )}
                                                                    {
                                                                    }
                                                                    {DragBlockParent[prop.slug].type === 'unit' && (
                                                                        <DragBlockLastVariants
                                                                            value={prop.value}
                                                                            units={
                                                                                DragBlockParent[prop.slug]['units'] ? DragBlockParent[prop.slug]['units'] : null
                                                                            }
                                                                            onChange={(value) => { updateDragBlockStyles(value, index) }}
                                                                        />
                                                                    )}
                                                                    {
                                                                    }
                                                                    {DragBlockParent[prop.slug].type === 'select' && (
                                                                        <SelectControl
                                                                            value={prop.value}
                                                                            options={DragBlockParent[prop.slug].options}
                                                                            onChange={(value) => { updateDragBlockStyles(value, index) }}
                                                                        />
                                                                    )}
                                                                    {
                                                                    }
                                                                    {DragBlockParent[prop.slug].type === 'text' && (
                                                                        <TextControl value={prop.value} onChange={(value) => { updateDragBlockStyles(value, index) }}
                                                                        />
                                                                    )}
                                                                    {
                                                                    }
                                                                    {(DragBlockParent[prop.slug].type === 'margin') && (
                                                                        <DragBlockCurrentHolder
                                                                            value={prop.value}
                                                                            onChange={(value) => { updateDragBlockStyles(value, index) }}
                                                                            switcher={prop.slug === 'margin' || prop.slug === 'padding' || prop.slug === 'border-radius'}
                                                                            minus={prop.slug.indexOf('padding') === -1 && prop.slug !== 'border-radius'}
                                                                            corner={prop.slug === 'border-radius'}
                                                                        />
                                                                    )}
                                                                    {
                                                                    }
                                                                    {DragBlockParent[prop.slug].type === 'number' && (
                                                                        <__experimentalNumberControl
                                                                            value={(prop.value ? Number(prop.value) : '')}
                                                                            min={DragBlockParent[prop.slug].min ? DragBlockParent[prop.slug].min : -99}
                                                                            max={DragBlockParent[prop.slug].max ? DragBlockParent[prop.slug].max : 9999}
                                                                            step={DragBlockParent[prop.slug].step ? DragBlockParent[prop.slug].step : 1}
                                                                            onChange={(value) => { updateDragBlockStyles(value, index) }}
                                                                        />
                                                                    )}
                                                                    {
                                                                    }
                                                                    {DragBlockParent[prop.slug].type === 'font-size' && (
                                                                        <DragBlockCurrentOpen value={prop.value} onChange={(value) => { updateDragBlockStyles(value, index) }} />
                                                                    )}
                                                                    {
                                                                    }
                                                                    {DragBlockParent[prop.slug].type === 'font-weight' && (
                                                                        <DragBlockCurrentClose value={prop.value} onChange={(value) => { updateDragBlockStyles(value, index) }} />
                                                                    )}
                                                                    {
                                                                    }
                                                                    {DragBlockParent[prop.slug].type === 'line-height' && (
                                                                        <DragBlockCurrentMaster value={prop.value} onChange={(value) => { updateDragBlockStyles(value, index) }} />
                                                                    )}
                                                                    {
                                                                    }
                                                                    {DragBlockParent[prop.slug].type === 'text-decoration-line' && (
                                                                        <DragBlockCurrentGrid value={prop.value} onChange={(value) => { updateDragBlockStyles(value, index) }} />
                                                                    )}
                                                                    {
                                                                    }
                                                                    {DragBlockParent[prop.slug].type === 'text-decoration-style' && (
                                                                        <TextDecorationStyleControl value={prop.value} onChange={(value) => { updateDragBlockStyles(value, index) }} />
                                                                    )}
                                                                    {
                                                                    }
                                                                    {DragBlockParent[prop.slug].type === 'text-transform' && (
                                                                        <DragBlockCurrentMax value={prop.value} onChange={(value) => { updateDragBlockStyles(value, index) }} />
                                                                    )}
                                                                    {
                                                                    }
                                                                    {DragBlockParent[prop.slug].type === 'text-align' && (
                                                                        <DragBlockCurrentGet value={prop.value} onChange={(value) => { updateDragBlockStyles(value, index) }} />
                                                                    )}
                                                                    {
                                                                    }
                                                                    {DragBlockParent[prop.slug].type === 'text-decoration' && (
                                                                        <DragBlockCurrentTooltip
                                                                            value={dragBlockUnmatchingColors({ value: prop.value, colors: DragBlockContent })}
                                                                            colors={DragBlockContent}
                                                                            onChange={(value) => { updateDragBlockStyles(value, index, true) }}
                                                                        />
                                                                    )}
                                                                    {
                                                                    }
                                                                    {DragBlockParent[prop.slug].type === 'border-style' && (
                                                                        <BorderStyleControl value={prop.value} onChange={(value) => { updateDragBlockStyles(value, index) }} />
                                                                    )}
                                                                    {
                                                                    }
                                                                    {DragBlockParent[prop.slug].type === 'border' && (
                                                                        <DragBlockLastBanned
                                                                            value={dragBlockUnmatchingColors({ value: prop.value, colors: DragBlockContent })}
                                                                            colors={DragBlockContent}
                                                                            onChange={(value) => { updateDragBlockStyles(value, index, true) }}
                                                                        />
                                                                    )}
                                                                    {
                                                                    }
                                                                    {DragBlockParent[prop.slug].type === 'text-shadow' && (
                                                                        <DragBlockCurrentText
                                                                            value={dragBlockUnmatchingColors({ value: prop.value, colors: DragBlockContent })}
                                                                            colors={DragBlockContent}
                                                                            onChange={(value) => { updateDragBlockStyles(value, index, true) }}
                                                                        />
                                                                    )}
                                                                    {
                                                                    }
                                                                    {
                                                                        DragBlockParent[prop.slug].type === 'box-shadow' && (
                                                                            <DragBlockLastFull
                                                                                value={dragBlockUnmatchingColors({ value: prop.value, colors: DragBlockContent })}
                                                                                colors={DragBlockContent}
                                                                                onChange={(value) => { updateDragBlockStyles(value, index, true) }}
                                                                            />
                                                                        )
                                                                    }
                                                                    {
                                                                    }
                                                                    {DragBlockParent[prop.slug].type === 'position' && (
                                                                        <DragBlockCurrentBg value={prop.value} onChange={(value) => { updateDragBlockStyles(value, index) }} />
                                                                    )}
                                                                    {
                                                                    }
                                                                    {DragBlockParent[prop.slug].type === 'display' && (
                                                                        <DragBlockCurrentCurrent value={prop.value} onChange={(value) => { updateDragBlockStyles(value, index) }} />
                                                                    )}
                                                                    {
                                                                    }
                                                                    {DragBlockParent[prop.slug].type === 'translate' && (
                                                                        <DragBlockCurrentDevice value={prop.value} onChange={(value) => { updateDragBlockStyles(value, index) }} />
                                                                    )}
                                                                    {
                                                                    }
                                                                    {DragBlockParent[prop.slug].type === 'transform' && (
                                                                        <DragBlockCurrentMask value={prop.value} onChange={(value) => { updateDragBlockStyles(value, index) }} />
                                                                    )}
                                                                    {
                                                                    }
                                                                    {DragBlockParent[prop.slug].type === 'align-items' && (
                                                                        <DragBlockLastLegend value={prop.value} onChange={(value) => { updateDragBlockStyles(value, index) }} />
                                                                    )}
                                                                    {
                                                                    }
                                                                    {DragBlockParent[prop.slug].type === 'justify-content' && (
                                                                        <DragBlockCurrentStart value={prop.value} onChange={(value) => { updateDragBlockStyles(value, index) }} />
                                                                    )}
                                                                    {
                                                                    }
                                                                    {DragBlockParent[prop.slug].type === 'flex-wrap' && (
                                                                        <DragBlockCurrentWide value={prop.value} onChange={(value) => { updateDragBlockStyles(value, index) }} />
                                                                    )}
                                                                    {
                                                                    }
                                                                    {DragBlockParent[prop.slug].type === 'flex-direction' && (
                                                                        <DragBlockCurrentContent value={prop.value} onChange={(value) => { updateDragBlockStyles(value, index) }} />
                                                                    )}
                                                                    {
                                                                    }
                                                                    {(DragBlockParent[prop.slug].type === 'width' || DragBlockParent[prop.slug].type === 'flex-basis') && (
                                                                        <DragBlockCurrentBlock
                                                                            value={dragBlockUnmatchingSizes({ value: prop.value, DragBlockWide, DragBlockOpen })}
                                                                            onChange={(value) => { updateDragBlockStyles(value, index, false, true) }}
                                                                        />
                                                                    )}
                                                                    {
                                                                    }
                                                                    {(DragBlockParent[prop.slug].type === 'height') && (
                                                                        <DragBlockCurrentClip
                                                                            value={dragBlockUnmatchingSizes({ value: prop.value, DragBlockWide, DragBlockOpen })}
                                                                            onChange={(value) => { updateDragBlockStyles(value, index, false, true) }}
                                                                        />
                                                                    )}
                                                                    {
                                                                    }
                                                                    {(DragBlockParent[prop.slug].type === 'animation-name') && (
                                                                        <DragBlockLastLine value={prop.value} onChange={(value) => { updateDragBlockStyles(value, index) }} />
                                                                    )}
                                                                </div>
                                                            )}
                                                            {
                                                            }
                                                            {
                                                            }
                                                            <Flex className='extra devices'>
                                                                <FlexItem className='label'>{__('Devices', 'dragblock')}</FlexItem>
                                                                <FlexItem className='control'>
                                                                    <Tooltip
                                                                        text={__('Desktop (d)', 'dragblock')}
                                                                        delay={10}
                                                                        position='top center'
                                                                    >
                                                                        <a className={
                                                                            classnames('extra-item', {
                                                                                'active': prop['devices'] && prop['devices'].indexOf('d') !== -1
                                                                            })
                                                                        }
                                                                            onClick={() => {
                                                                                if (editSelector) {
                                                                                    setAttributes({ dragBlockStyles: DragBlockHolder(dragBlockStyles, index, 'd') })
                                                                                    return;
                                                                                }
                                                                                setAttributes({ dragBlockStyles: DragBlockMaster(dragBlockStyles, index, 'd') })
                                                                            }}
                                                                        >
                                                                            {DragBlockCurrentManage}
                                                                            {
                                                                            }
                                                                        </a>
                                                                    </Tooltip>
                                                                    <Tooltip
                                                                        text={__('Tablet (t)', 'dragblock')}
                                                                        delay={10} position='top center'
                                                                    >
                                                                        <a className={
                                                                            classnames('extra-item', {
                                                                                'active': prop['devices'] && prop['devices'].indexOf('t') !== -1
                                                                            })
                                                                        }
                                                                            onClick={() => {
                                                                                if (editSelector) {
                                                                                    setAttributes({ dragBlockStyles: DragBlockHolder(dragBlockStyles, index, 't') })
                                                                                    return;
                                                                                }
                                                                                setAttributes({ dragBlockStyles: DragBlockMaster(dragBlockStyles, index, 't') })
                                                                            }}
                                                                        >
                                                                            {DragBlockAvaiCol}
                                                                            {
                                                                            }
                                                                        </a>
                                                                    </Tooltip>
                                                                    <Tooltip
                                                                        text={__('Mobile (m)', 'dragblock')}
                                                                        delay={10} position='top center'
                                                                    >
                                                                        <a className={
                                                                            classnames('extra-item', {
                                                                                'active': prop['devices'] && prop['devices'].indexOf('m') !== -1
                                                                            })
                                                                        }
                                                                            onClick={() => {
                                                                                if (editSelector) {
                                                                                    setAttributes({ dragBlockStyles: DragBlockHolder(dragBlockStyles, index, 'm') })
                                                                                    return;
                                                                                }
                                                                                setAttributes({ dragBlockStyles: DragBlockMaster(dragBlockStyles, index, 'm') })
                                                                            }}
                                                                        >
                                                                            {DragBlockCurrentType}
                                                                            {
                                                                            }
                                                                        </a>
                                                                    </Tooltip>
                                                                </FlexItem>
                                                            </Flex>
                                                            {
                                                            }
                                                            {DragBlockEdit !== false && (<Flex className='extra states'>
                                                                <FlexItem className='label'>{__('States', 'dragblock')}</FlexItem>
                                                                <FlexItem className='control'>
                                                                    {
                                                                        Object.entries(DragBlockDisabled).map(([stateValue, stateText], elKey) => {
                                                                            return (
                                                                                <a key={elKey} className={
                                                                                    classnames('extra-item', {
                                                                                        'active': !!DragBlockSave[stateValue],
                                                                                    })
                                                                                }
                                                                                    onClick={() => {
                                                                                        if (DragBlockSave[stateValue]) {
                                                                                            delete DragBlockSave[stateValue];
                                                                                        } else {
                                                                                            DragBlockSave[stateValue] = true;
                                                                                        }
                                                                                        DragBlockInline = DragBlockInline.split(',')
                                                                                        if (Object.keys(DragBlockSave).length === 0) {
                                                                                            DragBlockSave[''] = true;
                                                                                        }
                                                                                        let DragBlockInner = Object.keys(DragBlockSave).map(state => {
                                                                                            return DragBlockInline.join(state + ',') + state
                                                                                        }).join(', ');
                                                                                        if (editSelector) {
                                                                                            setAttributes({ dragBlockStyles: DragBlockHolder(dragBlockStyles, index, null, DragBlockInner) })
                                                                                            return;
                                                                                        }
                                                                                        let style = cloneDeep(dragBlockStyles)
                                                                                        style[index]['selectors'] = DragBlockInner;
                                                                                        if (style[index]['selectors'] === '') {
                                                                                            delete style[index]['selectors']
                                                                                        }
                                                                                        setAttributes({ dragBlockStyles: style })
                                                                                    }}
                                                                                >
                                                                                    <Tooltip
                                                                                        text={stateText}
                                                                                        delay={10}
                                                                                        position='top center'
                                                                                    >
                                                                                        <span>{stateValue}</span>
                                                                                    </Tooltip>
                                                                                </a>
                                                                            )
                                                                        })
                                                                    }
                                                                </FlexItem>
                                                            </Flex>)}
                                                            {
                                                            }
                                                            <Flex className='extra selectors'>
                                                                <FlexItem className='label'>{__('Selectors', 'dragblock')}</FlexItem>
                                                                <FlexItem className='control'>
                                                                    <DragBlockLastInvert
                                                                        position='top'
                                                                        options={DragBlockAvaiByte()}
                                                                        value={prop.selectors}
                                                                        onChange={(value) => {
                                                                            if (editSelector) {
                                                                                setAttributes({ dragBlockStyles: DragBlockHolder(dragBlockStyles, index, null, value) })
                                                                                return;
                                                                            }
                                                                            let style = cloneDeep(dragBlockStyles);
                                                                            style[index]['selectors'] = value;
                                                                            setAttributes({ dragBlockStyles: style })
                                                                        }}
                                                                    />
                                                                </FlexItem>
                                                            </Flex>
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
}, 'dragBlockApperanceControls');
wp.hooks.addFilter(
    'editor.BlockEdit',
    'dragblock/apperance-controls',
    dragBlockApperanceControls
);