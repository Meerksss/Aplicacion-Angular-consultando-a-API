import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUsers, IError } from '../interfaces/iusers';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Users {
  private endPoint: string = "https://peticiones.online/api/users";
  private httpClient = inject(HttpClient);

  // Método para obtener todos los usuarios
  getAll(): Promise<IUsers[]> {
  return lastValueFrom(
    this.httpClient.get<{ results: IUsers[] }>(this.endPoint)
  ).then(res => res.results);
}
    // return lastValueFrom(this.httpClient.get<IUsers[]>(this.endPoint));

  // Método para obtener un usuario por su ID
  getById(_idUser: string): Promise<IUsers> {
    return lastValueFrom(this.httpClient.get<IUsers>(`${this.endPoint}/${_idUser}`))
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
  remove(_idUser: string) : Promise<IUsers | IError>{
    return lastValueFrom(this.httpClient.delete<IUsers>(`${this.endPoint}/${_idUser}`));
  }
}
