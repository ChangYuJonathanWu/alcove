import imageCompression from 'browser-image-compression';
import filetype from 'magic-bytes.js'


export const compressImage = async (imageFile, onCompleteCallback, onErrorCallback) => {
    const options = {
        maxSizeMB: 3,
        useWebWorker: true
    }
    let fileToUse = imageFile

    const fileReader = new FileReader();

    fileReader.onloadend = async (f) => {
        try{
            const bytes = new Uint8Array(f.target.result);
            const actualImageTypes = await filetype(bytes)
    
            let actualImageType;
    
            if(actualImageTypes.length) {
                actualImageType = actualImageTypes[0].typename
            } else {
                actualImageType = ""
            }
            console.log(actualImageType)
            if (actualImageType === "heic" || actualImageType === "heif") {
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
            onCompleteCallback(compressedFile)
        } catch(e) {
            console.error(e)
            onErrorCallback()
        }
    }
    fileReader.readAsArrayBuffer(fileToUse);
}