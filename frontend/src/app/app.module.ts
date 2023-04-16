import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* HTTP and Auth */
import { HttpClientModule } from '@angular/common/http';

/* UI Dependencies */
import { NgForOf } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';

/* Application Specific */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoseNetTestComponent } from './pose-net-test/pose-net-test.component';

@NgModule({
  declarations: [
    AppComponent,
    PoseNetTestComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgForOf,
    AppRoutingModule,
    LayoutModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}