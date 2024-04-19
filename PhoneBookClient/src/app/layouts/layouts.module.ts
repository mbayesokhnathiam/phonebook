import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';
import { TranslateModule } from '@ngx-translate/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

// Component pages
import { LayoutComponent } from './layout.component';
import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';
import { HorizontalTopbarComponent } from './horizontal-topbar/horizontal-topbar.component';


// Load Icons
import { defineElement } from '@lordicon/element';
import lottie from 'lottie-web';
import { HorizontalComponent } from './horizontal/horizontal.component';

@NgModule({
  declarations: [
    LayoutComponent,
    TopbarComponent,
    FooterComponent,
    HorizontalTopbarComponent,
    HorizontalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbDropdownModule,
    NgbNavModule,
    SimplebarAngularModule,
    TranslateModule,
    FormsModule,
    NgbCollapseModule,
    ReactiveFormsModule
  ],

  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LayoutsModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
