import { Component, OnInit } from '@angular/core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-safety-warning',
  templateUrl: './safety-warning.component.html',
  styleUrls: ['./safety-warning.component.scss']
})
export class SafetyWarningComponent implements OnInit {
  faWarning = faExclamationTriangle;

  constructor() { }

  ngOnInit(): void {
  }

}
