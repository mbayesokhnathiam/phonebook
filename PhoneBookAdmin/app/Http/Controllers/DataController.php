<?php

namespace App\Http\Controllers;

use App\Models\Institut;
use App\Models\Pays;
use App\Models\TypeInstitut;
use App\Models\Ville;
use Illuminate\Http\Request;

class DataController extends Controller
{
    public function pays()
    {
        return Pays::all();
    }

    public function villes(Request $request)
    {
        $pays = $request->input('pays');
        return Ville::query()->where('paysId',$pays)->get();
    }

    public function typesInstituts(Request $request)
    {
        $ville = $request->input('ville');
        if($ville){
            return TypeInstitut::query()->where('villeId',$ville)->get();
        }

        return TypeInstitut::all();
    }


    public function instituts(Request $request)
    {
        $type = $request->input('type');
        $ville = $request->input('ville');

        if($type)
            return Institut::query()->where('typeInstitutId',$type)
                ->where('villeId',$ville)
                ->get();
        else
            return Institut::all();
    }

    public function search($id){

        $pays = Pays::with('villes.typeinstituts.instituts')->find($id);
        //$ville = Ville::with('typeInstituts.instituts')->find($villeId);
        //$typeInstitut = TypeInstitut::with('villes.instituts')->find($typeInstitutId);
        //$institut = Institut::with('contacts')->find($institutId);
        return $pays;
    }
}
