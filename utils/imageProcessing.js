import sharp from 'sharp'
import { firebaseAdmin } from '@/lib/firebase-admin'

export const resizeImage = async (imagePath, width, height) => {
    const compressedImage = await sharp(imagePath).rotate().resize(width, height, {
        fit: 'inside',
    }).toBuffer()
    return compressedImage
}

export const uploadImage = async (imageBuffer, destinationPath, contentType, owner) => {
    const bucket = firebaseAdmin.storage().bucket();
    const response = await bucket.file(destinationPath).save(imageBuffer, {
        metadata: {
            contentType: contentType,
            metadata: {
                owner: owner
            }
        }
    })
    const makePublicResponse = await bucket.file(destinationPath).makePublic();
    const publicURL = `https://storage.googleapis.com/${bucket.name}/${destinationPath}`
    return publicURL
}