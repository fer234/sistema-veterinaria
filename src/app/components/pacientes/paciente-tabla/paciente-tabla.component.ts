import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

//Service
import { PacienteService } from '../../../services/paciente.service';
import {Paciente} from '../../../models/paciente';

@Component({
  selector: 'app-paciente-tabla',
  templateUrl: './paciente-tabla.component.html',
  styleUrls: ['./paciente-tabla.component.css']
})
export class PacienteTablaComponent implements OnInit {

  // Arreglo para almacenar la informacion que se obtenga de la base de datos de firebase
  pacienteList: Paciente[];
  filtro:string;

  constructor(
    private pacienteService: PacienteService) {this.downloadPDF();}
     
     public downloadPDF(): void {
      var data = document.getElementById('htmlData');  //Id of the table
      html2canvas(data).then(canvas => {  
        // Few necessary setting options  
        let imgWidth = 208;   
        let pageHeight = 295;    
        let imgHeight = canvas.height * imgWidth / canvas.width;  
        let heightLeft = imgHeight;  
  
        const contentDataURL = canvas.toDataURL('image/png')  
        let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
        let position = 0;  
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
        pdf.save('Factura.pdf'); // Generated PDF   
      }); 
    }

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

    buscar(){
      this.pacienteList = this.pacienteList.filter(res=>{
        return res.name.toLocaleLowerCase().match(this.filtro.toLocaleLowerCase());
      })
    }

}
