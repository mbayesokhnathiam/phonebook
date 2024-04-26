import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { CreerContactComponent } from './components/creer-contact/creer-contact.component';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';
import { AdvancedSearchComponent } from './components/advanced-search/advanced-search.component';
import { CriteriaSearchComponent } from './components/criteria-search/criteria-search.component';
import { GestionnaireGuard } from 'src/app/core/guards/gestionnaire.guard';

const routes: Routes = [
  {
      path: "",
      component: SearchComponent
  },
  {
    path: "search",
    component: SearchComponent
},
{
  path: "advanced/search",
  component: AdvancedSearchComponent
},
{
  path: "criteria/search",
  component: CriteriaSearchComponent
},
{
  path: "creer",
  component: CreerContactComponent, canActivate: [GestionnaireGuard]
},
{
  path: "edit/:id",
  component: EditContactComponent,
  canActivate: [GestionnaireGuard]
},
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
