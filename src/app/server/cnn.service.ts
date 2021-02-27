import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'

const url="https://localhost:44323/api/";

@Injectable({
  providedIn: 'root'
})
export class CnnService {

  constructor( private http : HttpClient) {}

   VerAlumnos(){  
    return this.http.get(url + 'prueba/alumno') 
   }
   VerMateria(){  
    return this.http.get(url + 'prueba/materia') 
   }
   VerProfesores(){  
    return this.http.get(url + 'prueba/profesor') 
   }
   
   Veralumn(){  
    return this.http.get(url + 'prueba/alumnos') 
   }
   VerDocentes(){  
    return this.http.get(url + 'prueba/docentes') 
   }

   Insert ( g ){
    return this.http.post(url + 'prueba/AddAlumn/', g)
   }

   InsertProfesor ( p ){
    return this.http.post(url + 'prueba/AddProfesor/', p)
   }
   InsertAsignatura( a ){
    return this.http.post(url + 'prueba/AddMateria/', a)
   }

   UpdAlumno ( x , y){
    let zelda = `${url}alumno/${x}/`;
    return this.http.put( zelda, y )
   }
 
   eliminar (x){
    return this.http.delete(url + 'prueba/ElimnarCliente/', {params:{'identificacion':x.identificacion}})
   }

}
