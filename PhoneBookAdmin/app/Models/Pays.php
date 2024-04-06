<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Pays extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'alpha2',
        'alpha3',
        'nom_en_gb',
        'nom_fr_fr'
    ];

    public function villes(): HasMany
    {
        return $this->hasMany(Ville::class, 'paysId');
    }
}
