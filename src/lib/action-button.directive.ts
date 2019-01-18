import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: 'ng-template[fabActionButton]'
})
export class ActionButtonDirective {
  constructor(
    public templateRef: TemplateRef<any>
  ) {}
}
