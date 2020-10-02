import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'

const url="https://localhost:44323/api/";

@Injectable({
  providedIn: 'root'
})
export class CnnService {

  constructor( private http : HttpClient) {}

    VerTrunos (){

      return this.http.get(url + 'prueba')
    
   }
}
