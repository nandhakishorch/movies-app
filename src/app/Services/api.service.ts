import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(public httpClient: HttpClient) {
    }

    public get(url: string, params?: any): Observable<any> {
        return this.httpClient.get(url, params);
    }

    // public post(url: string, request: any, httpoptions?: any): Observable<any> {
    //     return this.httpClient.post(url, request, httpoptions);
    // }

    // public put(url: string, request: any, httpoptions?: any): Observable<any> {
    //     return this.httpClient.put(url, request, httpoptions);
    // }

    // public delete(url: string, httpoptions?: any): any {
    //     return this.httpClient.delete(url, httpoptions);
    // }
}