import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FloatingActionComponent} from './floating-action.component';
import {ActionButtonDirective} from './action-button.directive';
import {IconDirective} from './icon.directive';

@NgModule({
  declarations: [
    FloatingActionComponent,
    FloatingActionComponent,
    ActionButtonDirective,
    IconDirective
  ],
  imports: [CommonModule],
  exports: [
    FloatingActionComponent,
    FloatingActionComponent,
    ActionButtonDirective,
    IconDirective
  ]
})
export class NgFloatingActionButtonModule {
}
