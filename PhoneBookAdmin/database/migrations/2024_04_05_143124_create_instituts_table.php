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
        Schema::create('instituts', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('telephone_fixe',30)->nullable();
            $table->string('adresse',150)->nullable();
            $table->string('site_web',100)->nullable();
            $table->unsignedBigInteger('typeInstitutId');
            $table->foreign('typeInstitutId')->references('id')->on('type_instituts');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('instituts');
    }
};
