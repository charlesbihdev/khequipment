# KH Equipment Hub

KH Equipment Hub is the Laravel, Inertia, React, and TypeScript rebuild of the legacy equipment catalog and admin system.

## Stack

- Laravel 13
- Inertia React
- React 19 with TypeScript
- Tailwind CSS 4
- SQLite for local development

## Local Development

Install dependencies:

```bash
composer install
npm install
```

Prepare the app:

```bash
cp .env.example .env
php artisan key:generate
php artisan migrate
```

Run the dev servers:

```bash
composer run dev
```

## Theme Tokens

Reusable fonts, colors, radii, and semantic UI tokens live in `resources/css/app.css`.

Use semantic Tailwind classes such as `bg-background`, `text-foreground`, `bg-primary`, `text-muted-foreground`, `border-border`, `bg-sidebar`, and the brand utilities like `bg-brand-gold` or `text-brand-steel` instead of hardcoded hex values in components.

## Migration Notes

The old database dump stays in `../db/` and will be imported through a controlled Laravel command that maps legacy tables and columns into the new clean schema.
