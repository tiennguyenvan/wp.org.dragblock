import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import {
    Tooltip
} from '@wordpress/components';
import { TextControl } from '@wordpress/components';
import { Flex } from '@wordpress/components';
import { FlexItem } from '@wordpress/components';
import { cloneDeep } from 'lodash';
export default function DragBlockCurrentParent({
    value,
    onChange,
    supportedStates,
    suggestions
}) {
    let DragBlockCurrentJustify = supportedStates && Object.keys(supportedStates).length > 0;
    if (!value) {
        if (DragBlockCurrentJustify) {
            value = {
                selectors: '',
                states: '',
            }
        } else {
            value = '';
        }
    }
    return (
        <Flex justify='stretch' gap={0} align='center' className='dragblock-selectors-control'>
            {}
            <Tooltip
                text={__('.Classname, #ID, selector query. Default: this element', 'dragblock')}
                delay={10}
                position='top center'
            >
                <FlexItem>
                    <TextControl
                        placeholder={__('Selector', 'dragblock')}
                        value={value.selectors}
                        onChange={(newSelectors) => {
                            if (typeof (value) === 'object') {
                                let DragBlockCond = cloneDeep(value)
                                DragBlockCond['selectors'] = newSelectors;
                                onChange(DragBlockCond);
                            } else {
                                onChange(newSelectors);
                            }
                        }}
                    />
                </FlexItem>
            </Tooltip>
            {}
            {
                DragBlockCurrentJustify ? (
                    <FlexItem>
                        <Flex justify='stretch' gap={0} className='states'>
                            {
                                Object.entries(supportedStates).map(([stateValue, stateNote], _i) => {
                                    return (<FlexItem>
                                        <a
                                            key={_i}
                                            className={
                                                classnames('state-item', {
                                                    'active': value['states'] && value['states'].indexOf(stateValue) !== -1
                                                })
                                            }
                                            onClick={() => {
                                                let DragBlockCond = cloneDeep(value)
                                                if (!DragBlockCond['states']) DragBlockCond['states'] = '';
                                                if (DragBlockCond['states'].indexOf(stateValue) === -1) DragBlockCond['states'] += stateValue
                                                else DragBlockCond['states'] = DragBlockCond['states'].replace(stateValue, '');
                                                onChange(DragBlockCond);
                                            }}
                                        >
                                            <Tooltip
                                                text={stateNote}
                                                delay={10}
                                                position='top center'
                                            >
                                                <span>:{stateValue}</span>
                                            </Tooltip>
                                        </a>
                                    </FlexItem>)
                                })
                            }
                        </Flex>
                    </FlexItem>
                ) :
                    (
                        <>
                            {}
                        </>
                    )
            }
        </Flex>
    );
}