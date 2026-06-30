<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        @php
            $seoTitle = 'KH Equipment Hub | Construction Equipment, Generators & Machinery in Ghana';
            $seoDescription = config('site.meta.description');
            $canonicalUrl = url()->current();
            $socialImage = url(config('site.social_image', '/images/brand/android-chrome-512x512.png'));
        @endphp

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="{{ $seoDescription }}">
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
        <meta name="google-site-verification" content="dY8KPc6e6ZScvUMw-xlaZ-J9rWYNo8HvBsI5efOEnl4">
        <meta name="theme-color" content="#f5b800">
        <link rel="canonical" href="{{ $canonicalUrl }}">

        <meta property="og:site_name" content="KH Equipment Hub">
        <meta property="og:type" content="website">
        <meta property="og:url" content="{{ $canonicalUrl }}">
        <meta property="og:title" content="{{ $seoTitle }}">
        <meta property="og:description" content="{{ $seoDescription }}">
        <meta property="og:image" content="{{ $socialImage }}">
        <meta property="og:locale" content="en_GH">

        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="{{ $seoTitle }}">
        <meta name="twitter:description" content="{{ $seoDescription }}">
        <meta name="twitter:image" content="{{ $socialImage }}">

        <link rel="icon" href="/images/brand/favicon-32x32.png" sizes="32x32" type="image/png">
        <link rel="icon" href="/images/brand/favicon-16x16.png" sizes="16x16" type="image/png">
        <link rel="apple-touch-icon" href="/images/brand/apple-touch-icon.png">
        <link rel="manifest" href="/images/brand/site.webmanifest">

        @fonts

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head>
            <title>{{ $seoTitle }}</title>
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased">
        <x-inertia::app />
    </body>
</html>
