import { isString } from "lodash";
export function dragBlockLinkedBorder2CSS(obj, side = '') {
    const { width, style, color } = obj;
    let CSS = '';
    if (side) side = side + '-';
    if (width) CSS += 'border-' + side + 'width:' + width + ';';
    CSS += 'border-' + side + 'style:' + (style ? ' ' + style : ' solid') + ';';
    if (color) CSS += 'border-' + side + 'color:' + dragBlockColorNameVariable(color) + ';';
    return CSS;
}
export function dragBlockBorder2CSS(obj) {
    if (!obj) return '';
    let css = '';
    if ('top' in obj) {
        for (let side in obj) {
            let DragBlockAvai = dragBlockLinkedBorder2CSS(obj[side]);
            if (!DragBlockAvai) continue;
            css += dragBlockLinkedBorder2CSS(obj[side], side)
        }
    } else {
        css = dragBlockLinkedBorder2CSS(obj);
    }
    return css;
}
export function dragBlockObj2CSS(obj) {
    if (!obj) return '';
    let css = Object.keys(obj).map((key) => key + ':' + obj[key]).join(';');
    if (css) css += ';';
    return css;
}
export function dragBlockColorNameVariable(value) {
    if (value.indexOf('#') !==-1) return value;
    return 'var(--wp--preset--color--' + value + ')';
}
const DragBlockAvaiTriplet = 'var(--wp--style--global--content-size)';
const DragBlockAvaiEncode = 'var(--wp--style--global--wide-size)';
export function dragBlockMatchingSizes({ value, contentSize, wideSize }) {
    if (!value || !isString(value)) return value;
    value = value.split(' ').map(v => {
        if (v === contentSize) {
            return DragBlockAvaiTriplet
        }
        if (v === wideSize) {
            return DragBlockAvaiEncode
        }
        return v
    }).join(' ');
    return value;
}
export function dragBlockUnmatchingSizes({ value, contentSize, wideSize }) {
    if (!value || !isString(value)) return value;
    return value.split(' ').map(v => {
        if (v === DragBlockAvaiTriplet) return contentSize
        if (v === DragBlockAvaiEncode) return wideSize
        return v
    }).join(' ')
}
const DragBlockAvaiFrom = '{c=';
const DragBlockAvaiPrefix = '}';
export function dragBlockMatchingColors({ value, colors }) {
    if (!value || !isString(value)) return value;
    value = value.split(' ').map(v => {
        if (v.indexOf('#') !== 0) return v;
        let DragBlockAvaiManage = v.substring(7).toLowerCase();
        let DragBlockAvaiReset = v.substring(0, 7).toLowerCase();
        for (let color of colors) {
            let DragBlockAvaiFonts = color.color.toLowerCase();
            let DragBlockAvaiFlatfonts = DragBlockAvaiFonts.substring(0, 7);
            if (DragBlockAvaiReset+DragBlockAvaiManage === DragBlockAvaiFonts) {
                return DragBlockAvaiFrom + (color.slug) + DragBlockAvaiPrefix;
            }
            if (DragBlockAvaiReset === DragBlockAvaiFlatfonts) {
                return DragBlockAvaiFrom + (color.slug) + '@' + DragBlockAvaiPrefix + DragBlockAvaiManage;
            }
        }
        return v;
    }).join(' ');
    return value;
}
export function dragBlockUnmatchingColors({ value, colors }) {
    if (!value || !isString(value)) return value;
    return value.split(' ').map(v => {
        if (v.indexOf(DragBlockAvaiFrom) !== 0) return v
        v = v.split(DragBlockAvaiPrefix);
        if (v.length <= 2) {
            let DragBlockAvaiManage = (v.length === 2 ? v[1] : '')
            let DragBlockAvaiVariants = v[0].substring(DragBlockAvaiFrom.length);
            for (let color of colors) {
                if (DragBlockAvaiVariants === color.slug) {
                    return color.color;                    
                }
                if (DragBlockAvaiVariants === color.slug+'@') {
                    return color.color.substring(0, 7) + DragBlockAvaiManage;
                }
            }
        }
        return v.join(DragBlockAvaiPrefix);
    }).join(' ')
}
export function dragBlockMatchingBorderColors({ value, colors }) {
    if (!value) return value;
    let DragBlockCond = new Object();
    if ('top' in value) {
        for (let side in value) {
            if (typeof (value[side]) !=='object') continue;
            DragBlockCond[side] = new Object();
            DragBlockCond[side]['width'] = value[side]['width'];
            DragBlockCond[side]['style'] = value[side]['style'];
            DragBlockCond[side]['color'] = dragBlockMatchingColors({ value: value[side]['color'], colors });
        }
    }
    else {
        DragBlockCond['color'] = dragBlockMatchingColors({ value: value['color'], colors });
        DragBlockCond['width'] = value['width'];
        DragBlockCond['style'] = value['style'];
    }
    return DragBlockCond;
}
export function dragBlockUnmatchingBorderColors({ value, colors }) {
    if (!value) return value;
    let DragBlockCond = new Object();
    if ('top' in value) {
        for (let side in value) {
            if (typeof (value[side]) !=='object') continue;
            DragBlockCond[side] = new Object();
            DragBlockCond[side]['width'] = value[side]['width'];
            DragBlockCond[side]['style'] = value[side]['style'];
            DragBlockCond[side]['color'] = dragBlockUnmatchingColors({ value: value[side]['color'], colors });
        }
    }
    else {
        DragBlockCond['color'] = dragBlockUnmatchingColors({ value: value['color'], colors });
        DragBlockCond['width'] = value['width'];
        DragBlockCond['style'] = value['style'];
    }
    return DragBlockCond;
}
export function DragBlockAvaiTotal(hex) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
        g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
        b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    return '#' + DragBlockAvaiVariant(r) + DragBlockAvaiVariant(g) + DragBlockAvaiVariant(b);
}
export function dragBlockShadowValue({ inset, x, y, blur, spread, color }) {
    let value = (inset ? 'inset' : '');
    value += (value ? ' ' : '') + x + (y ? ' ' + y : '') + (blur ? ' ' + blur : '')
        + (spread ? ' ' + spread : '') + (color ? ' ' + color : '');
    return value;
}
function DragBlockAvaiVariant(str) {
    if (str.len < 2) return '0' + str
    return str;
}