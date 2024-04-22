<?php

namespace App\Imports;

use App\Models\Contact;
use App\Models\ContactTmp;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class ContactImport implements ToModel,WithHeadingRow ,WithValidation
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new ContactTmp([
            'prenom'     => $row['prenom'],
            'nom'     => $row['nom'],
            'fonction'     => $row['fonction'],
            'telephone_fixe'     => $row['telephone_fixe'],
            'telephone_mobile'     => $row['telephone_mobile'],
            'telephone_domicile'     => $row['telephone_domicile'],
            'email'     => $row['email'],
            'commentaire'     => $row['commentaire'],

        ]);
    }

    public function rules(): array
    {
        return [
            'prenom' => 'required',
            'nom' => 'required',
            'fonction' => 'required'
        ];
    }
}
