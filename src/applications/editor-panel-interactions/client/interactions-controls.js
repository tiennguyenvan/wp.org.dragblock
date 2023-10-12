import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { cloneDeep } from 'lodash';
import { createHigherOrderComponent } from '@wordpress/compose'
import { useEffect, useState } from '@wordpress/element'
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
    DragBlockColon,
} from './interactions-settings';
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
import { SelectControl } from '@wordpress/components';
import DragBlockLastInvert from '../../../library/client/components/chosen-control';
import { select } from '@wordpress/data'
import { DragBlockAvaiInverse } from '../../../library/client/ultils/banning';
import { getClassList, DragBlockAvaiNext, DragBlockAvaiByte } from '../../../library/client/ultils/selector';
const dragBlockInteractionsControls = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        const { attributes, setAttributes, clientId, isSelected, isMultiSelected } = props;
        const [showControlPopover, setShowControlPopover] = useState(-1);
        let { dragBlockScripts, dragBlockAttrs, className, anchor } = attributes;
        if (!dragBlockScripts) {
            dragBlockScripts = [];
        }
        const updateDragBlockScripts = (property, sub, value, index) => {
            let DragBlockDimension = cloneDeep(dragBlockScripts)
            if (!DragBlockDimension[index][property]) {
                DragBlockDimension[index][property] = []
            }
            if (!DragBlockDimension[index][property][0]) {
                DragBlockDimension[index][property][0] = {}
            }
            DragBlockDimension[index][property][0][sub] = value;
            setAttributes({ dragBlockScripts: DragBlockDimension })
        }
        const DragBlockCustom = (property, value, index) => {
            let DragBlockDimension = cloneDeep(dragBlockScripts)
            DragBlockDimension[index][property] = value;
            setAttributes({ dragBlockScripts: DragBlockDimension })
        }
        const DragBlockOptions = (act) => {
            if (act.indexOf('toggle') === 0) { return __('of', 'dragblock') }
            if (act.indexOf('remove') === 0) { return __('from', 'dragblock') }
            if (act.indexOf('add') === 0) { return __('to', 'dragblock') }
            return __('target', 'dragblock')
        }
        const DragBlockGeneral = [
            { value: '', label: 'Choose an Action' },
            { value: 'toggleClass', label: 'Toggle Class' },
            { value: 'addClass', label: 'Add Class' },
            { value: 'removeClass', label: 'Remove Class' },
        ]
        if (DragBlockAvaiInverse(props)) {
            return (<><BlockEdit {...props} /></>)
        }
        return (
            <>
                <BlockEdit {...props} />
                <InspectorControls ><div className='dragblock-inspector-controls interactions'>
                    <PanelBody
                        title={__('Interactions', 'dragblock')}
                        initialOpen={dragBlockScripts.length > 0}
                    >
                        {
                        }
                        <DragBlockLastMultillingual
                            placeholder={__('+ Add a Trigger', 'dragblock')}
                            onSelect={(slug) => {
                                let script = cloneDeep(dragBlockScripts)
                                script.unshift({
                                    value: '',
                                    slug: slug,
                                });
                                setAttributes({ dragBlockScripts: script })
                                setShowControlPopover(0);
                            }}
                            suggestions={DragBlockColon}
                        />
                        {
                        }
                        {dragBlockScripts && 0 !== dragBlockScripts.length && (
                            <div className='properties'>
                                {
                                    dragBlockScripts.map((trigger, index) => {
                                        const {
                                            eventSource,
                                            conditions,
                                            thenActions, // [{target, name, value }]
                                            elseActions, // [{target, name, value }]
                                            disabled
                                        } = trigger;
                                        const DragBlockCan = DragBlockAvaiByte()
                                        const DragBlockOption = getClassList();
                                        const DragBlockActive = DragBlockAvaiNext();
                                        const DragBlockBolt = conditions && conditions[0] && conditions[0].name ? conditions[0].name : '';
                                        const DragBlockIcon = conditions && conditions[0] && conditions[0].value ? conditions[0].value : '';
                                        const DragBlockWordpress = conditions && conditions[0] && conditions[0].target ? conditions[0].target : '';
                                        const DragBlockReddit = thenActions && thenActions[0] && thenActions[0].name ? thenActions[0].name : '';
                                        const DragBlockComment = thenActions && thenActions[0] && thenActions[0].value ? thenActions[0].value : '';
                                        const DragBlockInsert = thenActions && thenActions[0] && thenActions[0].target ? thenActions[0].target : '';
                                        const DragBlockInserter = elseActions && elseActions[0] && elseActions[0].name ? elseActions[0].name : '';
                                        const DragBlockIcons = elseActions && elseActions[0] && elseActions[0].value ? elseActions[0].value : '';
                                        const DragBlockShown = elseActions && elseActions[0] && elseActions[0].target ? elseActions[0].target : '';
                                        return (
                                            <div key={index}>
                                                {
                                                }
                                                <a
                                                    className={
                                                        classnames('code-lines', {
                                                            'disabled': !!disabled
                                                        })
                                                    }
                                                    onClick={() => {
                                                        setShowControlPopover(index);
                                                    }}
                                                >
                                                    {
                                                    }
                                                    <code className='line event'>
                                                        <span className='event-label keyword'>{DragBlockColon[trigger.slug].label}</span>
                                                        <span className='event-name connector'>{__('on', 'dragblock')}</span>
                                                        <span className='event-source'>
                                                            {eventSource ? eventSource : __('this', 'dragblock')}
                                                        </span>
                                                    </code>
                                                    {
                                                    }
                                                    {DragBlockBolt && DragBlockIcon ? (
                                                        <code className='line condition'>
                                                            <span className='condition-label keyword'>{__('If', 'dragblock')}</span>
                                                            {DragBlockWordpress ? (
                                                                <span className='cond-target condTarget1'>
                                                                    {DragBlockWordpress}
                                                                </span>
                                                            ) : null}
                                                            <span className='condition-name connector'>{DragBlockBolt}</span>
                                                            <span className='cond-target condTarget1'>{DragBlockIcon}</span>
                                                        </code>
                                                    ) : null}
                                                    {
                                                    }
                                                    {DragBlockComment && DragBlockReddit ?
                                                        (
                                                            <code
                                                                className={classnames('line then-action', {
                                                                    'disabled': !!disabled
                                                                })}>
                                                                <span className='then-action-label keyword'>{__('Then', 'dragblock')}</span>
                                                                <span className='then-action-name connector'>{DragBlockReddit}</span>
                                                                <span className='then-action-value'>{DragBlockComment}</span>
                                                                {DragBlockInsert ? (
                                                                    <>
                                                                        <span className='DragBlockInsert-text connector'>
                                                                            {DragBlockOptions(DragBlockReddit)}
                                                                        </span>
                                                                        <span className='DragBlockInsert-value'>{DragBlockInsert}</span>
                                                                    </>
                                                                ) : null}
                                                            </code>
                                                        ) :
                                                        (
                                                            <code className='line then-action'>{__('do nothing', 'dragblock')}</code>
                                                        )
                                                    }
                                                    {
                                                    }
                                                    {DragBlockBolt && DragBlockIcon && DragBlockIcons && DragBlockInserter ?
                                                        (
                                                            <code className='line else-action'>
                                                                <span className='else-action-label keyword'>{__('Else', 'dragblock')}</span>
                                                                <span className='else-action-name connector'>{DragBlockInserter}</span>
                                                                <span className='else-action-value'>{DragBlockIcons}</span>
                                                                {DragBlockShown ? (
                                                                    <>
                                                                        <span className='DragBlockShown-text connector'>
                                                                            {DragBlockOptions(DragBlockInserter)}
                                                                        </span>
                                                                        <span className='DragBlockShown-value'>{DragBlockShown}</span>
                                                                    </>
                                                                ) : null}
                                                            </code>
                                                        ) : null
                                                    }
                                                </a>
                                                {
                                                }
                                                {
                                                    showControlPopover === index ? (
                                                        <DragBlockCurrentNew
                                                            className='dragblock-interactions-control-popover'
                                                            onClose={() => {
                                                                setShowControlPopover(-1);
                                                            }}
                                                            onMouseLeave={() => {
                                                                setShowControlPopover(-1);
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
                                                                setShowControlPopover(-1);
                                                                setAttributes({ dragBlockScripts: newList })
                                                            }}
                                                            disabled={disabled}
                                                            list={dragBlockScripts}
                                                            index={index}
                                                        >
                                                            {
                                                            }
                                                            <div className='trigger-lines'>
                                                                {
                                                                }
                                                                <div className='line event'>
                                                                    <div className='label'>
                                                                        {DragBlockColon[trigger.slug].label} {__('On', 'dragblock')}
                                                                    </div>
                                                                    <div className='controls'>
                                                                        {
                                                                        }
                                                                        <DragBlockLastInvert
                                                                            options={DragBlockCan}
                                                                            onChange={(value) => {
                                                                                updateDragBlockScripts('eventSource', value, index)
                                                                            }}
                                                                            value={eventSource}
                                                                            placeholder={__('Selector', 'dragblock')}
                                                                        />
                                                                        {
                                                                        }
                                                                    </div>
                                                                </div>
                                                                {
                                                                }
                                                                <div className='line condition'>
                                                                    <div className='label'>
                                                                        {__('If', 'dragblock')}
                                                                    </div>
                                                                    <div className='controls'>
                                                                        {DragBlockBolt ? (
                                                                            <DragBlockLastInvert
                                                                                options={DragBlockCan}
                                                                                value={DragBlockWordpress}
                                                                                onChange={(value) => {
                                                                                    updateDragBlockScripts('conditions', 'target', value, index);
                                                                                }}
                                                                                placeholder={__('Selector', 'dragblock')}
                                                                            />
                                                                        ) : null}
                                                                        <SelectControl
                                                                            value={DragBlockBolt}
                                                                            options={[
                                                                                { label: 'Choose a Condition', value: '' },
                                                                                { label: 'Is', value: 'is' },
                                                                            ]}
                                                                            onChange={(value) => {
                                                                                updateDragBlockScripts('conditions', 'name', value, index);
                                                                            }}
                                                                        />
                                                                        {DragBlockBolt ? (
                                                                            <DragBlockLastInvert
                                                                                options={DragBlockCan}
                                                                                value={DragBlockIcon}
                                                                                onChange={(value) => {
                                                                                    updateDragBlockScripts('conditions', 'value', value, index);
                                                                                }}
                                                                                placeholder={__('Selector', 'dragblock')}
                                                                            />
                                                                        ) : null}
                                                                    </div>
                                                                </div>
                                                                {
                                                                }
                                                                <div className='line then-actions'>
                                                                    <div className='label'>
                                                                        {__('Then', 'dragblock')}
                                                                    </div>
                                                                    <div className='controls'>
                                                                        <SelectControl
                                                                            value={DragBlockReddit}
                                                                            options={DragBlockGeneral}
                                                                            onChange={(value) => {
                                                                                updateDragBlockScripts('thenActions', 'name', value, index);
                                                                            }}
                                                                        />
                                                                        {DragBlockReddit ? (
                                                                            <>
                                                                                <DragBlockLastInvert
                                                                                    position='top'
                                                                                    options={
                                                                                        DragBlockReddit.indexOf('Class') !== -1 ?
                                                                                            DragBlockOption : (
                                                                                                DragBlockReddit.indexOf('Id') !== -1 ?
                                                                                                    DragBlockActive : null
                                                                                            )
                                                                                    }
                                                                                    value={DragBlockComment}
                                                                                    onChange={(value) => {
                                                                                        updateDragBlockScripts('thenActions', 'value', value, index);
                                                                                    }}
                                                                                    placeholder={
                                                                                        DragBlockReddit.indexOf('Class') !== -1 ?
                                                                                            __('Class Name', 'dragblock') : (
                                                                                                DragBlockReddit.indexOf('Id') !== -1 ?
                                                                                                    __('ID', 'dragblock') : 'default'
                                                                                            )
                                                                                    }
                                                                                />
                                                                                <div className='components-base-control fake'>
                                                                                    {DragBlockOptions(DragBlockReddit)}
                                                                                </div>
                                                                                <DragBlockLastInvert
                                                                                    position='top'
                                                                                    options={DragBlockCan}
                                                                                    value={DragBlockInsert}
                                                                                    onChange={(value) => {
                                                                                        updateDragBlockScripts('thenActions', 'target', value, index);
                                                                                    }}
                                                                                    placeholder={__('Selector', 'dragblock')}
                                                                                />
                                                                            </>
                                                                        ) : null}
                                                                    </div>
                                                                </div>
                                                                {
                                                                }
                                                                {DragBlockBolt && DragBlockIcon ? (
                                                                    <div className='line else-actions'>
                                                                        <div className='label'>
                                                                            {__('Else', 'dragblock')}
                                                                        </div>
                                                                        <div className='controls'>
                                                                            <SelectControl
                                                                                value={DragBlockInserter}
                                                                                options={DragBlockGeneral}
                                                                                onChange={(value) => {
                                                                                    updateDragBlockScripts('elseActions', 'name', value, index);
                                                                                }}
                                                                            />
                                                                            {DragBlockInserter ? (
                                                                                <>
                                                                                    <DragBlockLastInvert
                                                                                        position='top'
                                                                                        options={
                                                                                            DragBlockIcons && DragBlockIcons.indexOf('Class') !== -1 ?
                                                                                                DragBlockOption : (
                                                                                                    DragBlockIcons && DragBlockIcons.indexOf('Id') !== -1 ?
                                                                                                        DragBlockActive : null
                                                                                                )
                                                                                        }
                                                                                        value={DragBlockIcons}
                                                                                        onChange={(value) => {
                                                                                            updateDragBlockScripts('elseActions', 'value', value, index);
                                                                                        }}
                                                                                        placeholder={
                                                                                            DragBlockIcons && DragBlockIcons.indexOf('Class') !== -1 ?
                                                                                                __('Class Name', 'dragblock') : (
                                                                                                    DragBlockIcons && DragBlockIcons.indexOf('Id') !== -1 ?
                                                                                                        __('ID', 'dragblock') : null
                                                                                                )
                                                                                        }
                                                                                    />
                                                                                    <div className='components-base-control fake'>
                                                                                        {DragBlockOptions(DragBlockInserter)}
                                                                                    </div>
                                                                                    <DragBlockLastInvert
                                                                                        position='top'
                                                                                        options={DragBlockCan}
                                                                                        value={DragBlockShown}
                                                                                        onChange={(value) => {
                                                                                            updateDragBlockScripts('elseActions', 'target', value, index);
                                                                                        }}
                                                                                        placeholder={__('Selector', 'dragblock')}
                                                                                    />
                                                                                </>
                                                                            ) : null}
                                                                        </div>
                                                                    </div>
                                                                ) : null}
                                                            </div>
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
                </div></InspectorControls>
            </>
        );
    };
}, 'dragBlockInteractionsControls');
wp.hooks.addFilter(
    'editor.BlockEdit',
    'dragblock/interactions-controls',
    dragBlockInteractionsControls
);