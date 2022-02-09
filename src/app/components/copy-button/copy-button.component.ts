import { Component, Input } from '@angular/core';
import { faCopy } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-copy-button',
  templateUrl: './copy-button.component.html',
  styleUrls: ['./copy-button.component.scss']
})
export class CopyButtonComponent {
  @Input() title: string = "Click to copy";

  faCopy = faCopy;

  constructor() { }

}