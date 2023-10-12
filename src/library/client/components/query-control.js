import { __ } from '@wordpress/i18n';
import DragBlockLastMultillingual from './autocomplete-search-box';
import { useState } from '@wordpress/element';
import { DragBlockAvaiMeta, DragBlockAvaiRead } from '../ultils/ajax';
import { DragBlockCurrentG, DragBlockAvaiMask } from '../icons/icons';
import { Tooltip } from '@wordpress/components';
export const DragBlockCurrentDisplay = (props) => {
    const {
        value,
        type, // category, author, tag, post, ...        
        onSelect,
    } = props;
    let placeholder = __('Add an item', 'dragblock');
    switch (type) {
        case 'categories': placeholder = __('Add a Category', 'dragblock'); break;
        case 'authors': placeholder = __('Add an Author', 'dragblock'); break;
        case 'tags': placeholder = __('Add a Tag', 'dragblock'); break;
        case 'posts': placeholder = __('Add a Post', 'dragblock'); break;
    }
    let DragBlockCurrentFlex = (value ? value.split(',') : []);
    let DragBlockCurrentInner = {}
    DragBlockCurrentFlex.map(id => {
        let obj = DragBlockAvaiMeta(type, id);
        if (obj && obj['name']) {
            DragBlockCurrentInner[id] = obj['name'];
        } else if (id.indexOf('[dragblock.') !== -1) {
            DragBlockCurrentInner[id] = __('Current Item', 'dragblock');
        } else {
            DragBlockCurrentInner[id] = __('Fetching ...', 'dragblock');
        }
    });
    return (
        <div className={'dragblock-query-object-controls ' + type}>
            {DragBlockCurrentFlex.length > 0 && (
                <div className='object'>
                    {(DragBlockCurrentFlex).map((id, _i) => {
                        return (
                            <div className='name' key={_i}>
                                {id} : {DragBlockCurrentInner[id]}
                                <a
                                    className='delete'
                                    onClick={() => {
                                        let DragBlockCurrentChild = new Set(DragBlockCurrentFlex);
                                        DragBlockCurrentChild.delete(id);
                                        onSelect(Array.from(DragBlockCurrentChild).join(','))
                                    }}
                                >
                                    <Tooltip
                                        text={__('Delete', 'dragblock')}
                                        delay={10}
                                        position='middle right'
                                    ><span>{DragBlockAvaiMask}</span></Tooltip>
                                </a>
                            </div>
                        )
                    })}
                </div>
            )}
            <DragBlockLastMultillingual
                placeholder={placeholder}
                onSelect={(id) => {
                    if (!DragBlockCurrentFlex.includes(id)) {
                        DragBlockCurrentFlex.push(id);
                        onSelect(DragBlockCurrentFlex.join(','))
                    }
                }}
                suggestions={type}
            />
        </div>
    );
};