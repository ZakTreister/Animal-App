import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
 template:`
<div class="container">
  <div class="row">
    <div class="col-12">
      <router-outlet></router-outlet>
    </div>
  </div>
</div>
 `
})
export class AppComponent {
}
