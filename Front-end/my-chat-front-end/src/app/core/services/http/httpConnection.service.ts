import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from '../../../env/environment';

@Injectable({ providedIn: 'root' })
export class HttpService {
    constructor(private http: HttpClient) { }

    get<T>(path: string, params?: any): Observable<T> {
        return this.http.get<T>(`${environment.apiUrl}/${path}`, { params });
    }

    post<T>(path: string, body: any): Observable<T> {
        return this.http.post<T>(`${environment.apiUrl}/${path}`, body);
    }

    put<T>(path: string, body: any): Observable<T> {
        return this.http.put<T>(`${environment.apiUrl}/${path}`, body);
    }

    delete<T>(path: string): Observable<T> {
        return this.http.delete<T>(`${environment.apiUrl}/${path}`);
    }
}