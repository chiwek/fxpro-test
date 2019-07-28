import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';

export let fadeFast = trigger('fadeFast', [

    state('void', style({opacity: 0})),

    transition('void <=> *', [
        animate('25ms ease-in-out')
    ])

]);

export let fadeMedium = trigger('fadeMedium', [

    state('void', style({opacity: 0})),

    transition('void <=> *', [
        animate('50ms ease-in-out')
    ])

]);

export let fadeSlow = trigger('fadeSlow', [

    state('void', style({opacity: 0})),

    transition('void <=> *', [
        animate('100ms ease-in-out')
    ])

]);

export let filterFade = trigger('filterFade', [

    state('void', style({ opacity: 0})),

    transition('void <=> *', [
        animate('500ms ease-in-out')
    ])

]);
