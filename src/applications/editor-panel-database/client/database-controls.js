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
    DragBlockRange,
    DragBlockRequire,
} from './database-settings';
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
import { DragBlockCurrentDisplay } from '../../../library/client/components/query-control';
import { CheckboxControl } from '@wordpress/components';
import { DragBlockAvaiMeta, DragBlockAvaiRead } from '../../../library/client/ultils/ajax';
var DBQueryVariables = new Object();
const dragBlockDatabaseControls = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        const { attributes, setAttributes, clientId, isSelected, isMultiSelected } = props;
        const [queryIndexPop, setQueryIndexPop] = useState(-1);
        const [paramIndexPop, setParamIndexPop] = useState([queryIndexPop, -1]);
        useEffect(() => {
            if (window['dragblock-query-ids'] && Object.keys(window['dragblock-query-ids']).length > 0) {
                for (let type in window['dragblock-query-ids']) {
                    DragBlockAvaiRead(type, window['dragblock-query-ids'][type])
                }
            }
        });
        let { dragBlockClientId, dragBlockQueries, dragBlockAttrs, className, anchor } = attributes;
        if (!dragBlockQueries) {
            dragBlockQueries = [];
        }
        for (let query of dragBlockQueries) {
            let { name, id } = query;
            if (name) {
                DBQueryVariables[id] = name;
            }
        }
        const DragBlockLocal = ['authors', 'categories', 'tags', 'posts'];
        if (!window['dragblock-query-ids']) {
            window['dragblock-query-ids'] = {}
        }
        for (let query of dragBlockQueries) {
            if (!query['params']) continue;
            for (let param of query.params) {
                let type = DragBlockRequire[param.slug].type;
                if (!DragBlockLocal.includes(type)) continue;
                if (!window['dragblock-query-ids'][type]) {
                    window['dragblock-query-ids'][type] = new Set();
                }
                param.value.split(',').map(id => {
                    if (isNaN(id)) return
                    window['dragblock-query-ids'][type].add(id)
                })
            }
        }
        const DragBlockUpload = () => {
            return (
                <DragBlockLastMultillingual
                    placeholder={__('+ Add a Query/Function', 'dragblock')}
                    onSelect={(newQuerySlug) => {
                        let queries = cloneDeep(dragBlockQueries)
                        queries.unshift({
                            slug: newQuerySlug,
                            name: '',
                            id: (dragBlockClientId + '__' + clientId),
                            params: []
                        });
                        setAttributes({ dragBlockQueries: queries })
                    }}
                    suggestions={DragBlockRange}
                />
            )
        }
        const DragBlockWeight = (query, queryIndex) => {
            const {
                slug,
                name,
                id,
                params,
                disabled
            } = query;
            let label = DragBlockRange[slug]['label'];
            return (
                <a
                    className='title'
                    onClick={() => {
                        setQueryIndexPop(queryIndex);
                    }}
                >
                    <span className='variable'>${name ? name.replaceAll(' ', '_') : ''}</span> = <span className='keyword'>{label.replaceAll(' ', '_')}</span>
                </a>
            )
        }
        const DragBlockBack = (query, queryIndex) => {
            const {
                slug,
                name,
                id,
                params,
                disabled
            } = query;
            return (
                <DragBlockCurrentNew
                    className='dragblock-database-query-control-popover'
                    onClose={() => {
                        setQueryIndexPop(-1);
                    }}
                    onMouseLeave={() => {
                        setQueryIndexPop(-1);
                    }}
                    onKeyDown={(event) => {
                        if (event.key === 'Escape' || event.key === 'Enter') {
                            setQueryIndexPop(-1);
                        }
                    }}
                    actions={{
                        hidden: false,
                        delete: function (newList, index) {
                            delete DBQueryVariables[newList[index]['id']];
                            newList.splice(index, 1)
                            return newList;
                        }
                    }}
                    onAction={(action, DragBlockForce) => {
                        if ('disable' === action) {
                            if (DragBlockForce[queryIndex]['disabled']) {
                                delete DragBlockForce[queryIndex]['disabled'];
                            } else {
                                DragBlockForce[queryIndex]['disabled'] = '*';
                            }
                        }
                        setQueryIndexPop(-1);
                        setAttributes({ dragBlockQueries: DragBlockForce })
                    }}
                    disabled={disabled}
                    list={dragBlockQueries}
                    index={queryIndex}
                >
                    <TextControl
                        label={__('Variable Name', 'dragblock')}
                        value={name}
                        onChange={(newQueryTitle) => {
                            let queries = cloneDeep(dragBlockQueries)
                            queries[queryIndex]['name'] = newQueryTitle.replace(/[^a-zA-Z0-9_$]/g, '_');
                            DBQueryVariables[queries[queryIndex]['id']] = queries[queryIndex]['name'];
                            setAttributes({ dragBlockQueries: queries })
                        }}
                    />
                </DragBlockCurrentNew>
            )
        }
        const DragBlockConfirm = (queryIndex, DragBlockBytes) => {
            return (
                <DragBlockLastMultillingual
                    placeholder={__('+ Add a Parameter', 'dragblock')}
                    onSelect={(newParamSlug) => {
                        let queries = cloneDeep(dragBlockQueries)
                        queries[queryIndex]['params'].unshift({
                            slug: newParamSlug,
                            value: '',
                        });
                        setAttributes({ dragBlockQueries: queries })
                        setParamIndexPop([queryIndex, 0]);
                    }}
                    suggestions={DragBlockBytes}
                />
            )
        }
        const DragBlockToggle = (queryIndex, param, paramIndex) => {
            const {
                slug,
                value,
                disabled
            } = param;
            let type = DragBlockRequire[slug].type;
            let DragBlockHas = DragBlockLocal.includes(type) && value;
            let DragBlockHelp = {}
            if (DragBlockHas) {
                let ids = value.split(',');
                ids.map(id => {
                    let obj = DragBlockAvaiMeta(type, id);
                    if (obj !== null) {
                        DragBlockHelp[id] = obj
                    }
                })
                if (Object.keys(DragBlockHelp).length < ids.length) {
                    DragBlockHas = false
                }
            }
            return (
                <a
                    key={paramIndex}
                    className='param'
                    onClick={() => {
                        setParamIndexPop([queryIndex, paramIndex])
                    }}
                >
                    <span className='slug keyword'>{slug}</span>:
                    {DragBlockHas ? (
                        <>
                            {
                            }
                            <span className='value array'>{
                                Object.entries(DragBlockHelp).map(([id, obj], elKey) => {
                                    return (
                                        <span className='object' key={elKey}>
                                            <span className='id'>{id}</span>:
                                            <span className='name'> {obj['name']}</span>
                                        </span>
                                    )
                                })
                            }</span>
                        </>
                    ) : (
                        <>
                            {
                            }
                            <span className='value'> {
                                (DragBlockRequire[slug].type === 'query_variable' &&
                                    DBQueryVariables[value] ? '$' + DBQueryVariables[value] : value) || __('default', 'dragblock')
                            }
                            </span>
                        </>
                    )}
                </a>
            )
        }
        const DragBlockTheme = (queryIndex, paramIndex, value) => {
            let queries = cloneDeep(dragBlockQueries)
            queries[queryIndex]['params'][paramIndex]['value'] = value;
            setAttributes({ dragBlockQueries: queries })
        }
        const DragBlockRequest = (queryIndex, param, paramIndex) => {
            const {
                slug,
                value,
                disabled
            } = param;
            let options = [];
            if (DragBlockRequire[slug].type === 'query_variable') {
                options = Object.entries(DBQueryVariables).map(([key, value]) => {
                    return { value: key, label: '$' + value }
                });
                options.unshift({ value: '', label: __('Default', 'dragblock') });
            }
            return (
                <>
                    {DragBlockLocal.includes(DragBlockRequire[slug].type) && (
                        <DragBlockCurrentDisplay
                            type={DragBlockRequire[slug].type}
                            value={value}
                            onSearch={() => {
                                setIsSearchingQuery(true);
                            }}
                            onClose={() => {
                                setIsSearchingQuery(false);
                            }}
                            onSelect={(value) => {
                                DragBlockTheme(queryIndex, paramIndex, value);
                            }}
                        />
                    )}
                    {DragBlockRequire[slug].type === 'text' && (
                        <TextControl
                            value={value}
                            onChange={(value) => {
                                DragBlockTheme(queryIndex, paramIndex, value);
                            }}
                        />
                    )}
                    {DragBlockRequire[slug].type === 'number' && (
                        <__experimentalNumberControl
                            value={value}
                            onChange={(value) => {
                                DragBlockTheme(queryIndex, paramIndex, value);
                            }}
                        />
                    )}
                    {DragBlockRequire[slug].type === 'checkbox' && (
                        <CheckboxControl
                            checked={!!value}
                            onChange={() => {
                                DragBlockTheme(queryIndex, paramIndex, !!value ? '' : 'true');
                            }}
                        />
                    )}
                    {DragBlockRequire[slug].type === 'select' && (
                        <SelectControl
                            value={value}
                            onChange={(value) => {
                                DragBlockTheme(queryIndex, paramIndex, value);
                            }}
                            options={DragBlockRequire[slug].options}
                        />
                    )}
                    {DragBlockRequire[slug].type === 'query_variable' && (
                        <>
                            <SelectControl
                                value={value}
                                onChange={(value) => {
                                    DragBlockTheme(queryIndex, paramIndex, value);
                                }}
                                options={options}
                            />
                        </>
                    )}
                </>
            )
        }
        const DragBlockCancel = (queryIndex, param, paramIndex) => {
            const {
                slug,
                value,
                disabled
            } = param;
            return (
                <DragBlockCurrentNew
                    className='dragblock-database-param-control-popover'
                    onClose={() => {
                        setParamIndexPop([queryIndex, -1]);
                    }}
                    onMouseLeave={() => {
                        setParamIndexPop([queryIndex, -1]);
                    }}
                    actions={{ hidden: false }}
                    onAction={(action, newParamList) => {
                        if ('disable' === action) {
                            if (newParamList[queryIndex]['params'][paramIndex]['disabled']) {
                                delete newParamList[queryIndex]['params'][paramIndex]['disabled'];
                            } else {
                                newParamList[queryIndex]['params'][paramIndex]['disabled'] = '*';
                            }
                        }
                        let DragBlockForce = cloneDeep(dragBlockQueries);
                        DragBlockForce[queryIndex]['params'] = newParamList;
                        setParamIndexPop([queryIndex, -1]);
                        setAttributes({ dragBlockQueries: DragBlockForce })
                    }}
                    disabled={disabled}
                    list={dragBlockQueries[queryIndex]['params']}
                    index={paramIndex}
                >
                    <>
                        <div className='title'>{DragBlockRequire[param['slug']]['label']}</div>
                        {DragBlockRequest(queryIndex, param, paramIndex)}
                    </>
                </DragBlockCurrentNew>
            )
        }
        if (DragBlockAvaiInverse(props)) {
            return (<><BlockEdit {...props} /></>)
        }
        return (
            <>
                <BlockEdit {...props} />
                <InspectorControls ><div className='dragblock-inspector-controls database'>
                    <PanelBody
                        title={__('Database', 'dragblock')}
                        initialOpen={dragBlockQueries.length > 0}
                    >
                        {DragBlockUpload()}
                        {
                        }
                        {dragBlockQueries && dragBlockQueries.length > 0 && (
                            <div className='properties queries'>
                                {dragBlockQueries.map((query, queryIndex) => {
                                    const {
                                        slug,
                                        name,
                                        id,
                                        params,
                                        disabled
                                    } = query;
                                    let DragBlockBytes = new Object();
                                    if (params) {
                                        let DragBlockSubmit = new Set(params.map(e => e['slug']));
                                        for (let paramSlug of DragBlockRange[slug]['params']) {
                                            if (DragBlockSubmit.has(paramSlug)) continue;
                                            if (!DragBlockRequire[paramSlug]) continue;
                                            DragBlockBytes[paramSlug] = DragBlockRequire[paramSlug];
                                        }
                                    }
                                    const [selectedQueryIndex, selectedParamIndex] = paramIndexPop
                                    {
                                    }
                                    return (
                                        <div className={classnames('query', { 'active': '' !== disabled })} key={queryIndex}>
                                            {DragBlockWeight(query, queryIndex)}
                                            <div className='query-params'>
                                                {
                                                }
                                                {params && params.length > 0 && (
                                                    params.map((param, paramIndex) => {
                                                        return (
                                                            <div key={paramIndex}>
                                                                {DragBlockToggle(queryIndex, param, paramIndex)}
                                                                {selectedQueryIndex === queryIndex &&
                                                                    selectedParamIndex === paramIndex && (
                                                                        DragBlockCancel(queryIndex, param, paramIndex)
                                                                    )}
                                                            </div>
                                                        )
                                                    })
                                                )}
                                                {
                                                }
                                                {Object.keys(DragBlockBytes).length > 0 && (
                                                    DragBlockConfirm(queryIndex, DragBlockBytes)
                                                )}
                                            </div>
                                            {queryIndexPop === queryIndex && (
                                                DragBlockBack(query, queryIndex)
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </PanelBody>
                </div></InspectorControls>
            </>
        );
    };
}, 'dragBlockDatabaseControls');
wp.hooks.addFilter(
    'editor.BlockEdit',
    'dragblock/database-controls',
    dragBlockDatabaseControls
);