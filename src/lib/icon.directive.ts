import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: 'ng-template[fabIcon]'
})
export class IconDirective {
  constructor(
    public templateRef: TemplateRef<any>
  ) {
  }
}
