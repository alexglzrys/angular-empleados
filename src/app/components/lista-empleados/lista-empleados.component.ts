import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { Empleado } from '../../interfaces/empleado';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styles: [
  ]
})
export class ListaEmpleadosComponent implements OnInit {

  empleados: Empleado[] = [];

  constructor(private empleadosService: EmpleadosService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.empleadosService.obtenerEmpleados().subscribe(empleados => this.empleados = empleados);
  }

  eliminarEmpleado(id: string) {
    this.empleadosService.eliminarEmpleado(id).then(res => {
      this.toastr.success('Empleado eliminado del sistema', 'Empleados IT', {positionClass: 'toast-bottom-right'});
    }).catch(err => {
      this.toastr.error('Se ha detectado un error inesperado', 'Empleados IT', {positionClass: 'toast-bottom-right'});
    })
  }

}
