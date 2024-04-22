<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Str;

class ExcelFormat implements Rule
{
    public function passes($attribute, $value)
    {
        // Vérifier si le fichier a l'extension .xlsx ou .xls
        return Str::endsWith(strtolower($value->getClientOriginalName()), ['.xlsx', '.xls']);
    }

    public function message()
    {
        return 'Le fichier doit être un fichier Excel avec une extension .xlsx ou .xls.';
    }
}
