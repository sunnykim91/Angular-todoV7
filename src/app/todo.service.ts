import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Todo } from './types/todo.interface';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  appUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll() {
    const params = new HttpParams()
      .set('_sort', 'id')
      .set('_order', 'desc');

    return this.http.get<Todo[]>(this.appUrl, { params });
  }

  create(todo: Todo) {
    return this.http.post<Todo[]>(this.appUrl, todo);
  }

  remove(id: number) {
    return this.http.delete<Todo[]>(`${this.appUrl}/${id}`);
  }

  toggle(id: number, completed: boolean) {
    return this.http.patch<Todo[]>(`${this.appUrl}/${id}`, {completed});
  }

  toggleAlltodos(completed: boolean){
    return this.http.patch<Todo[]>(this.appUrl, { completed })
  }

  removeCompletedtodos() {
    return this.http.delete<Todo[]>(`${this.appUrl}/completed`)
  }
}
