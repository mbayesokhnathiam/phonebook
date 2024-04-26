<?php

namespace App\Http\Controllers;

use App\Models\Institut;
use App\Models\TypeInstitut;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;

class InstitutionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $page = $request->input('page');
        $type = $request->input('type');
        $size = 10;
        Paginator::currentPageResolver(function () use ($page) {
            return $page;
        });
        return Institut::query()->where('typeInstitutId', $type)->orderBy('nom')->paginate($size);
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
            $updated = Institut::find($request->id)->update($data);

            if($updated){
                return response()->json([
                    'status' => 201, 'message' => 'Institution mis à jour avec succès!'
                ]);
            }
        }else{

            $saved = Institut::create($data);

            if($saved){
                return response()->json([
                    'status' => 201, 'message' => 'Institution créé avec succès!'
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
        $institution = Institut::with('contacts')->find($id);

        if($institution->contacts->count() > 0){
            return response()->json([
                'status' => 400, 'message' => 'Cette institution ne peut pas être supprimée, veuillez supprimer les contacts associées à cette institution!'
            ]);
        }

        $institution->delete();

        return response()->json([
            'status' => 200, 'message' => 'Institution supprimée avec succès!'
        ]);
    }
}
