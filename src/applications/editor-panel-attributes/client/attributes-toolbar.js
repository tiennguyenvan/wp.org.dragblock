import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent } from '@wordpress/compose';
import { useRef, useState } from '@wordpress/element';
import { cloneDeep } from 'lodash'
import {
    __experimentalLinkControl,
    BlockControls
} from '@wordpress/block-editor';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import {
    Popover, ToolbarGroup,
    ToolbarButton
} from '@wordpress/components';
import {
    link,
    linkOff
} from '@wordpress/icons';
import {
    DragBlockEmpty,
    DragBlockExisting,
    DragBlockAdd,
    DragBlockGoogle,
} from './attributes-settings';
import { select } from '@wordpress/data'
import { DragBlockAvaiInverse } from '../../../library/client/ultils/banning';
import { Button } from '@wordpress/components';
import { DragBlockCurrentZ, DragBlockCurrentOptions, DragBlockCurrentRendered, DragBlockAvaiFind } from '../../../library/client/icons/icons';
import DragBlockLastPart from '../../../library/client/components/appender';
const dragBlockAttributesToolbar = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        const { attributes, setAttributes, clientId, isSelected, isMultiSelected } = props;
        let { dragBlockAttrs } = attributes;
        if (!dragBlockAttrs) {
            dragBlockAttrs = [];
        }
        const [isEditingURL, setIsEditingURL] = useState(false);
        const [suggestionType, setSuggestionType] = useState('all');
        const DragBlockRemove = 'noreferrer noopener';
        function unlink() {
            let DragBlockEncode = cloneDeep(dragBlockAttrs);
            let DragBlockResponse = ['href', 'target', 'rel']
            for (let delAttr of DragBlockResponse) {
                DragBlockExisting(DragBlockEncode, delAttr);
            }
            setAttributes({
                dragBlockAttrs: DragBlockEncode
            });
            setIsEditingURL(false);
        }
        function onToggleOpenInNewTab(attrList, value) {
            const DragBlockParsed = (value ? '_blank' : '');
            const DragBlockSelected = (DragBlockParsed ? DragBlockRemove : '');
            if (DragBlockParsed) {
                DragBlockAdd(attrList, 'target', DragBlockParsed);
            } else {
                DragBlockExisting(attrList, 'target');
            }
            if (DragBlockSelected) {
                DragBlockAdd(attrList, 'rel', DragBlockSelected);
            } else {
                DragBlockExisting(attrList, 'rel');
            }
        }
        let href = DragBlockGoogle(dragBlockAttrs, 'href');
        let target = DragBlockGoogle(dragBlockAttrs, 'target');
        let src = DragBlockGoogle(dragBlockAttrs, 'src');
        const DragBlockPage = {
            'all': {
                text: __('All', 'dragblock'),
                query: {},
            },
            'cat': {
                text: __('Category', 'dragblock'),
                query: {
                    type: 'term',
                    subtype: 'category',
                },
            },
            'tag': {
                text: __('Tag', 'dragblock'),
                query: {
                    type: 'term',
                    subtype: 'tag',
                },
            },
        }
        const DragBlockDom = <div className='suggestion-query-type-selector'>
            {Object.keys(DragBlockPage).map((type, _i) => {
                return (
                    <a className={type === suggestionType ? 'active' : ''} key={_i} onClick={() => {
                        setSuggestionType(type)
                    }}>{DragBlockPage[type]['text']}</a>
                )
            })}
        </div>
        if (DragBlockAvaiInverse(props)) {
            return (<><BlockEdit {...props} /></>)
        }
        return (
            <>
                <BlockEdit {...props} />
                {(props.name === 'dragblock/link') && (
                    <>
                        <BlockControls>
                            <ToolbarGroup>
                                <ToolbarButton
                                    name="link"
                                    icon={link}
                                    title={__('Link', 'dragblock')}
                                    onClick={() => {
                                        setIsEditingURL(true)
                                    }}
                                    isActive={href !== null}
                                />
                                {(href !== null) ? (
                                    <ToolbarButton
                                        name="link-off"
                                        icon={linkOff}
                                        title={__('Unlink', 'dragblock')}
                                        onClick={() => {
                                            unlink();
                                        }}
                                    />
                                ) : null}
                                {isEditingURL && (
                                    <Popover
                                        position="bottom center"
                                        onClose={() => {
                                            setIsEditingURL(false);
                                        }}
                                    >
                                        {DragBlockDom}
                                        <__experimentalLinkControl
                                            suggestionsQuery={DragBlockPage[suggestionType]['query']}
                                            className="wp-block-navigation-link__inline-link-input"
                                            value={{
                                                url: (href === null ? '' : href),
                                                opensInNewTab: (target !== '_blank' ? '' : target)
                                            }}
                                            onChange={({
                                                url: newURL,
                                                opensInNewTab: newOpensInNewTab,
                                            }) => {
                                                let DragBlockEncode = cloneDeep(dragBlockAttrs);
                                                DragBlockAdd(DragBlockEncode, 'href', newURL)
                                                onToggleOpenInNewTab(DragBlockEncode, newOpensInNewTab);
                                                setAttributes({ dragBlockAttrs: DragBlockEncode });
                                            }}
                                            onRemove={() => {
                                                unlink();
                                            }}
                                        />
                                    </Popover>
                                )}
                            </ToolbarGroup>
                        </BlockControls>
                    </>
                )}
                {
                    (props.name === 'dragblock/image') && (
                        <BlockControls>
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={(media) => {
                                        if (!media['url']) return;
                                        let DragBlockEncode = cloneDeep(dragBlockAttrs);
                                        DragBlockAdd(DragBlockEncode, 'src', media['url'])
                                        setAttributes({ dragBlockAttrs: DragBlockEncode });
                                    }}
                                    allowedTypes={['image']}
                                    value={src}
                                    render={({ open }) => (
                                        <ToolbarGroup>
                                            <ToolbarButton
                                                label={__('Upload Image', 'dragblock')}
                                                onClick={open}
                                                className='dragblock-toolbar-upload-media'>
                                                {DragBlockCurrentOptions}
                                            </ToolbarButton>
                                        </ToolbarGroup>
                                    )}
                                />
                            </MediaUploadCheck>
                        </BlockControls>
                    )
                }
                {([
                    'dragblock/wrapper',
                    'dragblock/link',
                    'dragblock/form',
                    'dragblock/select',
                ].includes(props.name)) && (
                        <BlockControls>
                            <ToolbarGroup>
                                <ToolbarButton>
                                    <DragBlockLastPart rootClientId={clientId} />
                                </ToolbarButton>
                            </ToolbarGroup>
                        </BlockControls>
                    )}
            </>
        );
    };
}, 'dragBlockAttributesToolbar');
wp.hooks.addFilter(
    'editor.BlockEdit',
    'dragblock/attributes-toolbar',
    dragBlockAttributesToolbar
);