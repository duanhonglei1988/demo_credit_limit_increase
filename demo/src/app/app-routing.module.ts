import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuccessComponent } from './components/success/success.component';
import { ErrorComponent } from './components/success/error.component';
const routes: Routes = [
  {
    path:'',
    redirectTo:'card',
    pathMatch:'full'
  },
  {
    path:'card',
    loadChildren:() => import('./module/card/card.module').then(m => m.CardModule)
  },
  {
    path:'success',
    component:SuccessComponent
  },
  {
    path:'error',
    component:ErrorComponent
  }
/*   {
    path:'user',
    loadChildren:() => import('./module/user/user.module#UserModule')
  }, */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
