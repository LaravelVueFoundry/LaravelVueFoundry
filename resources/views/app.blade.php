<!DOCTYPE html>
<html
    class="h-full antialiased bg-gray-100 dark:bg-gray-950"
    lang="{{ str_replace('_', '-', app()->getLocale()) }}"
    dir="{{ config('app.locales')[app()->getLocale()]['dir'] ?? 'ltr' }}"
>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'LaravelVueFoundry') }}</title>

        @routes
        @vite(['resources/js/app.ts', "resources/js/Pages/{$page['component']}.vue"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased min-h-full flex flex-col">
        @inertia
    </body>
</html>
