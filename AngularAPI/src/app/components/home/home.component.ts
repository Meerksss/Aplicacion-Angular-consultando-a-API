import { Component, inject } from '@angular/core';
import { Users } from '../../services/users';
import { IUsers } from '../../interfaces/iusers';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  arrUsers: IUsers[] = [];
  usersServices = inject(Users)
  router = inject(Router)
  
  ngOnInit() {
    this.cargarDatos();
  }

  async cargarDatos() {
    try {
      const response = await this.usersServices.getAll();
      console.log('Usuarios cargados', response)
      this.arrUsers = response;
    } 
    catch (msg: any) {
      toast.error('Error cargando usuarios');
      console.error(msg?.error?.error ?? msg);
    }
  }

  detalleUsuario(user: IUsers) {
    this.router.navigate(['/usuario', user._id]);
  }

  actualizarUsuario(user: IUsers) {
    this.router.navigate(['/actualizar-usuario', user._id]);
  }

  async eliminarUsuario(user: IUsers) {
    if (confirm(`¿Seguro que deseas eliminar a ${user.first_name}?`)) {
      try {
        await this.usersServices.remove(user._id);
        toast.success('Usuario eliminado correctamente');
        await this.cargarDatos();
      } catch (error) {
        toast.error('Error eliminando usuario');
        console.error(error);
      }
    }
  }

}
