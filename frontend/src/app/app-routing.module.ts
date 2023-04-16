import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoseNetTestComponent } from './pose-net-test/pose-net-test.component';
import { TestInterfaceComponent } from './test-interface/test-interface.component';


const routes: Routes = [
  { path: "test", component: TestInterfaceComponent },
  { path: "posenet", component: PoseNetTestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}