import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";


@Injectable({ providedIn: 'root' })
export class HttpService {
    constructor(private http: HttpClient) {}

    method(Data: string) {

    }
}