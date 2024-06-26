import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { TypeInstitutComponent } from './components/type-institut/type-institut.component';
import { PaysComponent } from './components/pays/pays.component';
import { InstitutComponent } from './components/institut/institut.component';
import { VilleComponent } from './components/ville/ville.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ImportContactsComponent } from './components/import-contacts/import-contacts.component';


@NgModule({
  declarations: [
    TypeInstitutComponent,
    PaysComponent,
    InstitutComponent,
    VilleComponent,
    ImportContactsComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
  ]
})
export class SettingsModule { }
