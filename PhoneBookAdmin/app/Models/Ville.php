<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ville extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'paysId'
    ];

    public function typeInstituts(): HasMany
    {
        return $this->hasMany(TypeInstitut::class, 'villeId');
    }

    public function pays(): BelongsTo
    {
        return $this->belongsTo(Pays::class, 'paysId');
    }
}
