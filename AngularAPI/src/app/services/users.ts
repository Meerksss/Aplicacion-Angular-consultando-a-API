import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUsers } from '../interfaces/iusers';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Users {
  private endPoint: string = 'https://peticiones.online/users';
  private httpClient = inject(HttpClient);

  // Método para obtener todos los usuarios
  getAll() {
    return lastValueFrom(this.httpClient.get<IUsers[]>(this.endPoint));
  }

  // Método para obtener un usuario por su ID
  getById(idUser: number) {
    return lastValueFrom(this.httpClient.get<IUsers>(`${this.endPoint}/${idUser}`))
  }

  // Método para crear un nuevo usuario
  insert(user: IUsers): Promise<IUsers>{
    return lastValueFrom(this.httpClient.post<IUsers>(this.endPoint, user));
  }

  // Método para editar un usuario existente
  update(user: IUsers): Promise<IUsers>{
    let {_id, ...restUser } = user;
    return lastValueFrom(this.httpClient.put<IUsers>(`${this.endPoint}/${_id}`, restUser))
  }

  // Método para eliminar un usuario por su ID
  remove(idUser: string) : Promise<IUsers>{
    return lastValueFrom(this.httpClient.delete<IUsers>(`${this.endPoint}/${idUser}`));
  }
}
