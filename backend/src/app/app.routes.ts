import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { MyLeaves } from './my-leaves/my-leaves';
import { NewLeave } from './new-leave/new-leave';
import { Admin } from './admin/admin';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full"
    },
    {
        path: "dashboard",
        component: Dashboard
    },
    {
        path: "leaves",
        component: MyLeaves
    },
    {
        path: "apply",
        component: NewLeave
    },
    {
        path: "admin",
        component: Admin
    }
];
