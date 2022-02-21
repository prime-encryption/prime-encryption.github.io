import { Component, Input, ViewChild } from '@angular/core';
import { EncryptionService } from './../../services/encryption.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordInputComponent } from '../password-input/password-input.component';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-site-form',
  templateUrl: './site-form.component.html',
  styleUrls: ['./site-form.component.scss']
})
export class SiteFormComponent {
  @ViewChild(PasswordInputComponent, { static: true })
  passwordInputComponent!: PasswordInputComponent;
  @Input() type!: string;

  output: string = "";
  form = new FormGroup({
    key: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    text: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
  });

  isKeyRevealed: boolean = false;
  errorText = $localize`:@@form.error.generic:Unable to process the message!`;
  shouldShowError = false;

  constructor(private encryptionService: EncryptionService, private cliboardApi: ClipboardService) { }

  toggleKey(): void {
    this.isKeyRevealed = !this.isKeyRevealed;
  }

  insertRandomKey(): void {
    let newVal = "";
    for (let i = 0; i < 16; i++) {
      newVal += Math.random().toString(36).substring(2,3);
    }
    this.form.get('key')?.setValue(newVal);
  }
  onSubmit(form: FormGroup) {
    if (!form.value.key) {
      this.errorText = $localize`:@@form.error.blank_key:Please set a valid key!`;
      this.showError();
      this.output = "";
      return;
    }
    if (!form.value.text) {
      this.errorText = $localize`:@@form.error.blank_input:Please specify a text to process!`;
      this.showError();
      this.output = "";
      return;
    }
    try {
      if (this.type == 'encrypt') {
        this.output = this.encryptionService.encrypt(this.form.value.key, this.form.value.text);
      }
      else {
        this.output = this.encryptionService.decrypt(this.form.value.key, this.form.value.text);
      }
      this.hideError();
    } catch (err) {
      this.showError()
      this.output = "";
    }
  }
  showError(errText?: string) {
    if (errText) {
      this.errorText = errText;
    }
    this.shouldShowError = true;
  }
  hideError() {
    this.shouldShowError = false;
  }
  
  copyOutput() {
    this.cliboardApi.copyFromContent(this.output);
  }
  copyKey() {
    console.log(this.form.value.key);
    this.cliboardApi.copyFromContent(this.form.value.key);
  }
}