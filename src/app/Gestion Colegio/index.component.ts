import { Component, OnInit , ViewChild} from '@angular/core';
import { from } from 'rxjs';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { CnnService } from '../server/cnn.service';
import {MatTabsModule} from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { MatMenuModule  } from '@angular/material/menu';
import * as Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import { PdfMakeWrapper, Txt } from 'pdfmake-wrapper';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
//import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake

// Set the fonts to use
//PdfMakeWrapper.setFonts(pdfFonts);


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

export class indexComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  FAsigatura : FormGroup;
  FAlumno: FormGroup;
  FProfesor: FormGroup;
  setAlumno : FormGroup;
  ListaAlumno:any;
  ListaMateria : any;
  ListaProfesor:any;
  getAlumnos:any;
  getDocentes:any;
  fechaini :any;
  fechaFin :any;
  servicio : any;
  mostrarUno : boolean;
  mostrarDos : boolean;
  mostrartres: boolean;
  VerBotonEditar : boolean=false;
  IdAlumnoEdi : number;
  materiaselect : any;
  Alumnoselect : any;
  Docenteselect : any;
  MostrarDocentes : boolean;
  MostrarAlumnos: boolean;
  MostrarNotas : boolean;

  constructor( private cnn: CnnService) { }

  ngOnInit(): void {
    this.FromInit();
    this.FromInitp();
    this.verAlumn();
    this.verAlun();
    this.verDocentes();
    this.verMaterias();
    this.FromInitasig();
    this.VerProf();
  }

  limpiar(){
    this.FAlumno.reset({
      numeroIdentificacion : '',    
      nombres : '',
      apellidos :'',
      direccion : '',
      telefono : '',
   });
  }
 
  verAlumn(){
    this.cnn.VerAlumnos().subscribe( z => {
      this.ListaAlumno = z
      console.log()
    }); 
  }
  verMaterias(){
     this.cnn.VerMateria().subscribe( z => {
       this.ListaMateria = z
       console.log()
     }); 
   }
   verAlun(){
     this.cnn.Veralumn().subscribe( z => {
       this.getAlumnos = z
       console.log()
     }); 
   }
   verDocentes(){
     this.cnn.VerDocentes().subscribe( z => {
       this.getDocentes = z
       console.log()
     }); 
   }

  VerProf(){
    this.cnn.VerProfesores().subscribe( z => {
      this.ListaProfesor = z
      console.log()
    });
  }

  FromInit (){
    this.FAlumno = new FormGroup({
      numeroIdentificacion :new FormControl(''),    
      nombres : new FormControl(''),
      apellidos : new FormControl(''),
      direccion : new FormControl(''),
      telefono : new FormControl(''),
      
  });
 }
 FromInitp (){
  this.FProfesor = new FormGroup({
    nombres : new FormControl(''),
    apellidos : new FormControl(''),
    direccion : new FormControl(''),
    telefono : new FormControl(''),
});
}
FromInitasig(){
  this.FAsigatura = new FormGroup({
    NombreMateria : new FormControl('')
});
}

  MostrarContenido (x){ 
    if (x == 1){
      this.limpiar();
      this.mostrarUno = true;
      this.mostrarDos = false;
      this.mostrartres = false;
    }
    else if (x == 2){
      this.mostrarDos = true;
      this.mostrarUno = false;
      this.mostrartres = false;
    }
    else {
      this.mostrartres = true;
      this.mostrarDos = false;
      this.mostrarUno = false;
    }
  }

  GuardaAlumno(){
    let g = Object.assign({},this.FAlumno.value)
    console.log(g)
    this.cnn.Insert( g ).subscribe( x => {
      console.log(x);
      this.closebutton.nativeElement.click();
      this.verAlumn();
      this.verAlun();
    })   
    this.verAlumn();
 }

 GuardaProfesor(){
  let g = Object.assign({},this.FProfesor.value)
  console.log(g)
  this.cnn.InsertProfesor( g ).subscribe( x => {
    console.log(x);
    this.verDocentes();
    this.closebutton.nativeElement.click();
    this.VerProf();
  })   
  this.VerProf();
}

GuardaAsignatura(){
  let g = Object.assign({},this.FAsigatura.value)
  console.log(g)
  this.cnn.InsertAsignatura( g ).subscribe( x => {
    console.log(x);
    this.verMaterias();
    this.closebutton.nativeElement.click();
  })   
}
verEdiAlumno (x){
  this.IdAlumnoEdi = x.idAlumno
  this.FAlumno.reset({
    idAlumno : x.idAlumno,
    numeroIdentificacion : x.numeroIdentificacion,    
    nombres : x.nombres,
    apellidos : x.apellidos,
    direccion : x.direccion,
    telefono : x.telefono,
 });
 this.VerBotonEditar = true;
}

EditAlumno(){
 let g = Object.assign({},this.FAlumno.value)
  this.cnn.UpdAlumno(this.IdAlumnoEdi , g).subscribe( x => {
    console.log(x);
    this.closebutton.nativeElement.click();
    this.verAlumn();      
  })   
}

 eliminar (identificacion){
  this.cnn.eliminar(identificacion.identificacion).subscribe( x => {
    if (x){
      console.log(x);
      this.verAlumn();      
    }
    else{
      alert("Error al eliminar" + identificacion)
    }
  })   
 }

 GenerarReporte(){
  const pdf = new PdfMakeWrapper();
  pdf.add(
    'Hello world!'
  );
  pdf.create().open();
 }

AsignarDocente(z){
   if (z == 1){
    this.MostrarDocentes = true;
    this.MostrarAlumnos = false;
    this.MostrarNotas = false;
  }

}
AsignarAlumn (z){
  if (z == 2){
    this.MostrarAlumnos = true;
    this.MostrarDocentes = false;
    this.MostrarNotas = false;
  }
}
AsignarNotas (z){
  if (z == 3){
    this.MostrarNotas = true;
    this.MostrarDocentes = false;
    this.MostrarAlumnos = false;
 
  }
  }
}

