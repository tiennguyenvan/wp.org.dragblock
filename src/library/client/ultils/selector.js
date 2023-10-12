export const DragBlockAvaiReplicate = {
    'dragblock/form': [
        '.fail', //'.dragblock-form-success',
        '.pass', //'.dragblock-form-error',
    ],
    'core/query-pagination': [        
        '.page-numbers',
        '.dots',
    ],
    'core/navigation': [        
        '.wp-block-navigation-item',
        '.wp-block-navigation-submenu',
        '.wp-block-navigation__responsive-container-open',
    ],
    'core/search': [
        '.wp-block-search__label',
        '.wp-block-search__inside-wrapper',
        '.wp-block-search__input',
        '.wp-block-search__button'
    ],
}
export function getClassList() {
    let list = {};
    if (window['dragBlockSelectors'] && window['dragBlockSelectors']['classes'] && window['dragBlockSelectors']['classes']['size'] > 0) {
        for (let sel of window['dragBlockSelectors']['classes']) {
            list[sel] = sel;
        }
    }
    return list;
}
export function DragBlockAvaiNext() {
    let list = {};
    if (window['dragBlockSelectors'] && window['dragBlockSelectors']['ids'] && window['dragBlockSelectors']['ids']['size'] > 0) {
        for (let sel of window['dragBlockSelectors']['ids']) {
            list[sel] = sel;
        }
    }
    return list;
}
export function DragBlockAvaiByte() {
    return {}
    let selector = new Object();
    selector['&'] = '&';
    if (window['dragBlockSelectors'] && window['dragBlockSelectors']['selectors'] && window['dragBlockSelectors']['selectors']['size'] > 0) {
        for (let sel of window['dragBlockSelectors']['selectors']) {
            selector[sel] = sel;
        }
    }
    return selector;
}