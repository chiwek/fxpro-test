import {trigger, state, style, animate, transition, group} from '@angular/animations';

export const CoverFadeToggle = trigger(
    'coverFadeToggle',
    [

        state(
            'in',
            style({opacity: 1})
        ),

        transition(
            'void => *',
            [
                style({opacity: 0}),
                group([
                    animate('0.2s ease', style({opacity: 1}))
                ])
            ]
        ),

        transition(
            '* => void',
            [
                group([
                    animate('0.2s ease', style({opacity: 0}))
                ])
            ]
        )

    ]
);

export const ElementFadeToggle = trigger(
    'elementFadeToggle',
    [

        transition(
            'void => *',
            [
                style({opacity: 0}),
                group([
                    animate('0.2s ease', style({opacity: 1}))
                ])
            ]
        ),

        transition(
            '* => void',
            [
                group([
                    animate('0.2s ease', style({opacity: 0}))
                ])
            ]
        )

    ]
);

export const ToastShowToggle = trigger(
    'toastShowToggle',
    [

        transition(
            'void => *',
            [
                style({right: '-250px' , opacity: 0}),
                group([
                    animate('0.4s ease', style({right: '5px' , opacity: 1}))
                ])
            ]
        ),

        transition(
            '* => void',
            [
                group([
                    animate('0.4s ease', style({right: '-250px' , opacity: 0}))
                ])
            ]
        )

    ]
);
