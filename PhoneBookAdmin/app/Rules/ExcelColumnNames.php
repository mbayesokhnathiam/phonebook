<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;

class ExcelColumnNames implements Rule
{

    protected $allowedColumnNames;

    public function __construct(array $allowedColumnNames)
    {
        $this->allowedColumnNames = $allowedColumnNames;
    }
    public function passes($attribute, $value)
    {
        // Charger le fichier Excel et obtenir les noms des colonnes
        $columnNames = Excel::toCollection(null, $value)->first()->first()->toArray();

        Log::info($columnNames);
        // Vérifier si les noms des colonnes correspondent aux noms autorisés
        return empty(array_diff($columnNames, $this->allowedColumnNames));
    }

    public function message()
    {
        return 'Les noms des colonnes dans le fichier Excel ne correspondent pas aux noms autorisés.';
    }
}
