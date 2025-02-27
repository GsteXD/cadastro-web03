import { Component } from '@angular/core';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'',
    redirectTo: 'main-page',
    pathMatch:'full'
  }
];
