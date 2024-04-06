<?php

namespace App\Utils;

class TypeInstitutTreeConverter
{
    public static function convertTypeInstitutsToTree($typeInstitut)
    {
        $tree = [];
        $tree [] = [
            'id' => $typeInstitut->id,
            'name' => $typeInstitut->nom,
            'expanded' => false,
            'children' => self::convertInstitutsToTree($typeInstitut->instituts)
        ];


        return $tree;
    }

    public static function convertInstitutsToTree($instituts){
        $tree = [];

        foreach ($instituts as $institut) {
            $institutNode = [
                'id' => $institut->id,
                'name' => $institut->nom,
                //'expanded' => false,
            ];
            $tree[] = $institutNode;
        }

        return $tree;
    }
}
