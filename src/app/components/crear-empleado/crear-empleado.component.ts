import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpleadosService } from '../../services/empleados.service';

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styles: [
  ]
})
export class CrearEmpleadoComponent implements OnInit {

  createForm: FormGroup;

  constructor(private fb: FormBuilder,
              private empleadosService: EmpleadosService,
              private router: Router) {
    this.createForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      documento: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      salario: ['', [Validators.required, Validators.min(0)]]
    })
  }

  ngOnInit(): void {
  }

  registrarEmpleado() {
    if (this.createForm.valid) {
      const date = new Date();

      const infoEmpleado = {
        ...this.createForm.value,
        fecha_creacion: date,
        fecha_actualizacion: date
      }

      this.empleadosService.registrarEmpleado(infoEmpleado).then(res => {
        console.log(res)
        this.router.navigate(['/']);
      }).catch(err => {
        console.log(err)
      })
    }
  }

}
