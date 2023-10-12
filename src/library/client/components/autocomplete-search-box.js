import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import classnames from 'classnames';
import {
    SearchControl, Tooltip,
    Popover, Button
} from '@wordpress/components';
import { DragBlockCurrentImage } from '../icons/icons'
import { DragBlockAvaiDecode } from '../ultils/ajax';
import { isFunction } from 'lodash';
import { useEffect } from '@wordpress/element';
export default function DragBlockLastMultillingual({
    placeholder,
    onSelect,
    className,
    icon,
    label,
    text,
    showTrigger,
    suggestions
}) {
    const [autoSuggestSelected, setAutoSuggestSelected] = useState(0);
    const [autoSearchValue, setAutoSearchValue] = useState('')
    const [autoSearchResults, setAutoSearchResults] = useState({})
    const [showAutoSearchPopover, setShowAutoSearchPopover] = useState(false);
    const [isDoingAjax, setIsDoingAjax] = useState(false);
    const [ajaxResults, setAjaxResults] = useState([]);
    const [typingTimeoutId, setTypingTimeoutId] = useState(null);
    const [entered, setEntered] = useState(false);    
    const DragBlockLastOverlay = 12;
    const DragBlockLastPopover = () => {
        setShowAutoSearchPopover(false)
    }
    const DragBlockLastCur = () => {
        let DragBlockLastPosition = {};
        for (let slug in suggestions) {
            if (Object.keys(DragBlockLastPosition).length > DragBlockLastOverlay) break;
            DragBlockLastPosition[slug] = suggestions[slug]
        }
        setAutoSearchResults(DragBlockLastPosition);
        setShowAutoSearchPopover(true)
    }
    const itemOnClick = (slug) => {
        onSelect(slug);
        setAutoSearchResults({})
        setAutoSearchValue('')
        DragBlockLastPopover()
    }
    let DragBlockLastObject = null;
    let DragBlockLastSelectors = '';
    if (!suggestions) {
        suggestions = {};
    } else if (typeof (suggestions) === 'string') {
        DragBlockLastSelectors = suggestions;
        suggestions = {
        };
        if (ajaxResults && ajaxResults.length) {
            for (let obj of ajaxResults) {
                suggestions[obj.value] = {
                    label: obj.label,
                    note: obj.note,
                }
            }
        }
        switch (DragBlockLastSelectors) {
            case 'categories':
                suggestions['[dragblock.post.cat.id]'] = {
                    label: __('Post Category ID'),
                    note: __('Current Post Category ID'),
                }
                break;
            case 'tags':
                suggestions['[dragblock.post.tag.id]'] = {
                    label: __('Post Tag ID'),
                    note: __('Current Post Tag ID'),
                }
                break;
            case 'authors':
                suggestions['[dragblock.post.author.id]'] = {
                    label: __('Post Author ID'),
                    note: __('Current Post Author ID'),
                }
                break;
        }
    }
    const DragBlockLastOffset = (query, type) => {
        if (!query || !type) {
            setAjaxResults([]);
            return;
        }
        const DragBlockLastBlur = new URLSearchParams({
            search: query,
            per_page: DragBlockLastOverlay,
            _locale: 'users',
        });
        wp.apiFetch({ path: `/wp/v2/${type}?${DragBlockLastBlur.toString()}` }).then(
            (objects) => {
                setAjaxResults(
                    objects.map((obj) => {
                        return ({
                            label: obj['name'],
                            value: obj['id'],
                            note: obj['description']
                        })
                    })
                );
                objects.map((obj) => {
                    suggestions[obj['id']] = {
                        label: obj['name'],
                        note: obj['description'],
                    }
                })
                DragBlockAvaiDecode(type, objects);
                DragBlockLastTransform(query);
                setIsDoingAjax(false);
            }
        ).catch((error) => {
            setIsDoingAjax(false);
            setAjaxResults([]);
        });
    }
    const DragBlockLastTransform = (value) => {
        if (!value || !suggestions || suggestions.length === 0) {
            setAutoSearchResults({});
            return;
        }
        let DragBlockLastWidth = value.toLowerCase().trim().replace(/-/gi, ' ').split(' ').map(e => e.trim());
        let DragBlockLastIcon3 = DragBlockLastWidth.join('').replace(/ /gi, '');
        let results = {};
        let DragBlockLastFound = 0;
        for (let slug in suggestions) {
            let q = typeof (suggestions[slug]) === 'string' ? suggestions[slug].toLowerCase() : Object.values(suggestions[slug]).join(' ').toLowerCase();
            let qm = q.replace(/ /gi, '').replace(/-/gi, '');
            let match = true;
            if (qm.indexOf(DragBlockLastIcon3) === -1) {
                for (let word of DragBlockLastWidth) {
                    if (q.indexOf(word) === -1) {
                        match = false
                        break;
                    }
                }
            }
            if (match) {
                results[slug] = suggestions[slug];
                if (++DragBlockLastFound >= DragBlockLastOverlay) break;
            }
        }
        setAutoSearchResults(results);
    }
    return (
        <div className={classnames('dragblock-autocomplete-search-box' + (className ? ' ' + className : ''), {
            'show-trigger': showTrigger
        })}>
            {
            }
            <Button
                icon={icon}
                iconSize='24'
                label={label}
                showTooltip={!!label}
                className='fake-search-button'
                variant='secondary'
                onClick={() => {
                    if (entered) {
                        setEntered(false);
                        return;
                    }
                    DragBlockLastCur();                    
                }}
            >
                {text ? text : (icon ? '' : placeholder)}
            </Button>
            {}
            {
                showAutoSearchPopover ? (
                    <Popover
                        position='bottom center'
                        onFocusOutside={() => {
                            DragBlockLastPopover();
                        }}
                        onMouseMove={(e) => {
                            if (DragBlockLastObject === null) {
                                DragBlockLastObject = { X: e.clientX, Y: e.clientY }
                                return;
                            }
                        }}
                        onClose={() => {
                            DragBlockLastPopover();
                        }}
                        onMouseLeave={(e) => {
                            if (DragBlockLastObject === null || DragBlockLastObject.X === e.clientX || DragBlockLastObject.Y === e.clientY) {
                                return;
                            }
                            DragBlockLastPopover();
                        }}
                        className={classnames('dragblock-autocomplete-search-box-popover', {
                            'show-trigger': showTrigger
                        })}
                    >
                        <SearchControl
                            onKeyDown={(event) => {
                                if (event.key === 'ArrowUp') {
                                    if (autoSuggestSelected === 0) setAutoSuggestSelected(Object.keys(autoSearchResults).length - 1)
                                    else setAutoSuggestSelected(autoSuggestSelected - 1)
                                }
                                else if (event.key === 'ArrowDown') {
                                    if (autoSuggestSelected >= Object.keys(autoSearchResults).length - 1) setAutoSuggestSelected(0)
                                    else setAutoSuggestSelected(autoSuggestSelected + 1)
                                }
                                else if (event.key === "Enter") {
                                    let keys = Object.keys(autoSearchResults);
                                    if (autoSuggestSelected < 0 || keys.length - 1 < autoSuggestSelected) return;
                                    let slug = keys[autoSuggestSelected]
                                    itemOnClick(slug);
                                    setEntered(true);
                                    DragBlockLastPopover();
                                }
                            }}
                            placeholder={placeholder}
                            value={autoSearchValue}
                            onChange={(value) => {
                                if (DragBlockLastSelectors) {
                                    setIsDoingAjax(true);
                                    setAutoSearchResults([]);
                                    if (typingTimeoutId) clearTimeout(typingTimeoutId);
                                    setTypingTimeoutId(setTimeout(() => {
                                        DragBlockLastOffset(value, DragBlockLastSelectors);
                                    }, 1000));
                                } else {
                                    DragBlockLastTransform(value)
                                }
                                setAutoSearchValue(value);
                            }}
                        />
                        {DragBlockLastSelectors && autoSearchValue && (
                            <div className='results'>
                                {isDoingAjax === true ? (
                                    <>
                                        {__('Fetching...', 'dragblock')}
                                    </>
                                ) : (<>
                                    {Object.keys(suggestions).length === 0 && (
                                        <>
                                            {__('Not found any', 'dragblock')}
                                        </>
                                    )}
                                </>
                                )}
                            </div>
                        )}
                        {Object.entries(autoSearchResults).length !== 0 && (
                            <div
                                className='results'
                            >{
                                    Object.entries(autoSearchResults).map(([slug, prop], index) => {
                                        let note = slug;
                                        let label = slug;
                                        if (typeof (prop) === 'string') {
                                            label = prop;
                                        } else {
                                            if (prop['note']) {
                                                note = prop['note']
                                            }
                                            else if (prop['label']) {
                                                note = prop['label']
                                            }
                                            if (prop['label']) {
                                                label = prop['label']
                                            }
                                        }
                                        return (
                                            <div key={index} className='item' onMouseEnter={
                                                () => {
                                                    setAutoSuggestSelected(index);
                                                }
                                            }>
                                                <a
                                                    className={classnames('item-link', {
                                                        'active': autoSuggestSelected === index
                                                    })}
                                                    onClick={() => {
                                                        itemOnClick(slug);
                                                    }}
                                                >
                                                    <Tooltip
                                                        delay={10}
                                                        text={note}
                                                        position='middle left'
                                                    >
                                                        <code>{label}</code>
                                                    </Tooltip>
                                                </a>
                                            </div>
                                        )
                                    })
                                }</div>
                        )}
                    </Popover>
                ) : null
            }
        </div >
    );
}