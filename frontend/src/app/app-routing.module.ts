import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoseNetTestComponent } from './pose-net-test/pose-net-test.component';
import { TestInterfaceComponent } from './test-interface/test-interface.component';
import { IntroductionScreenComponent } from './screens/introduction-screen/introduction-screen.component';
import { GeneratedImageSlideComponent } from './screens/generated-image-slide/generated-image-slide.component';
import { OnePersonMessageComponent } from './screens/one-person-message/one-person-message.component';
import { InstructionsScreenComponent } from './screens/instructions-screen/instructions-screen.component';
import { GeneratingArtComponent } from './screens/generating-art/generating-art.component';


const routes: Routes = [
  { path: "test", component: TestInterfaceComponent },
  { path: "posenet", component: PoseNetTestComponent },
  { path: "home", component: IntroductionScreenComponent },
  { path: "generated-image", component: GeneratedImageSlideComponent },
  { path: "one-person", component: OnePersonMessageComponent },
  { path: "instructions", component: InstructionsScreenComponent },
  { path: "generating", component: GeneratingArtComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }