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
import { IntroductionScreenComponent } from './screens/introduction-screen/introduction-screen.component';
import { GeneratedImageSlideComponent } from './screens/generated-image-slide/generated-image-slide.component';
import { OnePersonMessageComponent } from './screens/one-person-message/one-person-message.component';
import { InstructionsScreenComponent } from './screens/instructions-screen/instructions-screen.component';
import { GeneratingArtComponent } from './screens/generating-art/generating-art.component';

@NgModule({
  declarations: [
    AppComponent,
    PoseNetTestComponent,
    UserInterfaceComponent,
    TestInterfaceComponent,
    IntroductionScreenComponent,
    GeneratedImageSlideComponent,
    OnePersonMessageComponent,
    InstructionsScreenComponent,
    GeneratingArtComponent,
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
export class AppModule { }