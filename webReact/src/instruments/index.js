export const uniqueItemsInArr = (arr) => {
    const result = []
    for (let str of arr) {
        if (!result.includes(str)) {
            result.push(str)
        }
    }
    return result
}

export const fileBlob2Base64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
    })
}
