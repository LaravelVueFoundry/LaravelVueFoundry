<?php

declare(strict_types=1);

return [
    /*
     * The driver that will be used to create images. Can be set to gd or imagick.
     */
    'driver' => 'gd',

    /*
     * Static image presets to use throughout the application.
     */
    'presets' => [
        'avatar' => [
            'fit' => 'crop',
            'fm' => 'png',
            'h' => 256,
            'w' => 256,
        ],
    ],
];
