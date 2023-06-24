import sharp from 'sharp'

export const resizeImage = async (imagePath, width, height) => {
    const compressedImage = await sharp(imagePath).rotate().resize(width, height, {
        fit: 'inside',
    }).toBuffer()
    return compressedImage
}