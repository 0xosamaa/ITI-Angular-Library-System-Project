import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next:HttpHandler) : Observable<HttpEvent<any>> {
    // const token = localStorage.getItem("token");
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQmFzaWNBZG1pbiIsImlhdCI6MTY4MDg1MTU0NywiZXhwIjoxNjgwODgwMzQ3fQ.F9jGah4lE7RIUnzGyJEttK7sGnqFO-N4YkoZLPymujs"
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + token)
      });
      return next.handle(cloned);
    }
    else {
      return next.handle(req);
    }
  }
}
