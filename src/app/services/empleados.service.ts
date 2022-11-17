import { Injectable } from '@angular/core';
import { Empleado } from '../interfaces/empleado';
import { AngularFirestore, DocumentReference, DocumentChangeAction } from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  constructor(private firestore: AngularFirestore) { }

  registrarEmpleado(empleado: Empleado): Promise<DocumentReference<unknown>> {
    return this.firestore.collection('empleados').add(empleado);
  }

  obtenerEmpleados(): Observable<Empleado[]> {
    return this.firestore.collection('empleados', ref => ref.orderBy('fecha_creacion', 'desc')).snapshotChanges().pipe(
      map(data => data.map(el => ({
        ...el.payload.doc.data() as Empleado,
        id: el.payload.doc.id
        })
      ))
    );
  }

  eliminarEmpleado(id: string): Promise<void> {
    return this.firestore.collection('empleados').doc(id).delete();
  }
}
