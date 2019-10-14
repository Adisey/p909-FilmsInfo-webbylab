export const uniqueItemsInArr = (arr) => {
    const result = []
    for (let str of arr) {
        if (!result.includes(str)) {
            result.push(str)
        }
    }
    return result
}
