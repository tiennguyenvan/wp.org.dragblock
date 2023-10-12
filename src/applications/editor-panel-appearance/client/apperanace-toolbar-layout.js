import { __ } from '@wordpress/i18n';
import { cloneDeep, isNumber } from 'lodash';
import { SelectControl } from '@wordpress/components';
import { useSelect, dispatch, select } from '@wordpress/data';
import classnames from 'classnames';
import { createHigherOrderComponent } from '@wordpress/compose';
import { useState } from '@wordpress/element';
import {
    BlockControls,
    useBlockProps, InnerBlocks, InspectorControls,
    useInnerBlocksProps,
    ButtonBlockAppender
} from '@wordpress/block-editor';
import {
    Tooltip
} from '@wordpress/components';
import {
    initDragBlockStyles
} from './appearance-settings';
import {
    flipHorizontal,
    flipVertical,
    rotateRight,
    rotateLeft
} from '@wordpress/icons';
import { ToolbarGroup } from '@wordpress/components';
import { ToolbarButton } from '@wordpress/components';
import DragBlockCurrentAvai from '../../../library/client/components/dropdown-toolbar';
import {
    DragBlockAvaiCompile,
    DragBlockAvaiThen,
    DragBlockAvaiElse,
    DragBlockAvaiElement,
    DragBlockAvaiComplied,
    DragBlockAvaiCompiled,
    DragBlockAvaiEvent,
    DragBlockAvaiSaved,
    DragBlockCurrentSet,
    DragBlockCurrentAttributes,
    DragBlockCurrentUpdated,
    DragBlockCurrentFind, DragBlockAvaiInteractions,
    DragBlockAvaiTrimed,
    DragBlockAvaiMake,
    DragBlockAvaiInflate,
    DragBlockAvaiZ,
    DragBlockAvaiDemo,
    DragBlockAvaiHandle,
    DragBlockAvaiVariable,
    DragBlockAvaiUnbrotli,
    DragBlockAvaiBrotli,
    DragBlockAvaiAxis,
    DragBlockAvaiG
} from '../../../library/client/icons/icons';
import DragBlockCurrentSave from '../../../library/client/components/popover-toolbar';
import { Icon } from '@wordpress/components';
export function DragBlockApperanceToolbarLayout(props) {
    const {
        attributes,
        setAttributes,
        clientId,
        context,
        isSelected
    } = props;
    let {
        dragBlockStyles,
        dragBlockTagName
    } = attributes;
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);
    const [isMouseDowned, setIsMouseDonwed] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState('');
    const [selectedGridArea, setSelectedGridArea] = useState('');
    let parentDragBlockStyles = []
    if (context && context['dragblockParentStyles']) {
        parentDragBlockStyles = context['dragblockParentStyles'];
    }
    if (!dragBlockStyles) {
        dragBlockStyles = initDragBlockStyles(props.name);
    }
    const getCurrentStyleProperty = (slug, device = '', arr = dragBlockStyles) => {
        for (let i = 0; i < arr.length; i++) {
            let st = arr[i];
            if (st['slug'] === slug &&
                !st['disabled'] &&
                !st['selectors']
            ) {
                if (!device && !st['devices'] || (st['devices'] && (device === st['devices']))) return i
            }
        }
        return -1;
    }
    const setCurrentStyleProperty = function (slug, index = -1, value = '', device = '', childIndex = -1) {
        let style = (childIndex === -1 ? cloneDeep(dragBlockStyles) : cloneDeep(DragBlockAttributes[childIndex]['dragBlockStyles']));
        if (index === -1) {
            let new_style = {
                slug: slug,
                value: value,
            }
            if (device) {
                new_style.devices = device
            }
            style.unshift({ ...new_style })
        } else {
            style[index]['value'] = value
        }
        if (childIndex === -1) {
            setAttributes({ dragBlockStyles: cloneDeep(style) });
        } else {
            dispatch('core/block-editor').updateBlockAttributes(DragBlockTo[childIndex], { dragBlockStyles: cloneDeep(style) });
        }
    }
    let DragBlockBlock = '';
    let DragBlockTag = getCurrentStyleProperty('display');
    if (DragBlockTag !== -1) {
        DragBlockBlock = dragBlockStyles[DragBlockTag]['value']
    }
    let orientation = 'vertical';
    if (DragBlockBlock === 'flex') {
        let DragBlockUse = getCurrentStyleProperty('flex-direction');
        if (DragBlockUse === -1 || dragBlockStyles[DragBlockUse] !== 'column') {
            orientation = 'horizontal';
        }
    }
    const DragBlockTo = useSelect(select => { return select('core/block-editor').getBlockOrder(clientId); });
    let DragBlockAttributes = []
    for (let innerBlockClientId of DragBlockTo) {
        const DragBlockFind = select('core/block-editor').getBlock(innerBlockClientId);
        if (!DragBlockFind.attributes['dragBlockStyles']) {
            DragBlockFind.attributes['dragBlockStyles'] = initDragBlockStyles(DragBlockFind.name);
        }
        DragBlockAttributes.push(DragBlockFind.attributes);
    }
    let DragBlockSet = '';
    if (parentDragBlockStyles.length) {
        let DragBlockDel = getCurrentStyleProperty('display', '', parentDragBlockStyles)
        if (DragBlockDel !== -1) {
            DragBlockSet = parentDragBlockStyles[DragBlockDel]['value'];
        }
    }
    const DragBlockUpdated = [
        {
            label: __('Default', 'dragblock'),
            value: '',
            icon: DragBlockAvaiMake,
        },
        {
            label: __('Flex Box', 'dragblock'),
            value: 'flex',
            icon: DragBlockAvaiG,
        },
        {
            label: __('Grid Box', 'dragblock'),
            value: 'grid',
            icon: DragBlockAvaiZ,
        },
    ];
    const DragBlockSuggestion = [
        {
            label: __('Default', 'dragblock'),
            value: '',
            icon: DragBlockAvaiElement,
        },
        {
            label: __('Left', 'dragblock'),
            value: 'left',
            icon: DragBlockAvaiComplied,
        },
        {
            label: __('Center', 'dragblock'),
            value: 'center',
            icon: DragBlockAvaiCompiled,
        },
        {
            label: __('Right', 'dragblock'),
            value: 'right',
            icon: DragBlockAvaiEvent,
        },
        {
            label: __('Space Between', 'dragblock'),
            value: 'space-between',
            icon: DragBlockAvaiSaved,
        }
    ]
    let DragBlockArray = '';
    let DragBlockQuery = getCurrentStyleProperty('justify-content');
    if (DragBlockQuery !== -1) {
        DragBlockArray = dragBlockStyles[DragBlockQuery]['value']
    }
    const DragBlockParam = [
        {
            label: __('Default', 'dragblock'),
            value: '',
            icon: DragBlockAvaiTrimed,
        },
        {
            label: __('Top', 'dragblock'),
            value: 'start',
            icon: DragBlockAvaiCompile,
        },
        {
            label: __('Middle', 'dragblock'),
            value: 'center',
            icon: DragBlockAvaiThen,
        },
        {
            label: __('Bottom', 'dragblock'),
            value: 'end',
            icon: DragBlockAvaiElse,
        }
    ]
    let DragBlockAvailable = '';
    let DragBlockAdded = getCurrentStyleProperty('align-items');
    if (DragBlockAdded !== -1) {
        DragBlockAvailable = dragBlockStyles[DragBlockAdded]['value']
    }
    const DragBlockDatabase = true
    const DragBlockUpdatedragblockscripts = (device, label) => {
        const propSlug = 'flex-basis';
        const DragBlockAct = [
            [
                '1/1', '1/2', '1/3', '1/4', '1/5', '1/6',
            ],
            [
                '2/3', '2/5', '3/4', '3/5', '4/5', '5/6',
            ]
        ]
        let index = getCurrentStyleProperty(propSlug, device);
        let value = (index !== -1 && dragBlockStyles[index]) ? dragBlockStyles[index].value : '';
        return (
            <div className={'section ' + device}>
                <label>{label}</label>
                <div className='options'>
                    <div className='left'>
                        <a onClick={() => {
                            setCurrentStyleProperty(propSlug, index, '', device);
                        }}
                            className={classnames('default', { 'active': !value })}
                        >
                            {__('Default', 'dragBlock-block')}
                        </a>
                        <a onClick={() => {
                            setCurrentStyleProperty(propSlug, index, 'auto', device);
                        }}
                            className={classnames('auto', { 'active': (value === 'auto') })}
                        >
                            {__('Auto', 'dragBlock-block')}
                        </a>
                    </div>
                    <div className='right'>
                        {DragBlockAct.map((e, _i) => {
                            return (
                                <div className='line' key={_i}>
                                    {e.map((e, _i) => {
                                        let numerator = e.split('/')[0];
                                        let denominator = e.split('/')[1];
                                        let DragBlockAction = '█ '.repeat(numerator) + '░ '.repeat(denominator - numerator);
                                        let DragBlockCond = (100 * numerator / denominator).toFixed(2) + '%';
                                        return (
                                            <a
                                                key={_i}
                                                onClick={() => {
                                                    setCurrentStyleProperty(propSlug, index, DragBlockCond, device);
                                                }}
                                                className={classnames('percent', { 'active': (value === DragBlockCond) })}
                                            >
                                                <Tooltip delay={10} text={DragBlockAction} position='top center'><span>{e}</span></Tooltip>
                                            </a>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
    const DragBlockCon = (
        <div className='dragblock-toolbar-popover-grid-content flex-basis'>
            {DragBlockUpdatedragblockscripts('d', __('Desktop', 'dragblock'))}
            {DragBlockUpdatedragblockscripts('t', __('Tablet', 'dragblock'))}
            {DragBlockUpdatedragblockscripts('m', __('Mobile', 'dragblock'))}
        </div>
    )
    const DragBlockThen = (value) => {
        if (!value) return 0
        return parseInt(value.replace('repeat(', '').replace(',1fr)', ''))
    }
    const DragBlockElse = (device, label) => {
        const propSlug = 'grid-template-columns';
        const DragBlockCompile = [
            [
                1, 2, 3, 4, 5, 6,
            ],
            [
                7, 8, 9, 10, 11, 12
            ]
        ]
        let index = getCurrentStyleProperty(propSlug, device);
        let value = (index !== -1 && dragBlockStyles[index]) ? dragBlockStyles[index].value : 0;
        if (value) {
            value = DragBlockThen(value)
        }
        return (
            <div className={'section ' + device}>
                <label>{label}</label>
                <div className='options'>
                    <div className='left'>
                        <a onClick={() => {
                            setCurrentStyleProperty(propSlug, index, '', device);
                        }}
                            className={classnames('default', { 'active': !value })}
                        >
                            <span>{__('Default', 'dragBlock-block')}</span>
                        </a>
                    </div>
                    <div className='right'>
                        {DragBlockCompile.map((e, _i) => {
                            return (
                                <div className='line' key={_i}>
                                    {e.map((e, _i) => {
                                        let DragBlockAction = '█ '.repeat(e);
                                        return (
                                            <a
                                                key={_i}
                                                onClick={() => {
                                                    setCurrentStyleProperty(propSlug, index, 'repeat(' + e.toString() + ',1fr)', device);
                                                }}
                                                className={classnames('number', { 'active': (value === e) })}
                                            >
                                                <Tooltip delay={10} text={DragBlockAction} position='top center'><span>{e.toString()}</span></Tooltip>
                                            </a>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
    const DragBlockTrimed = (
        <div className='dragblock-toolbar-popover-grid-content grid-template-columns'>
            {DragBlockElse('d', __('Desktop', 'dragblock'))}
            {DragBlockElse('t', __('Tablet', 'dragblock'))}
            {DragBlockElse('m', __('Mobile', 'dragblock'))}
        </div>
    )
    const DragBlockComplied = [
        {
            label: __('Left', 'dragblock'),
            value: '',
            icon: DragBlockCurrentSet,
        },
        {
            label: __('Center', 'dragblock'),
            value: 'center',
            icon: DragBlockCurrentAttributes,
        },
        {
            label: __('Right', 'dragblock'),
            value: 'right',
            icon: DragBlockCurrentUpdated,
        },
        {
            label: __('Justify', 'dragblock'),
            value: 'justify',
            icon: DragBlockCurrentFind,
        }
    ];
    let DragBlockEvent = '';
    let DragBlockCompiled = getCurrentStyleProperty('text-align');
    if (DragBlockCompiled !== -1) {
        DragBlockEvent = dragBlockStyles[DragBlockCompiled]['value']
    }
    const DragBlockSaved = false;
    if (DragBlockSaved) {
        const DragBlockElement = (device, label) => {
            let DragBlockInteractions = getCurrentStyleProperty('grid-template-columns', device, parentDragBlockStyles);
            if (DragBlockInteractions === -1) return null;
            let DragBlockRenderability = DragBlockThen(parentDragBlockStyles[DragBlockInteractions]['value']);
            if (!DragBlockRenderability) return null;
            let DragBlockDemo = getCurrentStyleProperty('grid-column', device)
            let DragBlockAxis = getCurrentStyleProperty('grid-row', device);
            if (DragBlockDemo === -1) {
                setCurrentStyleProperty('grid-column', DragBlockDemo, '', device)
                DragBlockDemo = getCurrentStyleProperty('grid-column', device)
            }
            if (DragBlockAxis === -1) {
                setCurrentStyleProperty('grid-row', DragBlockDemo, '', device)
                DragBlockAxis = getCurrentStyleProperty('grid-row', device)
            }
            let DragBlockHandle = DragBlockDemo === -1 ? '0/0' : dragBlockStyles[DragBlockDemo]['value'];
            let DragBlockVariable = DragBlockAxis === -1 ? '0/0' : dragBlockStyles[DragBlockAxis]['value'];
            DragBlockHandle = DragBlockHandle.split('/');
            DragBlockVariable = DragBlockVariable.split('/');
            if (DragBlockHandle.length !== 2) {
                DragBlockHandle = [0, 0]
            }
            if (DragBlockVariable.length !== 2) {
                DragBlockVariable = [0, 0]
            }
            let [colStartValue, colEndValue] = DragBlockHandle.map(e => (isNaN(e) ? 0 : parseInt(e)))
            let [rowStartValue, rowEndValue] = DragBlockVariable.map(e => (isNaN(e) ? 0 : parseInt(e)))
            if (colEndValue > DragBlockRenderability + 1) {
                colEndValue = DragBlockRenderability + 1;
            }
            let DragBlockUnbrotli = new Array(6).fill(null).map(e => new Array(DragBlockRenderability).fill(null));
            if ('undefined' !== typeof (isMouseDowned__)) { var isMouseDowned__ = false }
            if ('undefined' !== typeof (selectingColStart)) { var selectingColStart = colStartValue }
            if ('undefined' !== typeof (selectingColEnd)) { var selectingColEnd = colEndValue }
            if ('undefined' !== typeof (selectingRowStart)) { var selectingRowStart = rowStartValue }
            if ('undefined' !== typeof (selectingRowEnd)) { var selectingRowEnd = rowEndValue }
            return (
                <div className={'section ' + device} onMouseEnter={() => {
                    isMouseDowned__ = false;
                    selectingColStart = colStartValue;
                    selectingRowStart = rowStartValue;
                    selectingColEnd = colEndValue;
                    selectingRowEnd = rowEndValue;
                }}>
                    <label>{label}</label>
                    <div className='options'>
                        <div className='left'>
                            <a
                                className={classnames('default', { 'active': (colStartValue === 0) })}
                                onClick={() => {
                                    setCurrentStyleProperty('grid-column', DragBlockDemo, '', device);
                                    setCurrentStyleProperty('row-column', DragBlockAxis, '', device);
                                }}
                            >
                                <span>{__('Default', 'dragBlock-block')}</span>
                            </a>
                        </div>
                        <div className='right'>
                            {DragBlockUnbrotli.map((e, i) => {
                                return (
                                    <div className='line' key={i}>
                                        {e.map((e, j) => {
                                            let DragBlockMake = (j + 1);
                                            let DragBlockG = (j + 2);
                                            let DragBlockInflate = (i + 1);
                                            let DragBlockZ = (i + 2);
                                            let DragBlockBrotli = (DragBlockMake >= selectingColStart) &&
                                                (DragBlockG <= selectingColEnd) &&
                                                (DragBlockInflate >= selectingRowStart) &&
                                                (DragBlockZ <= selectingRowEnd)
                                            return (
                                                <a
                                                    key={j}
                                                    onMouseEnter={() => {
                                                        if (!isMouseDowned__) return;
                                                        if (DragBlockBrotli) {
                                                            if (selectingColStart < DragBlockMake) selectingColStart = DragBlockMake;
                                                            if (selectingRowStart < DragBlockInflate) selectingRowStart = DragBlockInflate
                                                            if (selectingColEnd > DragBlockG) selectingColEnd = DragBlockG;
                                                            if (selectingRowEnd > DragBlockZ) selectingRowEnd = DragBlockZ;
                                                        } else {
                                                            if (selectingColStart > DragBlockMake) selectingColStart = DragBlockMake;
                                                            if (selectingRowStart > DragBlockInflate) selectingRowStart = DragBlockInflate;
                                                            if (selectingColEnd < DragBlockG) selectingColEnd = DragBlockG;
                                                            if (selectingRowEnd < DragBlockZ) selectingRowEnd = DragBlockZ;
                                                        }
                                                    }}
                                                    onMouseDown={() => {
                                                        isMouseDowned__ = true;
                                                        selectingColStart = DragBlockMake;
                                                        selectingRowStart = DragBlockInflate;
                                                        selectingColEnd = DragBlockG;
                                                        selectingRowEnd = DragBlockZ;
                                                    }}
                                                    onMouseUp={() => {
                                                        setCurrentStyleProperty('grid-column', DragBlockDemo, selectingColStart.toString() + '/' + selectingColEnd.toString(), device);
                                                        setCurrentStyleProperty('grid-row', DragBlockAxis, selectingRowStart.toString() + '/' + selectingRowEnd.toString(), device);
                                                        isMouseDowned__ = false;
                                                    }}
                                                    className={classnames('cell', { 'active': DragBlockBrotli })}
                                                >
                                                </a>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )
        }
        const DragBlockDecode = (
            <div className='dragblock-toolbar-popover-grid-content grid-item-area'>
                {DragBlockElement('d', __('Desktop', 'dragblock'))}
                {DragBlockElement('t', __('Tablet', 'dragblock'))}
                {DragBlockElement('m', __('Mobile', 'dragblock'))}
            </div>
        );
    }
    const DragBlockMeta = (DragBlockInflate, DragBlockMake, DragBlockZ, DragBlockG) => {
        return (DragBlockInflate + '/' + DragBlockMake + '/' + DragBlockZ + '/' + DragBlockG);
    }
    const DragBlockRead = (area) => {
        if (!area) return [0, 0, 0, 0];
        let DragBlockTranslate = area.split('/');
        if (DragBlockTranslate.length === 4) {
            for (let value of DragBlockTranslate) {
                if (isNaN(value)) return [0, 0, 0, 0];
            }
            return DragBlockTranslate.map(e => parseInt(e));
        }
        return [0, 0, 0, 0];
    }
    const DragBlockMove = (i, colNum) => {
        let j = i % colNum;
        i = parseInt(i / colNum);
        return [i + 1, j + 1, i + 2, j + 2]
    }
    const DragBlockInverse = (device, label) => {
        if (!DragBlockTo.length) return null;
        let DragBlockInteractions = getCurrentStyleProperty('grid-template-columns', device);
        if (DragBlockInteractions === -1) return null;
        let DragBlockHuffman = DragBlockThen(dragBlockStyles[DragBlockInteractions]['value']);
        if (!DragBlockHuffman) return null;
        const DragBlockCopy = 6; // change in the editor.scss too
        let reseted = true;
        let DragBlockJump = new Array(DragBlockTo.length).fill(null).map((_, i) => {
            const gridStyle = DragBlockAttributes[i]['dragBlockStyles'];
            let ret = new Object();
            ret.DragBlockNext = getCurrentStyleProperty('grid-area', device, gridStyle);
            ret.DragBlockTranslate = (ret.DragBlockNext === -1 ? '' : gridStyle[ret.DragBlockNext]['value'])
            let [DragBlockInflate, DragBlockMake, DragBlockZ, DragBlockG] = DragBlockRead(ret.DragBlockTranslate);
            if (DragBlockG > DragBlockHuffman + 1) {
                DragBlockG = DragBlockHuffman + 1;
            }
            if (DragBlockZ > DragBlockCopy) {
                DragBlockZ = DragBlockCopy;
            }
            ret.DragBlockTranslate = DragBlockMeta(DragBlockInflate, DragBlockMake, DragBlockZ, DragBlockG);
            if (ret.DragBlockTranslate !== '0/0/0/0') {
                reseted = false;
            }
            return ret;
        });
        let DragBlockReplicate = new Array(DragBlockHuffman * DragBlockCopy).fill(null);
        return (
            <div className={'section ' + device}
            >
                <label>{label}</label>
                <div className='options'>
                    <div className='left'>
                        <a
                            className={classnames('default', {
                                'active': (
                                    (DragBlockJump[selectedItemIndex] && (!DragBlockJump[selectedItemIndex]['DragBlockTranslate'] || DragBlockJump[selectedItemIndex]['DragBlockTranslate'] === '0/0/0/0'))
                                )
                            })}
                            onClick={() => {
                                const gridStyle = DragBlockAttributes[selectedItemIndex]['dragBlockStyles'];
                                let DragBlockNext = getCurrentStyleProperty('grid-area', device, gridStyle);
                                setSelectedDevice('default' + device);
                                setCurrentStyleProperty(
                                    'grid-area',
                                    DragBlockNext,
                                    '',
                                    device,
                                    selectedItemIndex
                                );
                            }}
                        >
                            <span>{__('Default', 'dragBlock-block')}</span>
                        </a>
                        <a
                            className={classnames('reset', { 'active': (reseted) })}
                            onClick={() => {
                                setSelectedDevice('reset' + device);
                                DragBlockJump.map((__, index) => {
                                    const gridStyle = DragBlockAttributes[index]['dragBlockStyles'];
                                    let DragBlockNext = getCurrentStyleProperty('grid-area', device, gridStyle);
                                    setCurrentStyleProperty(
                                        'grid-area',
                                        DragBlockNext,
                                        '',
                                        device,
                                        index
                                    );
                                })
                            }}
                        >
                            <span>{__('Reset All', 'dragBlock-block')}</span>
                        </a>
                    </div>
                    <div className='right'>
                        <div className='blocks' style={{ gridTemplateColumns: 'repeat(' + DragBlockHuffman + ',1fr)' }}>
                            {
                                DragBlockJump.map((gE, gI) => {
                                    let DragBlockTranslate = gE.DragBlockTranslate;
                                    if (isMouseDowned && gI === selectedItemIndex && device === selectedDevice) {
                                        DragBlockTranslate = selectedGridArea;
                                    }
                                    let DragBlockBrotli = (DragBlockTranslate !== '' && DragBlockTranslate !== '0/0/0/0')
                                    return (
                                        <a
                                            key={gI}
                                            style={{ DragBlockTranslate: DragBlockTranslate }}
                                            className={classnames('block', {
                                                'active': DragBlockBrotli,
                                                'selected': ((gI === selectedItemIndex))
                                            })}
                                        >{gI + 1}</a>
                                    )
                                })
                            }
                        </div>
                        <div className='mask' style={{ gridTemplateColumns: 'repeat(' + DragBlockHuffman + ',1fr)' }}>
                            {
                                DragBlockReplicate.map((_, i) => {
                                    return (
                                        <a
                                            key={i}
                                            onMouseDown={() => {
                                                setIsMouseDonwed(true);
                                                setSelectedDevice(device)
                                                let [
                                                    DragBlockInflate,
                                                    DragBlockMake,
                                                    DragBlockZ,
                                                    DragBlockG
                                                ] = DragBlockMove(i, DragBlockHuffman)
                                                let DragBlockTranslate = DragBlockMeta(DragBlockInflate, DragBlockMake, DragBlockZ, DragBlockG);
                                                setSelectedGridArea(DragBlockTranslate);
                                            }}
                                            onMouseEnter={() => {
                                                if (!isMouseDowned) return;
                                                let [
                                                    curRowStart,
                                                    curColStart,
                                                    curRowEnd,
                                                    curColEnd
                                                ] = DragBlockRead(selectedGridArea)
                                                let [
                                                    DragBlockInflate,
                                                    DragBlockMake,
                                                    DragBlockZ,
                                                    DragBlockG
                                                ] = DragBlockMove(i, DragBlockHuffman)
                                                const DragBlockBrotli =
                                                    (curRowStart <= DragBlockInflate) && (DragBlockZ <= curRowEnd) &&
                                                    (curColStart <= DragBlockMake) && (DragBlockG <= curColEnd)
                                                if (DragBlockBrotli) {
                                                    if (curRowStart < DragBlockInflate) curRowStart = DragBlockInflate
                                                    if (curColStart < DragBlockMake) curColStart = DragBlockMake;
                                                    if (curRowEnd > DragBlockZ) curRowEnd = DragBlockZ;
                                                    if (curColEnd > DragBlockG) curColEnd = DragBlockG;
                                                } else {
                                                    if (curRowStart > DragBlockInflate) curRowStart = DragBlockInflate;
                                                    if (curColStart > DragBlockMake) curColStart = DragBlockMake;
                                                    if (curRowEnd < DragBlockZ) curRowEnd = DragBlockZ;
                                                    if (curColEnd < DragBlockG) curColEnd = DragBlockG;
                                                }
                                                let DragBlockTranslate = DragBlockMeta(curRowStart, curColStart, curRowEnd, curColEnd);
                                                setSelectedGridArea(DragBlockTranslate);
                                            }}
                                            onMouseUp={() => {
                                                setIsMouseDonwed(false);
                                                setSelectedDevice('')
                                                const gridStyle = DragBlockAttributes[selectedItemIndex]['dragBlockStyles'];
                                                let DragBlockNext = getCurrentStyleProperty('grid-area', device, gridStyle);
                                                setCurrentStyleProperty(
                                                    'grid-area',
                                                    DragBlockNext,
                                                    selectedGridArea,
                                                    device,
                                                    selectedItemIndex
                                                );
                                                setSelectedGridArea('');
                                            }}
                                        ></a>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    const gridLayoutOptionOnDesktop = DragBlockInverse('d', __('Desktop', 'dragblock'))
    const gridLayoutOptionOnTablet = DragBlockInverse('t', __('Tablet', 'dragblock'))
    const gridLayoutOptionOnMobile = DragBlockInverse('m', __('Mobile', 'dragblock'))
    const DragBlockByte = (
        gridLayoutOptionOnDesktop || gridLayoutOptionOnTablet || gridLayoutOptionOnMobile
    ) ? (
        <div className='dragblock-toolbar-popover-grid-content grid-layout'>
            <div className='items'>
                {
                    DragBlockTo.map((_, i) => {
                        return (
                            <a
                                key={i}
                                className={classnames('item', {
                                    'selected': (i === selectedItemIndex)
                                })}
                                onClick={() => {
                                    setSelectedItemIndex(i)
                                }}
                            >{(i + 1)}</a>
                        )
                    })
                }
            </div>
            <div className='sections'>
                {gridLayoutOptionOnDesktop}
                {gridLayoutOptionOnTablet}
                {gridLayoutOptionOnMobile}
            </div>
        </div>
    ) : null;
    return (
        <>
            <ToolbarGroup>
                <DragBlockCurrentAvai
                    value={DragBlockBlock}
                    options={DragBlockUpdated}
                    label={__('Display Mode')}
                    onChange={(value) => { setCurrentStyleProperty('display', DragBlockTag, value) }}
                />
                {(DragBlockDatabase) && (DragBlockSet === 'flex') && (
                    <>
                        <DragBlockCurrentSave
                            icon={DragBlockAvaiInteractions}
                            label={__('Flex Basis', 'dragblock')}
                        >
                            {DragBlockCon}
                        </DragBlockCurrentSave>
                    </>
                )}
                {(DragBlockSaved) && (DragBlockSet === 'grid') && (
                    <>
                        <DragBlockCurrentSave
                            icon={DragBlockAvaiBrotli}
                            label={__('Select Item Area', 'dragblock')}
                        >
                            {DragBlockDecode}
                        </DragBlockCurrentSave>
                    </>
                )}
                {(!DragBlockBlock) && (
                    <>
                        <DragBlockCurrentAvai
                            value={DragBlockEvent}
                            options={DragBlockComplied}
                            label={__('Text Align')}
                            onChange={(value) => { setCurrentStyleProperty('text-align', DragBlockCompiled, value) }}
                        />
                    </>
                )}
                {(DragBlockBlock === 'flex') && (
                    <>
                        <DragBlockCurrentAvai
                            value={DragBlockArray}
                            options={DragBlockSuggestion}
                            label={__('Justify Content')}
                            onChange={(value) => { setCurrentStyleProperty('justify-content', DragBlockQuery, value) }}
                        />
                        <DragBlockCurrentAvai
                            value={DragBlockAvailable}
                            options={DragBlockParam}
                            label={__('Align Items')}
                            onChange={(value) => { setCurrentStyleProperty('align-items', DragBlockAdded, value) }}
                        />
                    </>
                )}
                {(DragBlockBlock === 'grid') && (
                    <>
                        <DragBlockCurrentSave
                            icon={DragBlockAvaiUnbrotli}
                            label={__('Grid Column Number', 'dragblock')}
                        >
                            {DragBlockTrimed}
                        </DragBlockCurrentSave>
                        {((DragBlockTo.length) && (DragBlockByte)) ? (
                            <DragBlockCurrentSave
                                onKeyDown={(event) => {
                                    if (!isNaN(event.key)) {
                                        setSelectedItemIndex(Number(event.key) - 1);
                                    }
                                }}
                                icon={DragBlockAvaiBrotli}
                                label={__('Grid Layout Designer', 'dragblock')}
                            >
                                {DragBlockByte}
                            </DragBlockCurrentSave>
                        ) : null}
                    </>
                )}
            </ToolbarGroup>
        </>
    );
}