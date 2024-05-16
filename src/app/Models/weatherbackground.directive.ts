import { Directive, ElementRef, Input, Renderer2, HostBinding } from '@angular/core';

@Directive({
    'selector': '[weatherBackground]'
})

export class weatherBackground {
    @Input() state!: string;
    constructor(private elment: ElementRef, private _Renderer2: Renderer2){}
}