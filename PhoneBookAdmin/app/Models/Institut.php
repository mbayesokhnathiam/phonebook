<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Institut extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'site_web',
        'adresse',
        'telephone_fixe',
        'typeInstitutId',
        'villeId',
        'paysId',
    ];

    public function ville(): BelongsTo
    {
        return $this->belongsTo(Ville::class, 'villeId');
    }

    public function typeinstitut(): BelongsTo
    {
        return $this->belongsTo(TypeInstitut::class, 'typeInstitutId');
    }

    public function contacts(): HasMany
    {
        return $this->hasMany(Contact::class, 'institutId');
    }


}
