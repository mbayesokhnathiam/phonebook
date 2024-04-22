import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { CreerContactComponent } from './components/creer-contact/creer-contact.component';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';
import { AdvancedSearchComponent } from './components/advanced-search/advanced-search.component';
import { CriteriaSearchComponent } from './components/criteria-search/criteria-search.component';

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
  component: CreerContactComponent
},
{
  path: "edit/:id",
  component: EditContactComponent
},
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
