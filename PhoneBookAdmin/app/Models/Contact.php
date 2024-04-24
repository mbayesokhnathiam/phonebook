<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Contact extends Model
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
        'commentaire',
        'institutId'
    ];

    public function setToFavoris()
    {
        $this->favoris = true;
        $this->save();

    }

    public function unsetToFavoris()
    {
        $this->favoris = false;
        $this->save();

    }

    public function institut(): BelongsTo
    {
        return $this->belongsTo(Institut::class, 'institutId');
    }
}
