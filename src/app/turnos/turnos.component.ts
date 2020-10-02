import { Component, OnInit } from '@angular/core';
import { CnnService } from '../server/cnn.service';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {
  
  ListaTurnos:any;
  fechaini :any;
  fechaFin :any;
  servicio : any;


  constructor( private cnn: CnnService) { }

  ngOnInit(): void {
    this.verTurnos();
  }
 
  verTurnos (){
   
    this.cnn.VerTrunos().subscribe( z => {
      this.ListaTurnos = z
      console.log()
    });

  }
  generar (){

  }

}
