import { AngularMaterialModule } from './../angular-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindComponent } from './find.component';
import { RouterModule } from '@angular/router';

export const ROUTES = [{ path: '', component: FindComponent }];


@NgModule({
  declarations: [FindComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class FindModule { }
