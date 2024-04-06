<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TypeInstitut extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'villeId'
    ];

    public function ville(): BelongsTo
    {
        return $this->belongsTo(Ville::class, 'villeId');
    }

    public function instituts(): HasMany
    {
        return $this->hasMany(Institut::class, 'typeInstitutId');
    }
}
