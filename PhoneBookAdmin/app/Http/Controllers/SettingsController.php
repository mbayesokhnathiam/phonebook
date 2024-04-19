<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\TypeInstitut;
use App\Models\Ville;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;

class SettingsController extends Controller
{
    public function paginateTypeInstitut(Request $request)
    {
        $page = $request->input('page');
        $ville = $request->input('ville');
        $size = 10;
        Paginator::currentPageResolver(function () use ($page) {
            return $page;
        });
        return TypeInstitut::query()->where('villeId', $ville)->paginate($size);
    }

    public function formatVille()
    {
        $villes = Ville::with('pays')
            ->orderBy('nom')
            ->get(); // Récupère toutes les villes avec leurs pays

        $formattedData = $villes->map(function ($ville) {
            return [
                'id' => $ville->id,
                'nom' => $ville->nom.' / '.$ville->pays->nom_fr_fr // Supposant que vous voulez le nom du pays en français
            ];
        });

        return response()->json($formattedData);
    }

    public function formatType()
    {
        $types = TypeInstitut::with('ville.pays')
            ->orderBy('nom')
            ->get(); // Récupère toutes les villes avec leurs pays

        $formattedData = $types->map(function ($type) {
            return [
                'id' => $type->id,
                'nom' => $type->nom.' / '.$type->ville->nom.' / '.$type->ville->pays->nom_fr_fr // Supposant que vous voulez le nom du pays en français
            ];
        });


        return response()->json($formattedData);
    }


}
