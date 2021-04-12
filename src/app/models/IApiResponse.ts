import { IPagination } from './IPagination';

export interface IApiSuccess {
    statusCode: number;
    message: string;
    data: any;
    meta?: IPagination;
    options?: any;
}

export interface IApiError {
    status: string;
    message: string;
    error_type: string;
    code: number;
    errors: string;
}

export interface IPaginatedData {
    docs: any[];
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage: number;
    page: number;
    pagingCounter: number;
    prevPage: number;
    totalDocs: number;
    totalPages: number;
}
