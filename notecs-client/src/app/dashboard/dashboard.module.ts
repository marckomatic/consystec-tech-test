import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ToolbarComponent } from "../shared-components/toolbar/toolbar.component";
import { MaterialModule } from '../material/material.module';
import { EditorComponent } from './components/editor/editor.component';


@NgModule({
  declarations: [
    DashboardComponent,
    EditorComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ToolbarComponent,
    MaterialModule
]
})
export class DashboardModule { }
