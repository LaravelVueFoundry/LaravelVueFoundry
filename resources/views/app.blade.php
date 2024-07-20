<!DOCTYPE html>
<html class="h-full antialiased bg-gray-100 dark:bg-gray-950" lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'LaravelVueFoundry') }}</title>

        @routes
        @vite('resources/js/app.ts')
        @inertiaHead
    </head>
    <body class="font-sans antialiased min-h-full flex flex-col">
        @inertia
    </body>
</html>
