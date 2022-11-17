import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpleadosService } from '../../services/empleados.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styles: [
  ]
})
export class CrearEmpleadoComponent implements OnInit {

  createForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;

  constructor(private fb: FormBuilder,
              private empleadosService: EmpleadosService,
              private router: Router,
              private toastr: ToastrService) {
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
      this.loading = true;
      this.submitted = true;

      const date = new Date();

      const infoEmpleado = {
        ...this.createForm.value,
        fecha_creacion: date,
        fecha_actualizacion: date
      }

      this.empleadosService.registrarEmpleado(infoEmpleado).then(res => {
        this.loading = false;
        this.toastr.success('Empleado registrado correctamente en el sistema', 'Empleados IT', { positionClass: 'toast-bottom-right'});
        this.router.navigate(['/']);
      }).catch(err => {
        this.loading = false;
        this.toastr.error('Ocurrió un error inesperado, favor de intentar mas tarde', 'Empleados IT', {positionClass: 'toast-bottom-right'});
        console.log(err)
      })
    }
  }

}
