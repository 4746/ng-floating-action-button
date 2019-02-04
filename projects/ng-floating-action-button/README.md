[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]

### Install ngx-bootstrap from npm:

```bash
npm install @ng4746/ng-floating-action-button --save
```


Add needed package to NgModule imports:

```cmd
import { NgFloatingActionButtonModule } from '@ng4746/ng-floating-action-button';

@NgModule({
  ...
  imports: [NgFloatingActionButtonModule,...]
  ...
})
```


Add component to your page:

```html
<fab-floating-action [options]="{direction: 'left'}">
  <ng-template fabIcon>
    <i class="material-icons">menu</i>
  </ng-template>
  <ng-template fabActionButton>
    <li>
      <a class="btn-fab">
        <i class="material-icons">cloud_download</i>
      </a>
    </li>
    <li>
      <a class="btn-fab">
        <i class="material-icons">edit</i>
      </a>
    </li>
    <li>
      <a class="btn-fab">
        <i class="material-icons">attachment</i>
      </a>
    </li>
    <li>
      <a class="btn-fab">
        <i class="material-icons">insert_emoticon</i>
      </a>
    </li>
  </ng-template>
</fab-floating-action>
```

## MIT License

[npm-url]: https://www.npmjs.com/package/@ng4746/ng-floating-action-button
[npm-image]: https://img.shields.io/npm/v/@ng4746/ng-floating-action-button.svg

[downloads-image]: https://img.shields.io/npm/dm/@ng4746/ng-floating-action-button.svg
[downloads-url]: https://npmjs.org/package/@ng4746/ng-floating-action-button
