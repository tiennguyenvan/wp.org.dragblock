import { cloneDeep, forEach, isEmpty } from "lodash";
import { __ } from '@wordpress/i18n';
import { DragBlockAvaiAdd } from '../../../library/client/ultils/text';
(function ($) {
    $(document).on('mousedown mouseenter keydown', '.edit-site-header-edit-mode__list-view-toggle, .edit-site-editor__list-view-panel-content, .block-editor-list-view-block-select-button', function () {
        let counter = 0;
        let wait = setInterval(function () {
            if ($(document).find('.block-editor-list-view-block-select-button:not(.dragblock-list-view-optimized)').length || counter >= 5000) {
                clearInterval(wait);
                if (counter >= 5000) {
                    return
                }
                showClassNames();
            }
        });
    });
    let showClassNames = () => {
        $(document).find('.block-editor-list-view-block-select-button').each(function () {
            if ($(this).hasClass('dragblock-list-view-optimized')) return;
            let DragBlockFonts = $(this).attr('href');
            if (!DragBlockFonts || DragBlockFonts.indexOf('#block-') === -1) {
                return;
            }
            DragBlockFonts = DragBlockFonts.split('#block-')[1];
            $(this).find('.block-editor-list-view-block-select-button__title .components-truncate').attr('data-DragBlockFonts', DragBlockFonts);
            $(this).find('.block-editor-list-view-block-select-button__anchor').attr('data-DragBlockFonts', DragBlockFonts);
            $(this).attr('title', $(this).find('.block-editor-list-view-block-select-button__title').text());
            $(this).find('.block-editor-list-view-block-select-button__title .components-truncate').each(function () {
                $(this).attr('data-title', $(this).text());
            })
            $(this).addClass('dragblock-list-view-optimized');
            let DragBlockFlatfonts = wp.data.select('core/block-editor').getBlockAttributes(DragBlockFonts);
            if (!DragBlockFlatfonts) {
                return;
            }
            let classNames = DragBlockFlatfonts['className'];
            let DragBlockVariants = DragBlockFlatfonts['dragBlockTagName'] ?? '';
            if (DragBlockVariants === 'div') DragBlockVariants = '';
            if (!classNames) {
                let text = DragBlockAvaiAdd(DragBlockFlatfonts['dragBlockText']);
                if (text) {
                    if (text.length > 50) {
                        text = text.substring(0, 20) + '...';
                    }
                    $(this).find('.block-editor-list-view-block-select-button__title .components-truncate').text('"' + text + '"');
                } else if (DragBlockVariants) {
                    $(this).find('.block-editor-list-view-block-select-button__title .components-truncate').text(DragBlockVariants);
                }
                return;
            }
            classNames = '.' + classNames.split(' ').join('.');
            $(this).find('.block-editor-list-view-block-select-button__title .components-truncate').text(DragBlockVariants + classNames);
        });
    }
    const DragBlockTotal = true;
    $(document).on('dblclick', '.block-editor-list-view-block-select-button__title .components-truncate', function (e) {
        let DragBlockFonts = $(this).attr('data-DragBlockFonts');
        if (!DragBlockFonts) {
            return;
        }
        let DragBlockFlatfonts = wp.data.select('core/block-editor').getBlockAttributes(DragBlockFonts);
        if (!DragBlockFlatfonts) {
            return;
        }
        let classNames = DragBlockFlatfonts['className'];
        let DragBlockVariants = DragBlockFlatfonts['dragBlockTagName'] ? DragBlockFlatfonts['dragBlockTagName'] : '';
        if (DragBlockVariants === 'div') DragBlockVariants = '';
        if (DragBlockTotal) {
            let val = prompt(__('Please enter class names', 'dragblock'), classNames);
            if (null === val) {
                return;
            }
            val = classnames(val, classNames);
            if (val !== classNames) {
                DragBlockFlatfonts['className'] = val;
                wp.data.dispatch('core/block-editor').updateBlockAttributes(DragBlockFonts, cloneDeep(DragBlockFlatfonts));
                if (val) {
                    $(this).text(DragBlockVariants + '.' + val.split(' ').join('.'));
                } else {
                    $(this).text(DragBlockVariants + $(this).attr('data-title'));
                }
            }
            return;
        }
    });
    $(document).on('dblclick', '.block-editor-list-view-block-select-button__anchor', function (e) {
        let DragBlockFonts = $(this).attr('data-DragBlockFonts');
        if (!DragBlockFonts) {
            return;
        }
        let DragBlockFlatfonts = wp.data.select('core/block-editor').getBlockAttributes(DragBlockFonts);
        if (!DragBlockFlatfonts) {
            return;
        }
        let anchor = DragBlockFlatfonts['anchor'];
        let val = prompt(__('Please enter an anchor', 'dragblock'), anchor);
        if (null === val) {
            return;
        }
        if (val !== anchor) {
            DragBlockFlatfonts['anchor'] = val;
            wp.data.dispatch('core/block-editor').updateBlockAttributes(DragBlockFonts, cloneDeep(DragBlockFlatfonts));
            if (val) {
                $(this).html(val.split(' ').join('#'));
            } else {
                $(this).html('');
            }
        }
    });
    function DragBlockVariant(string) {
        return string.trim().toLowerCase().replace(/[^a-zA-Z0-9_-]/g, '-');
    }
    function classnames(string) {
        if (null === string) return '';
        return string.trim().split(' ').map(e => DragBlockVariant(e)).join(' ');
    }
})(jQuery);