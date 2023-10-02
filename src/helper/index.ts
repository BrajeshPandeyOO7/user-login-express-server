export const sendError = (data:any) => {
    return {
        error: data
    }
}

export const sendResponse = (data:any) => {
    return {
        ok: !!data,
        data: data
    }
}