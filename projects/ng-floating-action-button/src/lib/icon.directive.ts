import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: 'ng-template[fabIcon]'
})
export class IconDirective implements IIconDirective {
  constructor(
    public templateRef: TemplateRef<any>
  ) {
  }
}

interface IIconDirective {
  templateRef: TemplateRef<any>;
}
