import { CreateAxiosDefaults } from 'axios'

export const getJsonConfig = (): CreateAxiosDefaults => {
    return {
        baseURL: import.meta.env.VITE_BACKEND_URL,
        timeout: import.meta.env.VITE_BACKEND_TIMEOUT,
        headers: {
            "Content-Type": "application/json",
        },
    }
}

export const getMultipartConfig = (): CreateAxiosDefaults => {
    return {
        baseURL: import.meta.env.VITE_BACKEND_URL,
        timeout: import.meta.env.VITE_BACKEND_TIMEOUT,
        headers: {
            "Content-Type": "multipart/formdata",
        },
    }
}

