import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { TodosContainerComponent } from './todos-container.component';


@NgModule({
  declarations: [
    TodosContainerComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    TodosContainerComponent
  ]
})
export class TodoModule { }
