import { Component, OnInit } from '@angular/core';
import {Paciente} from '../../../models/paciente';


// service
import { PacienteService } from '../../../services/paciente.service';

// toastr
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-paciente-list',
  templateUrl: './paciente-list.component.html',
  styleUrls: ['./paciente-list.component.css']
})
export class PacienteListComponent implements OnInit {

  // Arreglo para almacenar la informacion que se obtenga de la base de datos de firebase
  pacienteList: Paciente[];

  constructor(
    private pacienteService: PacienteService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    return this.pacienteService.getPacientes()
      .snapshotChanges().subscribe(item => {
        this.pacienteList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.pacienteList.push(x as Paciente);
        });
      });
  }
 /* 
   Recibe una varible de tipo 'Product' para invocar el servicio de firebase, para actualizarlo
   Para no ocupar el doble enlace de datos ' [(ngModel)]' , se va utilizar 'Object.assign({}, product)'  
  */
 onEdit(paciente: Paciente) {
  this.pacienteService.selectedPaciente = Object.assign({}, paciente);
}

/* 
 Recibe la llave '$key' para eliminar el registro, invocando el metodo 'deleteProduct' del servicio de firebase
 ademas muestra un 'warning' con toastr
*/
onDelete($key: string) {
  if (confirm('Are you sure you want to delete it?')) {
    this.pacienteService.deletePaciente($key);
    this.toastr.warning('Deleted Successfully', 'Paciente Removed');
  }
}

}
