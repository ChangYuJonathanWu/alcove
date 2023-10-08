import imageCompression from 'browser-image-compression';

export const compressImage = async (imageFile) => {
    const options = {
        maxSizeMB: 3,
        useWebWorker: true
    }
    let fileToUse = imageFile
    if (fileToUse.type === "image/heic" || fileToUse.type === "image/heif") {
        console.log("Converting HEIC to JPEG")
        const heic2any = (await import("heic2any")).default;
        const blob = await heic2any({
            blob: fileToUse,
            multiple: false,
            toType: "image/jpeg",
            quality: 1
        })
        fileToUse = blob
    }
    const compressedFile = await imageCompression(fileToUse, options);
    return compressedFile
}