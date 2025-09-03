import { Routes } from '@angular/router';
import { SignUp } from './auth/components/sign-up/sign-up';
import { Login } from './auth/components/login/login';
import { Dashboard } from './dashboard/dashboard';
import { ProductTable } from './product/components/product-table/product-table';
import { AuthGuard } from './shared/guard/AuthGuard';

export const routes: Routes = [
  {
    path: 'sign-up',
    component: SignUp,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [AuthGuard],
  },
  {
    path: 'products',
    component: ProductTable,
    canActivate: [AuthGuard],
  },
];
