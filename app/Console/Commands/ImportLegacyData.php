<?php

namespace App\Console\Commands;

use App\Models\Category;
use App\Models\Contact;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\Quote;
use App\Support\LegacySqlDump;
use Carbon\CarbonInterface;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ImportLegacyData extends Command
{
    protected $signature = 'kh:import-legacy
        {dump : Path to the legacy SQL dump}
        {--with-contacts : Import contacts from the legacy dump}';

    protected $description = 'Import legacy KH Equipment Hub data into the clean schema.';

    public function handle(): int
    {
        $dump = new LegacySqlDump($this->dumpPath());
        $now = now();

        DB::transaction(function () use ($dump, $now): void {
            $this->importCategories($dump, $now);
            $this->importProducts($dump, $now);
            $this->importProductImages($dump, $now);
            $this->importQuotes($dump, $now);

            if ($this->option('with-contacts')) {
                $this->importContacts($dump, $now);
            }
        });

        $this->components->info('Legacy import complete.');

        return self::SUCCESS;
    }

    private function importCategories(LegacySqlDump $dump, CarbonInterface $now): void
    {
        $rows = [];

        foreach ($dump->rows('categories') as $row) {
            $rows[] = [
                'id' => (int) $row['id'],
                'name' => $row['name'],
                'slug' => Str::slug($row['name']),
                'created_at' => $row['created_at'] ?: $now,
                'updated_at' => $row['updated_at'] ?: $now,
            ];
        }

        Category::query()->upsert($rows, ['id'], ['name', 'slug', 'created_at', 'updated_at']);
        $this->components->info('Imported categories: '.count($rows));
    }

    private function importProducts(LegacySqlDump $dump, CarbonInterface $now): void
    {
        $rows = [];

        foreach ($dump->rows('products') as $row) {
            $rows[] = [
                'id' => (int) $row['id'],
                'category_id' => (int) $row['category'],
                'name' => $row['productName'],
                'brand' => $this->nullableString($row['brand']),
                'is_new' => (bool) $row['isNew'],
                'powered_by' => $this->nullableString($row['poweredBy']),
                'drum_capacity' => $this->nullableString($row['drumCapacity']),
                'operating_weight' => $this->nullableString($row['operatingWeight']),
                'description' => $this->nullableString($row['description']),
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }

        Product::query()->upsert($rows, ['id'], $this->updateColumns($rows));
        $this->components->info('Imported products: '.count($rows));
    }

    private function importProductImages(LegacySqlDump $dump, CarbonInterface $now): void
    {
        $rows = [];

        foreach ($dump->rows('productimages') as $row) {
            $rows[] = [
                'id' => (int) $row['id'],
                'product_id' => (int) $row['productId'],
                'filename' => $row['src'],
                'created_at' => $row['created_at'] ?: $now,
                'updated_at' => $row['updated_at'] ?: $now,
            ];
        }

        ProductImage::query()->upsert($rows, ['id'], $this->updateColumns($rows));
        $this->components->info('Imported product images: '.count($rows));
    }

    private function importQuotes(LegacySqlDump $dump, CarbonInterface $now): void
    {
        $rows = [];

        foreach ($dump->rows('tbl_quotes') as $row) {
            $rows[] = [
                'id' => (int) $row['id'],
                'product_id' => (int) $row['productId'],
                'product_name_snapshot' => $row['productName'],
                'name' => $row['fullname'],
                'address' => $row['address'],
                'company' => $this->nullableString($row['company']),
                'country' => $row['country'],
                'message' => $this->nullableString($row['message']),
                'phone' => $row['phone'],
                'email' => $row['email'],
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }

        Quote::query()->upsert($rows, ['id'], $this->updateColumns($rows));
        $this->components->info('Imported quotes: '.count($rows));
    }

    private function importContacts(LegacySqlDump $dump, CarbonInterface $now): void
    {
        $rows = [];

        foreach ($dump->rows('tbl_contacts') as $row) {
            $name = $this->nullableString($row['fullname']);

            if ($name === null) {
                continue;
            }

            $rows[] = [
                'name' => $name,
                'email' => $this->nullableString($row['email']),
                'message' => $this->nullableString($row['message']),
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }

        Contact::query()->insertOrIgnore($rows);
        $this->components->info('Imported contacts: '.count($rows));
    }

    private function nullableString(mixed $value): ?string
    {
        return filled($value) ? trim((string) $value) : null;
    }

    private function dumpPath(): string
    {
        return $this->absolutePath((string) $this->argument('dump'));
    }

    private function absolutePath(string $path): string
    {
        if (preg_match('/^[A-Za-z]:[\\\\\\/]/', $path) === 1 || str_starts_with($path, DIRECTORY_SEPARATOR)) {
            return $path;
        }

        return base_path($path);
    }

    /**
     * @param  array<int, array<string, mixed>>  $rows
     * @return array<int, string>
     */
    private function updateColumns(array $rows): array
    {
        return array_values(array_diff(array_keys($rows[0] ?? []), ['id']));
    }
}
