import { NgModule, Injectable } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import 'firebase/auth';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'addList',
    loadChildren: () => import('./pages/list/add-list/add-list.module').then(m => m.AddListPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'list/:id',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/list/list-details/list-details.module').then(m => m.ListDetailsPageModule),
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'addItem/:id',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/item/add-item/add-item.module').then(m => m.AddItemPageModule),
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'add-item',
    loadChildren: () => import('./pages/item/add-item/add-item.module').then(m => m.AddItemPageModule)
  },
  {
    path: 'item-details',
    loadChildren: () => import('./pages/item/item-details/item-details.module').then(m => m.ItemDetailsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
