import { AxiosResponse } from "axios";

export interface ApiResponse<T = null> extends AxiosResponse {
    data: ApiResponseBody<T>
};

interface ApiResponseBody<T = null> {
    errors: null | boolean;
    data: T;
    hasError: boolean;
    message: string;
    statusCode: number;
    traceId: null | number;
} 