<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('instituts', function (Blueprint $table) {

            // Ajouter la nouvelle colonne villeId
            $table->unsignedBigInteger('villeId')->after('site_web')->nullable();
            // Ajouter la clé étrangère vers la table villes
            $table->foreign('villeId')->references('id')->on('villes');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('instituts', function (Blueprint $table) {
            $table->dropForeign(['villeId']);
            // Supprimer la colonne villeId
            $table->dropColumn('villeId');
            // Ajouter la colonne typeInstitutId

        });
    }
};
