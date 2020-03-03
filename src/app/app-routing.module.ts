import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { CarfformComponent } from './components/carfform/carfform.component';


const routes: Routes = [
  {path:'',component:CardComponent,children:[
    {path:'',component:CarfformComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
