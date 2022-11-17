import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { Empleado } from '../../interfaces/empleado';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styles: [
  ]
})
export class ListaEmpleadosComponent implements OnInit {

  empleados: Empleado[] = [];

  constructor(private empleadosService: EmpleadosService) { }

  ngOnInit(): void {
    this.empleadosService.obtenerEmpleados().subscribe(empleados => this.empleados = empleados);
  }

}
