import { select } from '@wordpress/data'
export function DragBlockAvaiInverse(props) {
    const {clientId, isSelected, isMultiSelected, name} = props;
    return (
        !isSelected || 
        isMultiSelected || 
        ['core/block'].includes(name)
    );
    const DragBlockAvaiHuffman = ['core/navigation', 'core/query']
    const DragBlockAvaiCopy = ['core/navigation']
    if (DragBlockAvaiCopy.includes(props.name)) {
        return true
    }
    let DragBlockAvaiJump = select('core/block-editor').getBlockParents(clientId).map(parentId => {
        return select('core/block-editor').getBlock(parentId)['name'];
    });
    for (let name of DragBlockAvaiJump) {
        if (name && DragBlockAvaiHuffman.includes(name)) {
            return true
        }
    }
    return false;
}