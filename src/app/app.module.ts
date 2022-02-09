import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { EncryptComponent } from './components/encrypt/encrypt.component';
import { DecryptComponent } from './components/decrypt/decrypt.component';
import { SiteFormComponent } from './components/site-form/site-form.component';
import { FooterComponent } from './components/footer/footer.component';
import { SafetyWarningComponent } from './components/safety-warning/safety-warning.component';
import { ExplanationComponent } from './components/explanation/explanation.component';
import { AboutComponent } from './pages/about/about.component';
import { ErrorBoxComponent } from './components/error-box/error-box.component';
import { NavboxComponent } from './components/navbox/navbox.component';
import { FaqItemComponent } from './pages/about/components/faq-item/faq-item.component';
import { CopyButtonComponent } from './components/copy-button/copy-button.component';
import { PasswordInputComponent } from './components/password-input/password-input.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EncryptComponent,
    DecryptComponent,
    SiteFormComponent,
    FooterComponent,
    SafetyWarningComponent,
    ExplanationComponent,
    AboutComponent,
    ErrorBoxComponent,
    NavboxComponent,
    FaqItemComponent,
    CopyButtonComponent,
    PasswordInputComponent,
  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
