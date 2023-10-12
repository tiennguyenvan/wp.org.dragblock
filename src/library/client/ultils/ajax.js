export const DragBlockAvaiDecode = (type, objects) => {
    if (!window['dragblock-query-objects']) window['dragblock-query-objects'] = new Object();
    if (!window['dragblock-query-objects'][type]) window['dragblock-query-objects'][type] = new Object();
    for (let obj of objects) {
        window['dragblock-query-objects'][type][obj.id] = obj;
    }
}
export const DragBlockAvaiMeta = (type, id) => {
    if (!window['dragblock-query-objects']) window['dragblock-query-objects'] = new Object();
    if (!window['dragblock-query-objects'][type]) window['dragblock-query-objects'][type] = new Object();
    if (window['dragblock-query-objects'][type][id]) return window['dragblock-query-objects'][type][id]
    DragBlockAvaiRead(type, [id]);
    return null;
}
export const DragBlockAvaiRead = (type='categories', ids) => {        
    if (!ids || ids.length === 0) return;
    if (!window['dragblock-query-loaded-ids']) window['dragblock-query-loaded-ids'] = {}
    if (!window['dragblock-query-loaded-ids'][type]) window['dragblock-query-loaded-ids'][type] = new Set();
    let DragBlockAvaiTranslate = false;
    let DragBlockAvaiMove = []
    for (let id of ids) {
        if (!window['dragblock-query-loaded-ids'][type].has(id)) {
            DragBlockAvaiTranslate = true;
            window['dragblock-query-loaded-ids'][type].add(id)
            DragBlockAvaiMove.push(id);
        }
    }
    if (!DragBlockAvaiTranslate) return;
    wp.apiFetch({        
        path: `/wp/v2/${type}?include=${DragBlockAvaiMove.join(",")}`,
    }).then((objects) => {
        DragBlockAvaiDecode(type, objects);
    })
};