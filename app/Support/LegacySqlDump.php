<?php

namespace App\Support;

use Generator;
use Illuminate\Support\Str;
use RuntimeException;

class LegacySqlDump
{
    public function __construct(private readonly string $path)
    {
        if (! is_file($this->path)) {
            throw new RuntimeException("SQL dump not found: {$this->path}");
        }
    }

    /**
     * @return Generator<int, array<string, mixed>>
     */
    public function rows(string $table): Generator
    {
        $sql = file_get_contents($this->path);

        if ($sql === false) {
            throw new RuntimeException("Unable to read SQL dump: {$this->path}");
        }

        $pattern = "/INSERT INTO `{$table}` \\((.*?)\\) VALUES\\s*(.*?);/s";

        if (! preg_match_all($pattern, $sql, $matches, PREG_SET_ORDER)) {
            return;
        }

        foreach ($matches as $match) {
            $columns = $this->columns($match[1]);

            foreach ($this->tuples($match[2]) as $tuple) {
                $values = $this->values($tuple);

                if (count($columns) !== count($values)) {
                    throw new RuntimeException("Column/value mismatch while parsing {$table}.");
                }

                yield array_combine($columns, $values);
            }
        }
    }

    /**
     * @return array<int, string>
     */
    private function columns(string $source): array
    {
        return Str::of($source)
            ->replace('`', '')
            ->explode(',')
            ->map(fn (string $column): string => trim($column))
            ->all();
    }

    /**
     * @return array<int, string>
     */
    private function tuples(string $source): array
    {
        $tuples = [];
        $buffer = '';
        $depth = 0;
        $quoted = false;
        $length = strlen($source);

        for ($index = 0; $index < $length; $index++) {
            $char = $source[$index];
            $previous = $source[$index - 1] ?? '';

            if ($char === "'" && $previous !== '\\') {
                $quoted = ! $quoted;
            }

            if (! $quoted && $char === '(') {
                $depth++;

                if ($depth === 1) {
                    $buffer = '';
                    continue;
                }
            }

            if (! $quoted && $char === ')') {
                $depth--;

                if ($depth === 0) {
                    $tuples[] = $buffer;
                    continue;
                }
            }

            if ($depth > 0) {
                $buffer .= $char;
            }
        }

        return $tuples;
    }

    /**
     * @return array<int, mixed>
     */
    private function values(string $tuple): array
    {
        return collect(str_getcsv($tuple, ',', "'", '\\'))
            ->map(fn (string $value): mixed => $this->normalize($value))
            ->all();
    }

    private function normalize(string $value): mixed
    {
        $value = trim($value);

        if (Str::upper($value) === 'NULL') {
            return null;
        }

        return stripcslashes($value);
    }
}
