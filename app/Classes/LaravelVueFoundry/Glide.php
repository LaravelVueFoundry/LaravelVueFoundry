<?php

declare(strict_types=1);

namespace App\Classes\LaravelVueFoundry;

use League\Flysystem\Filesystem;
use League\Glide\Server;
use League\Glide\ServerFactory;

class Glide {
    protected Server $glide;

    public function __construct(
        string|Filesystem $sourceFile,
        string|Filesystem|null $cache = null,
    ) {
        $this->glide = ServerFactory::create([
            'cache' => $cache ?? sys_get_temp_dir(), 'lvfGlide_',
            'driver' => config('glide.driver', 'gd'),
            'presets' => config('glide.presets', []),
            'source' => $sourceFile,
        ]);
    }

    public static function create(
        string|Filesystem $sourceFile,
        string|Filesystem|null $cache = null,
    ) {
        return new self($sourceFile, $cache);
    }

    /**
     * Generate and return image response.
     *
     * @param string $path   The path of the image
     * @param array  $params Image manipulation parameters
     */
    public function convert(string $path, array $params) {
        return $this->glide->makeImage($path, $params);
    }
}
