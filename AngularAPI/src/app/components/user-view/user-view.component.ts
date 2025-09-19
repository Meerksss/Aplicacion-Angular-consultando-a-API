import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from '../../services/users';
import { IUsers } from '../../interfaces/iusers';
import { toast } from 'ngx-sonner';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent {
  user!: IUsers;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersServices: Users
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      try {
        this.user = await this.usersServices.getById(id);
      } catch (error) {
        toast.error('Error cargando usuario');
        console.error(error);
      }
    }
  }

  retroceder() {
    this.router.navigate(['/home']);
  }

  actualizarUsuario(user: IUsers) {
    this.router.navigate(['/actualizar-usuario', user._id]);
  }

  async eliminarUsuario(user: IUsers) {
  const result = await Swal.fire({
    title: `¿Quieres eliminar a ${user.first_name}?`,
    text: '¡No podrás revertir esto!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  });

  if (result.isConfirmed) {
    try {
      await this.usersServices.remove(user._id);
      toast.success('Usuario eliminado correctamente');
      this.router.navigate(['/home']);
    } catch (error) {
      toast.error('Error eliminando usuario');
      console.error(error);
    }
  }
}
}
