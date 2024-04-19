<?php

namespace App\Http\Controllers;

use App\Models\TypeInstitut;
use App\Models\Ville;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;

class VilleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $page = $request->input('page');
        $pays = $request->input('pays');
        $size = 10;
        Paginator::currentPageResolver(function () use ($page) {
            return $page;
        });
        return Ville::query()->where('paysId', $pays)->paginate($size);
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
            $updated = Ville::find($request->id)->update($data);

            if($updated){
                return response()->json([
                    'status' => 201, 'message' => 'Ville mise à jour avec succès!'
                ]);
            }
        }else{

            $saved = Ville::create($data);

            if($saved){
                return response()->json([
                    'status' => 201, 'message' => 'Ville créée avec succès!'
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
