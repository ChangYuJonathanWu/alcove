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

export const truncateString = (str, num) => {
    const trimmed = trimSpaces(str)
    if (trimmed.length <= num) {
      return trimmed
    }
    return trimmed.slice(0, num) + '...'
  }

export const isValidUrlWithoutProtocol = urlString => {
    return isValidUrl("https://" + urlString) || isValidUrl(urlString)
}