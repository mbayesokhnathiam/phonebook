<?php

namespace App\Http\Controllers;

use App\Imports\ContactImport;
use App\Models\Contact;
use App\Models\ContactTmp;
use App\Models\TypeInstitut;
use App\Models\Ville;
use App\Rules\ExcelColumnNames;
use App\Rules\ExcelFormat;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;

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


    public function importContact(Request $request)
    {
        $request->validate([
            'fichier' => ['required','file', new ExcelFormat, new ExcelColumnNames(['prenom', 'nom','fonction','telephone_fixe','telephone_mobile','telephone_domicile', 'email','commentaire'])],
        ], [
            'fichier.required' => 'Le fichier excel est requis.',
            'fichier.excel_format' => 'Le fichier doit être un fichier Excel avec une extension .xlsx ou .xls.',
        ]);

        try{

            $institut = $request->institutId;
            ContactTmp::truncate();
            Excel::import(new ContactImport, $request->file('fichier'));

            $tmp = ContactTmp::all();

            $tmp->map(function ($item, $key) use ($institut) {

                $item->institutId = $institut; // Remplacez 123 par la valeur souhaitée pour 'institutId'
                return $item;
            });


            foreach ($tmp as $item) {
                // Transformer l'objet en tableau
                $itemArray = $item->toArray();

                // Créer un nouvel enregistrement dans la table 'contacts' en utilisant le tableau
                Contact::create($itemArray);
            }

            $nb = ContactTmp::all()->count();
            return response()->json(['status' => 201,'message'=>$nb.' Contact(s) importé(s)!',201]);
        }catch(\Exception $ex){
            Log::info($ex);
            return response()->json(['status' => 422,'message'=>'Une erreur est survenue, veuillez ressayer',400]);

        }
    }



}
