<?php

namespace App\Http\Controllers;

use App\Models\TypeInstitut;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;

class TypeInstitutionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $page = $request->input('page');
        $size = 10;

        Paginator::currentPageResolver(function () use ($page) {
            return $page;
        });

        // Utilisez une requête pour récupérer les données paginées
        return TypeInstitut::paginate($size);
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
            $updated = TypeInstitut::find($request->id)->update($data);

            if($updated){
                return response()->json([
                    'status' => 201, 'message' => 'Type institution mis à jour avec succès!'
                ]);
            }
        }else{

            $saved = TypeInstitut::create($data);

            if($saved){
                return response()->json([
                    'status' => 201, 'message' => 'Type institution créé avec succès!'
                ]);
            }
        }



        return response()->json([
            'status' => 400, 'message' => 'Une erreur est survenue lors de la création!'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
        $type = TypeInstitut::find($id);

        if($type->instituts->count() > 0){
            return response()->json([
                'status' => 400, 'message' => 'Ce type d\'institution ne peut pas être supprimée, veuillez supprimer les institution associées à ce type d\'institution!'
            ]);
        }

        $type->delete();

        return response()->json([
            'status' => 200, 'message' => 'Ce type d\'institution supprimé avec succès!'
        ]);
    }
}
