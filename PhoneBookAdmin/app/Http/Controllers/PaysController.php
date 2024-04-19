<?php

namespace App\Http\Controllers;

use App\Models\Pays;
use App\Models\Ville;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;

class PaysController extends Controller
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
        return Pays::query()->orderBy('nom_fr_fr')->paginate($size);
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
            $updated = Pays::find($request->id)->update($data);

            if($updated){
                return response()->json([
                    'status' => 201, 'message' => 'Pays mis à jour avec succès!'
                ]);
            }
        }else{

            $saved = Pays::create($data);

            if($saved){
                return response()->json([
                    'status' => 201, 'message' => 'Pays crée avec succès!'
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
        //
    }
}
