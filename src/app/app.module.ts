import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlgorithmVisualizerComponent } from './algorithm-visualizer/algorithm-visualizer.component';

import { MatSelectModule } from '@angular/material/select';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [AppComponent, AlgorithmVisualizerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatSliderModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
