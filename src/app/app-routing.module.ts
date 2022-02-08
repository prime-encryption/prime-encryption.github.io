import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncryptComponent } from './components/encrypt/encrypt.component';
import { DecryptComponent } from './components/decrypt/decrypt.component';
import { AboutComponent } from './pages/about/about.component';

const routes: Routes = [
  { path: '', component: EncryptComponent },
  { path: 'encrypt', component: EncryptComponent },
  { path: 'decrypt', component: DecryptComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
