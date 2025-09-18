import { Component, inject } from '@angular/core';
import { IUsers } from '../../interfaces/iusers';
import { Users } from '../../services/users';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // arrUsuarios: IUsers[] = []
  // usersServices = inject(Users);
// 
  // ngOnInit() {
  //   this.cargarData()
  // }
// 
  // async cargarData() {
  //   // Lleno el array de empleados llamando al servicio y pidiendole todos los ampleados: getAll()
  //   try {
  //     const response = await this.usersServices.getAll();
  //     console.log(response)
  //     this.arrUsuarios = response;
  //   }
  //   catch (msg: any) {
  //     alert(msg.error.error)
  //   }
  // }
// 
  // getAlertDelete(event: string) {
  //   this.cargarData()
  //   // Si quiero puedo añadir un mensaje de aviso con TOAST
  //   toast.error(event)
  // }
}
