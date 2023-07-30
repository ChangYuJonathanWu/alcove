export const formatUri = (uri) => {
    if (!uri) return ""
    return stripSpaces(uri)
}

export const stripSpaces = (text) => {
    const spacesRemoved = text ? text.replace(/\s/g, '') : ""
    return spacesRemoved
}

export const trimSpaces = (text) => {
    const spacesTrimmed = text ? text.trim() : ""
    return spacesTrimmed
}

export const isValidUrl = urlString=> {
    try { 
        return Boolean(new URL(urlString)); 
    }
    catch(e){ 
        return false; 
    }
}

export const isValidUrlWithoutProtocol = urlString => {
    return isValidUrl("https://" + urlString) || isValidUrl(urlString)
}