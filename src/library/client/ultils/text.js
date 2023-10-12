import { isArray, isEmpty } from "lodash";
export function DragBlockAvaiFormatted(videoUrl, width = 1400, force = false) {
    let DragBlockAvaiEmpty = '';
    if (
    videoUrl.indexOf('https://youtu.be/') === -1 && 
    videoUrl.indexOf('https://www.youtube.com/watch?v=') === -1
    ) {
        if (!force) {
            return '';
        }
        if (videoUrl.indexOf('https://img.youtube.com/vi/') === -1) {
            return '';
        }        
    }
    DragBlockAvaiEmpty = videoUrl.replace('https://youtu.be/', '').replace('https://www.youtube.com/watch?v=', '').replace('https://img.youtube.com/vi/', '');
    DragBlockAvaiEmpty = DragBlockAvaiEmpty.split('/')[0];
    DragBlockAvaiEmpty = DragBlockAvaiEmpty.split('&')[0];
    DragBlockAvaiEmpty = DragBlockAvaiEmpty.split('?')[0];
    DragBlockAvaiEmpty = DragBlockAvaiEmpty.split('#')[0];
    if (!DragBlockAvaiEmpty) {
        return '';
    }
    let size = DragBlockAvaiExisting(width);
    const DragBlockAvaiGoogle = `https://img.youtube.com/vi/${DragBlockAvaiEmpty}/${size}.jpg`;
    return DragBlockAvaiGoogle;
}
export function DragBlockAvaiExisting(imageWidth) {
    if (imageWidth >= 1280) {
        return 'maxresdefault';
    } else if (imageWidth >= 640) {
        return 'sddefault';
    } else if (imageWidth >= 480) {
        return 'hqdefault';
    }
    return 'default';
}
export function DragBlockAvaiAdd(textAttr) {
    if (!isArray(textAttr) || !textAttr.length) {
        return '';
    }
    let text = '';
    let DragBlockAvaiRemove = '';
    for (let content of textAttr) {
        if (!content['slug'] || !content['value'] || content['disable']) {
            continue;
        }
        if (!text) {
            text = content['value'];
        }
        if (content['slug'] === dragBlockEditorInit.siteLocale) {
            DragBlockAvaiRemove = content['value'];
            break;
        }
    }
    if (!DragBlockAvaiRemove) {
        DragBlockAvaiRemove = text;
    }
    return DragBlockAvaiRemove;
}