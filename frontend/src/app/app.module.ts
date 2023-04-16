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
import { UserInterfaceComponent } from './user-interface/user-interface.component';
import { TestInterfaceComponent } from './test-interface/test-interface.component';

@NgModule({
  declarations: [
    AppComponent,
    PoseNetTestComponent,
    UserInterfaceComponent,
    TestInterfaceComponent,
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