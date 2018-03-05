import {RouterModule, Routes} from "@angular/router";
import {SigninComponent} from "./signin/signin.component";
import {ModuleWithProviders} from "@angular/core";

const AUTH_ROUTES: Routes = [
  {path: '', component: SigninComponent}
];

export const BmsAuthRoutingModule: ModuleWithProviders = RouterModule.forChild(AUTH_ROUTES);
