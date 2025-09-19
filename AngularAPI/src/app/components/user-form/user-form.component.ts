import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from '../../services/users';
import { IUsers } from '../../interfaces/iusers';
import { toast } from 'ngx-sonner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  userForm: FormGroup;
  isEdit: boolean = false;
  userId: string | null = null;

  constructor(
    private usersServices: Users,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Definimos el formulario con validaciones
    this.userForm = new FormGroup({
      first_name: new FormControl("", [
        Validators.required,
        Validators.minLength(2)
      ]),
      last_name: new FormControl("", [
        Validators.required,
        Validators.minLength(2)
      ]),
      username: new FormControl("", [
        Validators.required,
        Validators.minLength(4)
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.email
      ]),
      image: new FormControl("", [
        Validators.required,
        Validators.pattern(/^(http|https):\/\/[^ "]+$/) // Debe ser URL válida
      ])
    });
  }

  async ngOnInit() {
    // Verificamos si la ruta incluye un id (modo edición)
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.isEdit = true;
      try {
        const user = await this.usersServices.getById(this.userId);
        this.userForm.patchValue(user);
      } catch (error) {
        toast.error('Error cargando usuario');
        console.error(error);
      }
    }
  }

  async onSubmit() {
    if (this.userForm.invalid) {
      toast.error('Formulario inválido, revisa los campos');
      this.userForm.markAllAsTouched();
      return;
    }

    try {
      if (this.isEdit && this.userId) {
        await this.usersServices.update({ _id: this.userId, ...this.userForm.value });
        toast.success('Usuario actualizado correctamente');
      } else {
        await this.usersServices.insert(this.userForm.value as IUsers);
        toast.success('Usuario creado correctamente');
      }
      this.router.navigate(['/home']);
    } catch (error) {
      toast.error('Error guardando usuario');
      console.error(error);
    }
  }

  // Método helper para pintar errores en el template
  checkControl(controlName: string, errorName: string): boolean | undefined {
    return this.userForm.get(controlName)?.hasError(errorName) && this.userForm.get(controlName)?.touched;
  }
}
