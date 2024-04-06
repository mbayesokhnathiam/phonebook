<?php

namespace App\Utils;

class VilleTreeConverter
{
    public static function convertSingleVilleToTree($ville)
    {
        $villeNode = [];
        $villeNode [] = [
            'name' => $ville->nom,
            'expanded' => false,
            'children' => self::convertTypeInstitutsToTree($ville->typeInstituts)
        ];

        return $villeNode;
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
