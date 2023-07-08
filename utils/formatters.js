export const formatUri = (uri) => {
    return stripSpaces(uri)
}

export const stripSpaces = (text) => {
    const spacesRemoved = text.replace(/\s/g, '')
    return spacesRemoved
}