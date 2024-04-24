<?php

namespace App\Http\Controllers;

use App\Models\Pays;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UtilisateurController extends Controller
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
        return User::query()->orderBy('name')->paginate($size);
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
        // Messages de validation personnalisés
        $messages = [
            'name.required' => 'Le nom de l\'utilisateur est requis.',
            'name.string' => 'Le nom de l\'utilisateur doit être une chaîne de caractères.',
            'name.max' => 'Le nom de l\'utilisateur ne doit pas dépasser :max caractères.',
            'email.required' => 'L\'adresse e-mail est requise.',
            'email.string' => 'L\'adresse e-mail doit être une chaîne de caractères.',
            'email.email' => 'L\'adresse e-mail doit être une adresse e-mail valide.',
            'email.unique' => 'L\'adresse e-mail est déjà utilisée.',
            'email.max' => 'L\'adresse e-mail ne doit pas dépasser :max caractères.',
            'password.required' => 'Le mot de passe est requis.',
            'password.string' => 'Le mot de passe doit être une chaîne de caractères.',
            'password.min' => 'Le mot de passe doit comporter au moins :min caractères.',
            'role.required' => 'Le rôle de l\'utilisateur est requis.',
            'role.string' => 'Le rôle de l\'utilisateur doit être une chaîne de caractères.',
            'role.max' => 'Le rôle de l\'utilisateur ne doit pas dépasser :max caractères.',
        ];

        // Validation des données entrantes avec messages personnalisés
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users|max:255',
            'password' => 'required|string|min:8',
            'role' => 'required|string|max:255',
        ], $messages);

        if ($validator->fails()) {
            return response()->json(['status' => 422,'message' => $validator->errors()->first()], 422);
        }

        // Créer un nouvel utilisateur avec les données fournies
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->role = $request->role;

        // Sauvegarder l'utilisateur dans la base de données
        $user->save();

        // Retourner une réponse JSON pour indiquer que l'utilisateur a été créé avec succès
        return response()->json(['status' => 201,'message' => 'Utilisateur créé avec succès'], 201);

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
