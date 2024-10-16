This is a very simple implementation of [Laravel Sanctum](https://laravel.com/docs/11.x/sanctum#mobile-application-authentication) where we issue authentication tokens from the backend, and then use them to authenticate requests to the backend. Below is how the Laravel methods should be implemented.

```php
public function loginUser(Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
        'device_name' => 'required',
    ]);
    
    $user = User::where('email', $request->email)->first();
    
    if (! $user || ! Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }

    // return json
    return response()->json([
        'token' => $user->createToken($request->device_name)->plainTextToken
    ]);
}
```

And this request to return the authenticated user
```php
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
```

Logout
```php
public function logoutUser(Request $request) {
    $request->user()->currentAccessToken()->delete();
    return response()->json(['message' => 'Logged out']);
}
```

Make sure to include your backend URL in the `.env` file in the NextJs project.