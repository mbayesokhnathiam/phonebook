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
        Schema::create('contacts', function (Blueprint $table) {
            $table->id();
            $table->string('prenom',100);
            $table->string('nom',100);
            $table->string('adresse',150)->nullable();
            $table->string('fonction',100);
            $table->string('telephone_fixe',30)->nullable();
            $table->string('telephone_mobile',30);
            $table->string('site_web',100)->nullable();
            $table->string('email',100)->nullable();
            $table->text('commentaire')->nullable();
            $table->unsignedBigInteger('institutId');
            $table->foreign('institutId')->references('id')->on('instituts');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contacts');
    }
};
