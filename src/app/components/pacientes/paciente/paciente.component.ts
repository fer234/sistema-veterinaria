import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

//  Service 
import { PacienteService } from '../../../services/paciente.service';
// Class
import { Paciente } from '../../../models/paciente';
// toastr
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  constructor(
    public pacienteService: PacienteService,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.pacienteService.getPacientes();
    this.resetForm();
  }

  // Recibe un formulario del tipo NgForm, lo envia a guardar o actualizar , invocando el servicio Firebase
  // lo termina limpiando resetForm
  onSubmit(pacienteForm: NgForm) {
    if (pacienteForm.value.$key == null)
      this.pacienteService.insertPaciente(pacienteForm.value);
    else
      this.pacienteService.updatePaciente(pacienteForm.value);

    this.resetForm(pacienteForm);
    this.toastr.success('Sucessful Operation', 'Paciente Registered');
  }

  // Para limpiar el formulario
  resetForm(pacienteForm?: NgForm) {
    if (pacienteForm != null)
      pacienteForm.reset();
    this.pacienteService.selectedPaciente = new Paciente();
  }

}
