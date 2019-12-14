import { NgModule, Injectable } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

class Permissions {
  canActivate(router): boolean {
    const user = firebase.auth().currentUser;
    if(!user) return router.navigate(['/login']);
    return true;
  }
}

@Injectable()
class CanActivateTeam implements CanActivate {
  constructor(private permissions: Permissions, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    return this.permissions.canActivate(this.router);
  }
}

const routes: Routes = [
    {
      path: '',
      loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
      canActivate: [CanActivateTeam]
    },
    {
      path: 'login',
      loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
    },
    {
      path: 'register',
      loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
    },
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: [CanActivateTeam, Permissions]
})
export class AppRoutingModule {}
