import { Injectable } from '@angular/core';
import { Empleado } from '../interfaces/empleado';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore'

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  constructor(private firestore: AngularFirestore) { }

  registrarEmpleado(empleado: Empleado): Promise<DocumentReference<unknown>> {
    return this.firestore.collection('empleados').add(empleado);
  }
}
