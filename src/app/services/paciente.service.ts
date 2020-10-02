import { Injectable } from '@angular/core';

// Firebase
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

// Model
import { Paciente } from '../models/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  // Traer los datos de firebase
  pacienteList: AngularFireList<any>;

  // Una variable temporal, para guardar los datos seleccionados, del tipo Paciente
  selectedPaciente: Paciente = new Paciente();

  constructor(private firebase: AngularFireDatabase) { }
  // Traer todos los pacientes desde firebase 
  getPacientes() { // guarda los elementos en la varible 'pacientes'
  return this.pacienteList = this.firebase.list('pacientes');
}

// crear un nuevo producto  , recibiendo un parametro de tipo Paciente
insertPaciente(paciente: Paciente) {
  // agregar un dato al final de la lista, como recibe un objeto del tipo Paciente , puede acceder a sus propiedades
  this.pacienteList.push({
    name: paciente.name,
    dui: paciente.dui,
    mascota: paciente.mascota,
    tratamiento: paciente.tratamiento,
    medicamento: paciente.medicamento,
    visita: paciente.visita,
    costo: paciente.costo
  });
}

// Actualiza un producto, recibiendo un parametro de tipo Paciente
updatePaciente(paciente: Paciente) {
  // Utilizando el metodo update de firebase , se envia clave y los parametros que va actualizar 
  this.pacienteList.update(paciente.$key, {
    name: paciente.name,
    dui: paciente.dui,
    mascota: paciente.mascota,
    tratamiento: paciente.tratamiento,
    medicamento: paciente.medicamento,
    visita: paciente.visita,
    costo: paciente.costo
  });
}

// Elimina un producto, recibiendo como parametro la clave , utilizando el metodo remove de firebase
deletePaciente($key: string) {
  this.pacienteList.remove($key);
}

}
