import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { TodoFooterComponent } from './todo-footer.component';
import { TodoNavComponent } from './todo-nav.component';
import { TodoListComponent } from './todo-list.component'
import { TodosFilterPipe } from './todos-filter.pipe';
import { TodoFormComponent } from './todo-form.component';

@NgModule({
  declarations: [
    TodoFooterComponent,
    TodoNavComponent,
    TodosFilterPipe,
    TodoListComponent,
    TodoFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    TodoFooterComponent,
    TodoNavComponent,
    TodosFilterPipe, 
    TodoListComponent,
    TodoFormComponent
  ]
})
export class SharedModule { }
