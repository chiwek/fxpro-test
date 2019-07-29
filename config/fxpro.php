<?php
# config/fxpro.php

return [
    'modules' => [
        'Core',
        'User' => [
            'Models' => [
                'User'
            ]
        ],
        'Client' => [
            'Models' => [
                'Client'
            ]
        ],
        'Product' => [
            'Models' => [
                'Product'
            ]
        ]
    ]
];
