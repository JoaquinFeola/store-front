import { AxiosResponse } from "axios";

export interface ApiResponse<T = null> extends AxiosResponse {
    data: ApiResponseBody<T>
};

export interface ApiResponseBody<T = null> {
    errors: null | string[];
    data: T;
    hasError: boolean;
    message: string;
    statusCode: number;
    traceId: null | number;
} 