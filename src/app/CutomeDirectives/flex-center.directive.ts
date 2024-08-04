import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFlexCenter]',
  standalone: true,
})
export class FlexCenterDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.setFlexCenter();
  }
  private setFlexCenter() {
    this.renderer.setStyle(this.el.nativeElement, 'display', 'flex');
    this.renderer.setStyle(this.el.nativeElement, 'justify-content', 'center');
    this.renderer.setStyle(this.el.nativeElement, 'align-items', 'center');
  }
}
