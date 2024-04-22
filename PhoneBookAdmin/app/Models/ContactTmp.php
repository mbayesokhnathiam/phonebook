<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactTmp extends Model
{
    use HasFactory;

    protected $fillable = [
        'prenom',
        'nom',
        'telephone_domicile',
        'fonction',
        'telephone_fixe',
        'telephone_mobile',
        'email',
        'commentaire'
    ];
}
