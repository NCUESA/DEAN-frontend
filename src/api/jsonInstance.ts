import axios, { AxiosInstance, CreateAxiosDefaults, AxiosError } from "axios"
import { getJsonConfig, getMultipartConfig } from "./config";

export class JsonInstance {
    protected __instance: AxiosInstance
    public constructor(config: CreateAxiosDefaults) {
        this.__instance = axios.create(config);
        this.__instance.interceptors.request.use((request) => {
            const token = localStorage.getItem("token");
            if (token !== null)
                request.headers.Authorization = token;
            return request
        }, () => { });
        this.__instance.interceptors.response.use(async (response) => {
            return Promise.resolve(response.data);
        }, async (error: AxiosError) => {
            if (!error.response)
                return Promise.reject("伺服端錯誤");
            switch (error.response.status) {
                case 401:
                    return Promise.reject(error.response.data);
                case 403:
                    return Promise.reject("此頁面禁止訪問。");
                case 404:
                    return Promise.reject("頁面不存在。");
                case 405:
                    return Promise.reject("不被允許的HTTP請求方法。");
                case 409:
                    return Promise.reject("欲新增的資料與現存資料衝突，請在修改後重試。");
                case 422:
                    return Promise.reject("資料格式有誤，請在修改後重試。");
                case 429:
                    return Promise.reject("短時間內請求次數過多，請稍後重試。");
                case 500:
                    return Promise.reject("伺服端錯誤。");
                case 501:
                    return Promise.reject("伺服端錯誤。");
                case 502:
                    return Promise.reject("伺服端錯誤。");
                case 503:
                    return Promise.reject("伺服端錯誤。");
                case 504:
                    return Promise.reject("伺服端錯誤。");
                default:
                    return Promise.reject(error.response.data);
            }
        });
    };

    public async get<T>(url: string, params: object): Promise<T> {
        return await this.__instance.get(url, { params: params });
    };

    public async post<T, D>(url: string, data: D): Promise<T> {
        return await this.__instance.post(url, data);
    };

    public async put<T, D>(url: string, data: D): Promise<T> {
        return await this.__instance.put(url, data);
    };

    public async patch<T, D>(url: string, data: D): Promise<T> {
        return await this.__instance.patch(url, data);
    };

    public async delete<T>(url: string): Promise<T> {
        return await this.__instance.delete(url);
    };
};

export const jsonInstance = new JsonInstance(getJsonConfig());
export const multipartInstance = new JsonInstance(getMultipartConfig());