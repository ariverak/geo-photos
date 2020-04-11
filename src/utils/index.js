export const getThumbnailSize = ({width,height}) => {
    let minWidth = (width % height > 150) ? 315 : (width % height > 700) ? 450 : 280;
    let minHeight = 180;
    let ratio = width / height;
    let orientation = width > height ? 'landscape' : 'portrait';
    let diff = width - minHeight;
    let _width = orientation === 'landscape' ? (minWidth + diff * 0.05) : (ratio * minHeight + diff * 0.05);
    let _height = orientation === 'landscape' ? minHeight : ratio * minWidth;
    return { width: Math.abs(_width).toFixed(0), height: Math.abs(_height).toFixed(0) }
}