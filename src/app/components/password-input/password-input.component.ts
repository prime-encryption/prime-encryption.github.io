import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => PasswordInputComponent),
    },
  ],
})
export class PasswordInputComponent implements OnInit, ControlValueAccessor {
  value = "";
  isPasswordRevealed = false;
  @Input() placeholder: string = $localize`:@@component.password.default_placeholder:Password`;
  togglePasswordVisibility() {
    this.isPasswordRevealed = !this.isPasswordRevealed;
  }
  onChange = (_: any) => {};
  onTouch = (_: any) => {};
  registerOnChange(fn: () => {}) {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => {}) {
    this.onTouch = fn;
  }
  writeValue(val: string) {
    this.value = val;
  }
  onInput() {
    this.onChange(this.value);
  }
  constructor() {}
  ngOnInit(): void {}
}