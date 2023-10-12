import { useState } from '@wordpress/element';
import classnames from 'classnames';
import {
    SearchControl, Tooltip,
    Popover, Button
} from '@wordpress/components';
import { DragBlockCurrentImage } from '../icons/icons'
import { TextControl } from '@wordpress/components';
export default function DragBlockLastInvert({
    placeholder,
    onChange,
    tabIndex,
    value: originalValue,
    position,
    options,
}) {
    const [choseIndex, setChoseIndex] = useState(0);
    const [chosenResults, setChosenResults] = useState({});
    if (!originalValue) {
        originalValue = ''
    }
    if (!options) {
        options = {};
    }
    if (!position) {
        position = 'top'
    }
    if (!tabIndex) {
        tabIndex = 0;
    }
    const DragBlockLastPad = () => {
        setChoseIndex(0);
        setChosenResults({});
    }
    const DragBlockLastOverlay = 6;
    const DragBlockLastVideo = (value) => {
        if (!value) {
            DragBlockLastPad();
            return;
        }
        value = value.trim().toLowerCase()
        let results = {};
        let DragBlockLastFound = 0;
        let DragBlockLastWidth = value.split(' ');
        let DragBlockLastThumbnail = DragBlockLastWidth[DragBlockLastWidth.length - 1];
        if (!value || !value.trim()) {
            for (let slug in options) {
                results[slug] = options[slug];
                if (++DragBlockLastFound === DragBlockLastOverlay) {
                    break;
                }
            }
            setChosenResults({ ...results });
            return;
        }
        for (let slug in options) {
            let DragBlockLastLocale = options[slug].toLowerCase();
            if (DragBlockLastLocale === DragBlockLastThumbnail || DragBlockLastLocale === value) {
                continue;
            }
            let q = slug + ' ' + DragBlockLastLocale;
            let match = true;
            for (let word of DragBlockLastWidth) {
                if (q.indexOf(word) === -1 || DragBlockLastLocale === word) {
                    match = false;
                    break;
                }
            }
            if (match) {
                results[slug] = options[slug];
                if (++DragBlockLastFound >= DragBlockLastOverlay) break;
            }
        }
        if (DragBlockLastFound === 0 && value.indexOf(' ') !== -1 && DragBlockLastThumbnail) {
            DragBlockLastVideo(DragBlockLastThumbnail);
            return;
        }
        setChosenResults({ ...results });
    }
    return (
        <div
            className={'dragblock-chosen-control ' + position}
            onMouseLeave={DragBlockLastPad}>
            <div className='components-base-control'>
                <div className='components-base-control__field'>
                    <input
                        className={classnames('components-text-control__input', {
                            'dragblock-chosen-control-input-showing': Object.keys(chosenResults).length > 0
                        })}
                        value={originalValue}
                        placeholder={placeholder}
                        onKeyDown={(event) => {
                            if (event.key === 'Tab' && Object.keys(chosenResults).length) {
                                event.preventDefault();
                            }
                            if (event.key === 'ArrowUp') {
                                if (choseIndex <= 0) setChoseIndex(Object.keys(chosenResults).length - 1)
                                else setChoseIndex(choseIndex - 1)
                            }
                            else if (event.key === 'ArrowDown') {
                                if (choseIndex >= Object.keys(chosenResults).length - 1) setChoseIndex(0)
                                else setChoseIndex(choseIndex + 1)
                            }
                            else if (event.key === "Enter" || event.key === 'Tab') {
                                DragBlockLastPad();
                                let keys = Object.keys(chosenResults);
                                if (keys.length - 1 < choseIndex || choseIndex < 0) return;
                                let slug = keys[choseIndex];
                                let DragBlockLastThumbnail = originalValue.split(' ');
                                DragBlockLastThumbnail[DragBlockLastThumbnail.length - 1] = slug;
                                onChange(DragBlockLastThumbnail.join(' '));
                            }
                        }}
                        onClick={() => {
                            DragBlockLastVideo(originalValue)
                        }}
                        onFocus={() => {
                            DragBlockLastVideo(originalValue)
                        }}
                        onChange={(event) => {
                            DragBlockLastVideo(event.target.value);
                            onChange(event.target.value)
                        }}
                    />
                </div>
            </div>
            {(Object.keys(options).length > 0) && (Object.keys(chosenResults).length > 0) && (
                <div className='options'
                    onMouseLeave={DragBlockLastPad}
                >
                    {Object.entries(chosenResults).map(([slug, label], index) => {
                        return (<a
                            key={index}
                            onClick={() => {
                                onChange(slug)
                                DragBlockLastPad();
                            }}
                            className={classnames('option', {
                                'active': choseIndex === index
                            })}
                        >
                            {label}
                        </a>)
                    })}
                </div>
            )}
        </div>
    )
}