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
import DragBlockCurrentOrdered from '../../../library/client/components/multilingual-text-control';
import { dragBlockLanguages } from '../../../library/client/ultils/lang';
const dragBlockContentControls = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        const { attributes, setAttributes, clientId, isSelected, isMultiSelected } = props;
        const [showControlPopover, setShowControlPopover] = useState(-1);
        let { dragBlockText } = attributes;
        if (!dragBlockText) {
            dragBlockText = [];
        }
        const updateDragBlockText = (value, index) => {
            let DragBlockInitial = cloneDeep(dragBlockText)
            DragBlockInitial[index]['value'] = value;
            setAttributes({ dragBlockText: DragBlockInitial })
        }
        if (DragBlockAvaiInverse(props) || !['dragblock/text', 'dragblock/option'].includes(props.name)) {
            return (<><BlockEdit {...props} /></>)
        }
        return (
            <>
                <BlockEdit {...props} />
                <InspectorControls ><div className='dragblock-inspector-controls content'>
                    <PanelBody
                        title={__('Content', 'dragblock')}
                        initialOpen={dragBlockText.length > 0}
                    >
                        {
                        }
                        <DragBlockLastMultillingual
                            placeholder={__('+ Add a Text', 'dragblock')}
                            onSelect={(slug) => {
                                let text = cloneDeep(dragBlockText)
                                text.unshift({
                                    value: '',
                                    slug: slug,
                                });
                                setAttributes({ dragBlockText: text })
                                setShowControlPopover(0);
                            }}
                            suggestions={dragBlockLanguages}
                        />
                        {
                        }
                        {dragBlockText && 0 !== dragBlockText.length && (
                            <div className='properties'>
                                {
                                    dragBlockText.map((prop, index) => {
                                        return (
                                            <div key={index}>
                                                {
                                                }
                                                <Tooltip
                                                    delay={10}
                                                    text={dragBlockLanguages[prop.slug]}
                                                    position='middle left'
                                                >
                                                    <a
                                                        className={
                                                            classnames('', {
                                                                'disabled': !!prop['disabled']
                                                            })
                                                        }
                                                        onClick={() => {
                                                            setShowControlPopover(index);
                                                        }}
                                                    >
                                                        <code
                                                            className={
                                                                classnames('', {
                                                                    'active': prop.slug === dragBlockEditorInit.siteLocale
                                                                })
                                                            }
                                                        >{prop.slug}:</code><span>{prop.value}</span>
                                                    </a>
                                                </Tooltip>
                                                {
                                                }
                                                {
                                                    showControlPopover === index ? (
                                                        <DragBlockCurrentNew
                                                            className='dragblock-content-control-popover'
                                                            onClose={() => { setShowControlPopover(-1); }}
                                                            onMouseLeave={() => { setShowControlPopover(-1); }}
                                                            onKeyDown={(event) => {
                                                                if (event.key === 'Escape' || event.key === 'Enter') {
                                                                    setShowControlPopover(-1);
                                                                }
                                                            }}
                                                            actions={{ hidden: false }}
                                                            onAction={(action, DragBlockInitial) => {
                                                                if ('disable' === action) {
                                                                    if (DragBlockInitial[index]['disabled']) {
                                                                        delete DragBlockInitial[index]['disabled'];
                                                                    } else {
                                                                        DragBlockInitial[index]['disabled'] = '*';
                                                                    }
                                                                }
                                                                setShowControlPopover(-1);
                                                                setAttributes({ dragBlockText: DragBlockInitial })
                                                            }}
                                                            title={dragBlockLanguages[prop.slug]}
                                                            disabled={prop['disabled']}
                                                            list={dragBlockText}
                                                            index={index}
                                                        >
                                                            {
                                                            }
                                                            <div className='value'>
                                                                <SelectControl
                                                                    value={prop['slug']}
                                                                    options={Object.entries(dragBlockLanguages).map(([key, value]) => {
                                                                        return { value: key, label: value }
                                                                    })}
                                                                    onChange={(value) => {
                                                                        let DragBlockInitial = cloneDeep(dragBlockText);
                                                                        DragBlockInitial[index]['slug'] = value;
                                                                        setAttributes({ dragBlockText: DragBlockInitial })
                                                                    }}
                                                                />
                                                                <DragBlockLastInvert
                                                                    options={Object.fromEntries(Object.entries(dragBlockQueryShortcodes).map(([key, value]) => [key, value['label']]))}
                                                                    onChange={(value) => {
                                                                        let DragBlockInitial = cloneDeep(dragBlockText);
                                                                        DragBlockInitial[index]['value'] = value;
                                                                        setAttributes({ dragBlockText: DragBlockInitial })
                                                                    }}
                                                                    value={prop['value']}
                                                                    placeholder={__('Input Text Value', 'dragblock')}
                                                                />
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
}, 'dragBlockContentControls');
wp.hooks.addFilter(
    'editor.BlockEdit',
    'dragblock/content-controls',
    dragBlockContentControls
);