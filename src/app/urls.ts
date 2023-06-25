import { HttpHeaders } from "@angular/common/http";

export const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-type': 'application/json; charset=utf-8',
    // 'Content-type': 'multipart/form-data; boundary=True',
  })
};

export const BASE_URL: string = "http://localhost:8000/";
export const SUPERMARKET_URL: string = "api/v1/";
export const BASE_SUPERMARKET_URL = BASE_URL + SUPERMARKET_URL;
