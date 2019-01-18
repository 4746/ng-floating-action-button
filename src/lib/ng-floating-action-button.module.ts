import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FloatingActionComponent} from './floating-action.component';
import {ActionButtonDirective} from './action-button.directive';

@NgModule({
  declarations: [
    FloatingActionComponent,
    FloatingActionComponent,
    ActionButtonDirective
  ],
  imports: [CommonModule],
  exports: [
    FloatingActionComponent,
    FloatingActionComponent,
    ActionButtonDirective
  ]
})
export class NgFloatingActionButtonModule {
}
