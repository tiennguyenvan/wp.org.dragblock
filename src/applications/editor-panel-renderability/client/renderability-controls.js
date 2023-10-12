import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import _, { capitalize, cloneDeep } from 'lodash';
import { createHigherOrderComponent } from '@wordpress/compose'
import { useState } from '@wordpress/element'
import {
    InspectorControls,
} from '@wordpress/block-editor'
import {
    PanelBody,
    Tooltip,
    __experimentalNumberControl
} from '@wordpress/components'
import DragBlockLastVariants from '../../../library/client/components/dimension-control';
import {
    DragBlockAllow,
} from './renderability-settings';
import DragBlockCurrentNew from '../../../library/client/components/popover-property';
import DragBlockLastMultillingual from '../../../library/client/components/autocomplete-search-box';
import { SelectControl } from '@wordpress/components';
import { DragBlockAvaiInverse } from '../../../library/client/ultils/banning';
import DragBlockLastInvert from '../../../library/client/components/chosen-control';
import { dragBlockQueryShortcodes } from '../../../library/client/ultils/shortcodes';
import DragBlockCurrentOrdered from '../../../library/client/components/multilingual-text-control';
import { DragBlockAvaiCond, DragBlockAvaiCon, DragBlockAvaiAction } from '../../../library/client/icons/icons';
const dragBlockRenderabilityControls = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        const { attributes, setAttributes } = props;
        const [showControlPopover, setShowControlPopover] = useState(-1);
        const [selectedCtrl, setSelectedCtrl] = useState({})
        let { dragBlockRenderability } = attributes;
        if (!dragBlockRenderability) {
            dragBlockRenderability = [];
        }
        const DragBlockTriplet = (index) => {
            setShowControlPopover(index);
            setSelectedCtrl({});
        }
        const updateDragBlockRenderability = (index, properties) => {
            let DragBlockCamel = cloneDeep(dragBlockRenderability)
            for (let key in properties) {
                DragBlockCamel[index][key] = properties[key];
            }
            setAttributes({ dragBlockRenderability: DragBlockCamel })
        }
        if (DragBlockAvaiInverse(props)) {
            return (<><BlockEdit {...props} /></>)
        }
        return (
            <>
                <BlockEdit {...props} />
                <InspectorControls><div className='dragblock-inspector-controls renderability' onKeyDown={(e) => {
                }}>
                    <PanelBody
                        title={__('Renderability', 'dragblock')}
                        initialOpen={dragBlockRenderability.length > 0}
                    >
                        {
                        }
                        <DragBlockLastMultillingual
                            placeholder={__('+ Add a Render Condition', 'dragblock')}
                            onSelect={(slug) => {
                                let DragBlockCamel = cloneDeep(dragBlockRenderability)
                                DragBlockCamel.unshift({
                                    value: '',
                                    slug: slug,
                                    operator: '',
                                });
                                setAttributes({ dragBlockRenderability: DragBlockCamel })
                                DragBlockTriplet(0);
                            }}
                            suggestions={DragBlockAllow}
                        />
                        {
                        }
                        {Object.keys(selectedCtrl).length > 0 && (
                            <div className='dragblock-renderability-clipboard'>
                                <a className='copy' onClick={() => {
                                    window['dragblock-renderability-clipboard'] = []
                                    for (let id in selectedCtrl) {
                                        window['dragblock-renderability-clipboard'].push(cloneDeep(dragBlockRenderability[id]));
                                    }
                                    setSelectedCtrl({});
                                }}>
                                    {DragBlockAvaiAction} {__('Copy', 'dragblock')}
                                </a>
                            </div>
                        )}
                        {!!window['dragblock-renderability-clipboard'] && window['dragblock-renderability-clipboard'].length > 0 && (
                            <div className='dragblock-renderability-clipboard'>
                                <a className='paste' onClick={() => {
                                    let DragBlockYou = cloneDeep(dragBlockRenderability);
                                    DragBlockYou.unshift(...window['dragblock-renderability-clipboard']);
                                    setAttributes({ dragBlockRenderability: DragBlockYou });
                                    setSelectedCtrl({})
                                }}>
                                    {DragBlockAvaiCond} {__('Paste', 'dragblock')}
                                </a>
                                <a className='clear' onClick={() => {
                                    delete window['dragblock-renderability-clipboard'];
                                    setSelectedCtrl({})
                                }}>
                                    {DragBlockAvaiCon} {__('Clear', 'dragblock')}
                                </a>
                            </div>
                        )}
                        {
                        }
                        {dragBlockRenderability && 0 !== dragBlockRenderability.length && (
                            <div className='properties'>
                                {
                                    dragBlockRenderability.map((prop, index) => {
                                        return (
                                            <div key={index}>
                                                {
                                                }
                                                <Tooltip
                                                    delay={10}
                                                    text={DragBlockAllow[prop.slug].note}
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
                                                        <code>{DragBlockAllow[prop.slug].label}
                                                            <span> {
                                                                !prop['operator'] ? '==' : prop['operator']
                                                            }
                                                            </span>
                                                        </code> {prop.value ? capitalize(prop.value) : __('Default', 'dragblock')}
                                                    </a>
                                                </Tooltip>
                                                {
                                                }
                                                {
                                                    showControlPopover === index ? (
                                                        <DragBlockCurrentNew
                                                            className='dragblock-renderability-control-popover'
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
                                                                setAttributes({ dragBlockRenderability: newList })
                                                            }}
                                                            title={DragBlockAllow[prop.slug].label}
                                                            disabled={prop['disabled']}
                                                            list={dragBlockRenderability}
                                                            index={index}
                                                        >
                                                            {
                                                            }
                                                            <div className="operator">
                                                                <a
                                                                    title={__('Equal')}
                                                                    className={(!prop.operator || prop.operator === '==').toString()}
                                                                    onClick={() => {
                                                                        updateDragBlockRenderability(index, { operator: '==' })
                                                                    }}
                                                                >
                                                                    ==
                                                                </a>
                                                                <a
                                                                    title={__('Not Equal')}
                                                                    className={(prop.operator === '!=').toString()}
                                                                    onClick={() => {
                                                                        updateDragBlockRenderability(index, { operator: '!=' })
                                                                    }}
                                                                >
                                                                    !=
                                                                </a>
                                                            </div>
                                                            {
                                                            }
                                                            <div className='value'>
                                                                {
                                                                }
                                                                {DragBlockAllow[prop.slug].type === 'text' && (
                                                                    <DragBlockLastInvert
                                                                        options={Object.fromEntries(Object.entries(dragBlockQueryShortcodes).map(([key, value]) => [key, value['label']]))}
                                                                        onChange={(value) => {
                                                                            updateDragBlockRenderability(index, { value })
                                                                        }}
                                                                        value={prop.value}
                                                                        placeholder={__('Type [ for shortcodes', 'dragblock')}
                                                                    />
                                                                )}
                                                                {
                                                                }
                                                                {DragBlockAllow[prop.slug].type === 'number' && (
                                                                    <__experimentalNumberControl
                                                                        value={(prop.value ? Number(prop.value) : '')}
                                                                        min={-99}
                                                                        max={9999}
                                                                        step={1}
                                                                        onChange={(value) => { updateDragBlockRenderability(index, { value }) }}
                                                                    />
                                                                )}
                                                                {
                                                                }
                                                                {DragBlockAllow[prop.slug].type === 'select' && (
                                                                    <SelectControl
                                                                        value={prop.value}
                                                                        options={DragBlockAllow[prop.slug].options ? DragBlockAllow[prop.slug].options : []}
                                                                        onChange={(value) => { updateDragBlockRenderability(index, { value }) }}
                                                                    />
                                                                )}
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
                </div></InspectorControls >
            </>
        );
    };
}, 'dragBlockRenderabilityControls');
wp.hooks.addFilter(
    'editor.BlockEdit',
    'dragblock/renderability-controls',
    dragBlockRenderabilityControls
);