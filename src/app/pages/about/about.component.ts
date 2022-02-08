import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { NavboxItem, navboxLevel } from './../../scripts/interfaces';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
    navData: NavboxItem[] = [];

    constructor(private renderer: Renderer2, private elem: ElementRef) { }

    ngOnInit() {
        // modify elements that require a navbox, pass data to the navbox
        let elements = this.elem.nativeElement.querySelectorAll('[nav]');
        for (let i = 0; i < elements.length; i++) {
            const el = elements[i];
            let tagname = el.tagName;
            let level: navboxLevel;
            let text: string = el.textContent;
            let id = `navitem-${i}`;
            el.setAttribute('id', id);
            switch (tagname.toLowerCase()) {
                case 'h1':
                    level = 1;
                    break;
                case 'h2':
                    level = 2;
                    break;
                case 'h3':
                    level = 3;
                    break;
                case 'h4':
                    level = 4;
                    break;
                case 'h5':
                    level = 5;
                    break;
                case 'h6':
                    level = 6;
                    break;
                default:
                    level = 1;
                    break;
            }
            this.navData.push({
                level,
                text,
                id
            });
        }
    }
}
