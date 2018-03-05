import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { BmsAuthRoutingModule } from './auth-routing.module';
import { AuthHeaderComponent } from './auth-header/auth-header.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    BmsAuthRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SigninComponent, AuthHeaderComponent]
})
export class AuthModule {
}
