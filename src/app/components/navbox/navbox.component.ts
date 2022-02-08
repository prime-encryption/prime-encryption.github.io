import { Component, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { NavboxItem } from 'src/app/scripts/interfaces';

@Component({
  selector: 'app-navbox',
  templateUrl: './navbox.component.html',
  styleUrls: ['./navbox.component.scss']
})
export class NavboxComponent implements OnInit {
  @Input() data!: NavboxItem[];

  constructor(private renderer: Renderer2, private elem: ElementRef) { }

  ngOnInit(): void {
    console.log(this.data);
    
    console.log(this.elem.nativeElement);
    
  }

}
