import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Todo } from '../types/todo.interface';
import { NavItem } from '../types/nav-item.type';
import { environment } from 'src/environments/environment';
import { TodoService } from 'src/app/core/todo.service';

@Component({
  selector: 'app-todos-container',
  template: `
    <div class="container">
      <h1 class="title">Todos</h1>
      <div class="ver">8.0</div>

      <ng-container *ngIf="todos; else loading">
        <app-todo-form (add)="addTodo($event)"></app-todo-form>
        <app-todo-nav
          [navItems]="navItems"
          [navState]="navState"
          (changeNav)="navState=$event"></app-todo-nav>
        <app-todo-list
          [todos]="todos"
          [navState]="navState"
          (toggle)="toggleTodo($event)"
          (remove)="removeTodo($event)"></app-todo-list>
        <app-todo-footer
          [countCompleted]="countCompleted()"
          [countActive]="countActive()"
          (toggleAll)="toggleAll($event)"
          (removeCompleted)="removeCompleted()"></app-todo-footer>
      </ng-container>
      <ng-template #loading><i class="fas fa-spinner fa-spin fa-2x"></i></ng-template>
    </div>

    <pre>{{ todos | json }}</pre>
    <pre>{{ navState }}</pre>
  `,
  styles: [`
    .container {
      max-width: 750px;
      min-width: 450px;
      margin: 0 auto;
      padding: 15px;
    }

    .title {
      font-size: 4.5em;
      font-weight: 100;
      text-align: center;
      color: #23b7e5;
    }

    .ver {
      font-weight: 100;
      text-align: center;
      color: #23b7e5;
      margin-bottom: 30px;
    }

    /** Spinner */
    .fa-spinner {
      width: 100%;
      text-align: center;
    }
  `]
})
export class TodosContainerComponent implements OnInit {
  todos: Todo[];
  navItems: NavItem[] = ['All', 'Active', 'Completed'];
  navState: NavItem = 'All';
  content: string;

  // API Server URL
  appUrl: string = environment.apiUrl;

  constructor(private http: HttpClient,private todoService: TodoService) {}

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.todoService.getAll()
      .subscribe(todos => this.todos = todos);
  }

  addTodo(content: string) {
    this.content = this.content && this.content.trim();
    this.content = '';

    if (!content) { return; }
    const payload = { id: this.gererateId(), content, completed: false };
    this.todoService.create(payload)
      .subscribe(todos => this.todos = todos );
  }

  gererateId() {
    return this.todos.length ? Math.max(...this.todos.map(todo => todo.id)) + 1 : 1;
  }

  toggleTodo(id: number) {
    const completed = !this.todos.find(todo => todo.id === id).completed;

    this.todoService.toggle(id, completed)
      .subscribe(todos => this.todos = todos);
  }

  removeTodo(id: number) {
    this.todoService.remove(id)
      .subscribe(todos => this.todos = todos);
  }

  toggleAll(completed: boolean) {
    this.todoService.toggleAlltodos(completed)
      .subscribe(todos => this.todos = todos);
  }

  removeCompleted() {
    this.todoService.removeCompletedtodos()
      .subscribe(todos => this.todos = todos);
  }

  countCompleted() {
    return this.todos.filter(todo => todo.completed).length;
  }

  countActive() {
    return this.todos.filter(todo => !todo.completed).length;
  }
}
