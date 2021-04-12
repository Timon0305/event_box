import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Params } from '@angular/router';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-token',
    }),
};

@Injectable({
    providedIn: 'root'
})

export class RequestService {

    private readonly baseUrl: string;

    constructor(
        readonly httpClient: HttpClient) {
        this.baseUrl = environment.baseApiURL;
    }

    public get<T>(endPoint: string, params = {}) {
        return this.httpClient.get<T>(`${this.baseUrl}${endPoint}`, { params });
    }
    public getWithParams<T>(endPoint: string, params?: Params) {
        return this.httpClient.get<T>(`${this.baseUrl}${endPoint}`, { params });
    }
    public post<T>(endPoint: string, data: object | string, formData = false) {
        if (formData) {
            return this.httpClient.post<T>(`${this.baseUrl}${endPoint}`, data, {});
        }
        return this.httpClient.post<T>(`${this.baseUrl}${endPoint}`, data);
    }

    public put<T>(endPoint: string, data?: object) {
        return this.httpClient.put<T>(`${this.baseUrl}${endPoint}`, data);
    }

    public delete<T>(endPoint: string) {
        return this.httpClient.delete<T>(`${this.baseUrl}${endPoint}`);
    }

    public deleteWithBody<T>(endPoint: string, data: object) {
        return this.httpClient.request<T>('delete', `${this.baseUrl}${endPoint}`, { body: data });
    }

    public patch<T>(endPoint: string, data?: object) {
        return this.httpClient.patch<T>(`${this.baseUrl}${endPoint}`, data);
    }
}
