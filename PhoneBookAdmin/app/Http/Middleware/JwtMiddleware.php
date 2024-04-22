<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenInvalidException;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Symfony\Component\HttpFoundation\Response;

class JwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            // Attempt to parse and authenticate the JWT token
            $user = JWTAuth::parseToken()->authenticate();
            // Log user information
            // Récupérer le token JWT depuis la requête
            $token = JWTAuth::getToken();

            // Rafraîchir le token si nécessaire
            if ($token && JWTAuth::check()) {
                $refreshedToken = JWTAuth::refresh($token);
                JWTAuth::setToken($refreshedToken);
                $response = $next($request);
                $response->headers->set('Authorization', 'Bearer ' . $refreshedToken);
                return $response;
            }

        } catch (TokenInvalidException $e) {
            // Token is invalid or expired
            return response()->json(['error' => 'Unauthorized'], 401);
        } catch (\Exception $e) {
            // Token not provided or other exceptions
            return response()->json(['error' => 'Token not provided'], 401);
        }

        // If token is authenticated, continue with the request
        return $next($request);
    }
}
