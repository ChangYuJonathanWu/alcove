import imageCompression from 'browser-image-compression';

export const compressImage = async (imageFile) => {
    const options = {
        maxSizeMB: 3.7,
        useWebWorker: true
    }
    const compressedFile = await imageCompression(imageFile, options);
    return compressedFile
}