<?php

namespace App\Utils;

class CountrieTreeConverter
{
    public static function convertToTree($pays)
    {
        $tree = [];

        $tree[] = [
            'id' => $pays->id,
            'name' => $pays->nom_fr_fr,
            'expanded' => false,
            'children' => self::convertVillesToTree($pays->villes)
        ];

        return $tree;
    }

    public static function convertVillesToTree($villes)
    {
        $tree = [];

        foreach ($villes as $ville) {
            $villeNode = [
                'id' => $ville->id,
                'name' => $ville->nom,
                'expanded' => false,
                'children' => self::convertTypeInstitutsToTree($ville->typeInstituts)
            ];
            $tree[] = $villeNode;
        }

        return $tree;
    }

    public static function convertTypeInstitutsToTree($typeInstituts)
    {
        $tree = [];

        foreach ($typeInstituts as $typeInstitut) {
            $typeInstitutNode = [
                'id' => $typeInstitut->id,
                'name' => $typeInstitut->nom,
                'expanded' => false,
                'children' => self::convertInstitutsToTree($typeInstitut->instituts)
            ];
            $tree[] = $typeInstitutNode;
        }

        return $tree;
    }

    public static function convertInstitutsToTree($instituts)
    {
        $tree = [];

        foreach ($instituts as $institut) {
            $institutNode = [
                'id' => $institut->id,
                'name' => $institut->nom,
                'expanded' => false,
            ];
            $tree[] = $institutNode;
        }

        return $tree;
    }
}
