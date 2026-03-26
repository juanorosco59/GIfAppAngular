import { Component } from '@angular/core';
import { Routes } from '@angular/router';

export const routes: Routes = [


    {
        path: 'basic',
        title: 'Pipe básicos',
        loadComponent: () => import('./pages/basic-page/basic-page').then(m => m.BasicPage),

    }
    ,
    {
        path: 'numbers',
        title: 'Numbers pipe',
        loadComponent: () => import('./pages/number-page/number-page').then(m => m.NumberPage),

    }
    ,
    {
        path: 'uncommon',
        title: 'Pipes no tan comunes',
        loadComponent: () => import('./pages/uncommon-page/uncommon-page').then(m => m.UncommonPage),

    }
    ,
    {
        path: 'custom',
        title: 'Pipes personalizados',
        loadComponent: () => import('./pages/custom-page/custom-page').then(m => m.CustomPage),
    },

    {
        path: 'pipe-type',
        title: 'Pipes totales',
        loadComponent: () => import('./others/pipe-type/pipe-type').then(m => m.PipeType),
    },


    {
        path: '**',
        redirectTo: "basic"

    }



];
