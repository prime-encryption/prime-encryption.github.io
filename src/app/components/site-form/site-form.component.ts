import { Component, Input } from '@angular/core';
import { copyToClipboard } from 'src/app/scripts/functions';
import { EncryptionService } from './../../services/encryption.service';

@Component({
  selector: 'app-site-form',
  templateUrl: './site-form.component.html',
  styleUrls: ['./site-form.component.scss']
})
export class SiteFormComponent {
  @Input() type!: string;

  key!: string;
  text!: string;
  output: string = "";

  isKeyRevealed: boolean = false;
  errorText = "Unable to " + (this.type == 'encrypt' ? 'encrypt' : 'decrypt') + '.';
  shouldShowError = false;

  constructor(private encryptionService: EncryptionService) { }

  toggleKey(): void {
    this.isKeyRevealed = !this.isKeyRevealed;
  }

  insertRandomKey(): void {
    this.key = "";
    for (let i = 0; i < 16; i++) {
      this.key += Math.random().toString(36).substring(2,3);
    }
  }

<<<<<<< Updated upstream
  onSubmit() {
=======
  onSubmit(form: FormGroup) {
    if (!form.value.key) {
      this.errorText = "Please set a valid key!";
      this.showError();
      this.output = "";
      return;
    }
    if (!form.value.text) {
      this.errorText = "Please specify a text to " + (this.type == 'encrypt' ? 'encrypt' : 'decrypt') + "!";
      this.showError();
      this.output = "";
      return;
    }
>>>>>>> Stashed changes
    try {
      if (this.type == 'encrypt') {
        this.output = this.encryptionService.encrypt(this.key, this.text);
      }
      else {
        this.output = this.encryptionService.decrypt(this.key, this.text);
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
    copyToClipboard(this.output);
  }
}