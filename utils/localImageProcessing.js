import imageCompression from 'browser-image-compression';

export const compressImage = async (imageFile) => {
    const options = {
        maxSizeMB: 4,
        useWebWorker: true
    }
    const compressedFile = await imageCompression(imageFile, options);
    return compressedFile
}