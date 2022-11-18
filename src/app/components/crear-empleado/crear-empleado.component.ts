import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadosService } from '../../services/empleados.service';
import { ToastrService } from 'ngx-toastr';
import { Empleado } from '../../interfaces/empleado';


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
  id: string | null = null;
  //empleado: Empleado | null = null;
  title: string = 'Registrar Empleado';
  titleButton: string = 'Registrar';

  constructor(private fb: FormBuilder,
              private empleadosService: EmpleadosService,
              private router: Router,
              private toastr: ToastrService,
              private activatedRouter: ActivatedRoute) {
    this.createForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      documento: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      salario: ['', [Validators.required, Validators.min(0)]]
    })
    // Recuperar parametro de ruta si se trata de una actualización
    this.activatedRouter.params.subscribe(({id}) => this.id = id)
  }

  ngOnInit(): void {
    this.obtenerDatosEmpleado();
  }

  procesarFormulario() {
    if (this.createForm.valid) {
      this.loading = true;
      this.submitted = true;

      const date = new Date();

      const infoEmpleado = {
        ...this.createForm.value,
        fecha_creacion: date,
        fecha_actualizacion: date
      }

      if (!this.id)
        this.registrar(infoEmpleado)
      else
        this.actualizar(infoEmpleado)

    }
  }

  registrar(empleado: Empleado) {
    this.empleadosService.registrarEmpleado(empleado).then(res => {
      this.loading = false;
      this.toastr.success('Empleado registrado correctamente en el sistema', 'Empleados IT', { positionClass: 'toast-bottom-right'});
      this.router.navigate(['/']);
    }).catch(err => {
      this.loading = false;
      this.toastr.error('Ocurrió un error inesperado, favor de intentar mas tarde', 'Empleados IT', {positionClass: 'toast-bottom-right'});
      console.log(err)
    })
  }

  actualizar(empleado: Empleado) {
    this.empleadosService.actualizarEmpleado(this.id!, empleado).then(res => {
      this.loading = false;
      this.toastr.success('Empleado actualizado correctamente en el sistema', 'Empleados IT', { positionClass: 'toast-bottom-right'});
      this.router.navigate(['/']);
    }).catch(err => {
      this.loading = false;
      this.toastr.error('Ocurrió un error inesperado, favor de intentar mas tarde', 'Empleados IT', {positionClass: 'toast-bottom-right'});
      console.log(err)
    })
  }

  obtenerDatosEmpleado() {
    if (this.id) {
      this.loading = true;
      this.title = 'Editar Empleado';
      this.titleButton = 'Editar'
      this.empleadosService.buscarEmpleadoPorId(this.id).subscribe(docRef => {
        this.createForm.patchValue(docRef.data())
        this.loading = false;
      })
    }
  }

}
