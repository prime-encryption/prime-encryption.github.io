import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-box',
  templateUrl: './error-box.component.html',
  styleUrls: ['./error-box.component.scss']
})
export class ErrorBoxComponent implements OnInit {
  @Input() text!: string;
  @Input() shouldShow!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
