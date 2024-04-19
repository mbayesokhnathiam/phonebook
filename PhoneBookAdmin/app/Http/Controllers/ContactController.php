<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\Institut;
use App\Models\Pays;
use App\Models\TypeInstitut;
use App\Models\Ville;
use App\Utils\CountrieTreeConverter;
use App\Utils\TypeInstitutTreeConverter;
use App\Utils\VilleTreeConverter;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $pays = $request->input('pays');
        $ville = $request->input('ville');
        $type = $request->input('type');
        $institut = $request->input('institut');
        $page = $request->input('page');
        $size = 10;

        if($institut){
            Paginator::currentPageResolver(function () use ($page) {
                return $page;
            });
            return Contact::query()->where('institutId', $institut)->paginate($size);
        }

        if($type){
            $data = TypeInstitut::with('instituts')->find($type);
            return response()->json([
                'type' => 'type',
                'data' => TypeInstitutTreeConverter::convertTypeInstitutsToTree($data)
            ]);

        }

        if($ville){
            $data = Ville::with('typeInstituts.instituts')->find($ville);
            $tree = VilleTreeConverter::convertSingleVilleToTree($data);
            return response()->json([
                'type' => 'ville',
                'data' => $tree
            ]);
        }

        if($pays){
            $data = Pays::with('villes.typeInstituts.instituts')->find($pays);
            $tree = CountrieTreeConverter::convertToTree($data);
            return response()->json([
                'type' => 'pays',
                'data' => $tree
            ]);
        }

        return response()->json([
            'type' => 'all',
            'data' => Pays::all()
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();

        if($request->id){
            $updated = Contact::find($request->id)->update($data);

            if($updated){
                return response()->json([
                    'status' => 201, 'message' => 'Contact mis à jour avec succès!'
                ]);
            }
        }else{
            $saved = Contact::create($data);

            if($saved){
                return response()->json([
                    'status' => 201, 'message' => 'Contact créé avec succès!'
                ]);
            }
        }


        return response()->json([
            'status' => 400, 'message' => 'Une erreur est survenue, veuillez contacter l\'administrateur!'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Contact::with('institut.typeInstitut.ville.pays')->find($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function formatContact()
    {
        $contacts = Contact::with('institut.typeinstitut.ville.pays')
            ->orderBy('nom')
            ->get(); // Récupère toutes les villes avec leurs pays


        //return $contacts;

        $formattedData = $contacts->map(function ($contact) {

            return [
                'id' => $contact->id,
                'nom' => $contact->prenom.' '.$contact->nom.' / '.$contact->fonction.' / '.$contact->institut->nom.' / '.$contact->institut->typeinstitut->nom.' / '.$contact->institut->typeinstitut->ville->nom.' / '.$contact->institut->typeinstitut->ville->pays->nom_fr_fr

            ];
        });


        return response()->json($formattedData);

    }


}
