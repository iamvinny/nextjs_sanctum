This is a very simple implementation of [Laravel Sanctum](https://laravel.com/docs/11.x/sanctum#mobile-application-authentication) where we issue authentication tokens from the backend, and then use them to authenticate requests to the backend. Below is how the Laravel methods should be implemented.

## This documentation is not complete, it is just a guide on how to implement Laravel Sanctum with NextJs, if there is interest, I will complete it, and make a Laravel project as an example.

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

Update Profile
```php
public function updateUser(Request $request) {
    $request->validate([
        'first_name' => 'required',
        'last_name' => 'required',
        'email' => 'required|email',
        'phone' => 'required',
    ]);
    
    $user = $request->user();
    $user->first_name = $request->first_name;
    $user->last_name = $request->last_name;
    $user->email = $request->email;
    $user->phone = $request->phone;
    $user->save();
    
    return response()->json(['message' => 'User updated']);
}
```

Create a new user
```php
public function registerUser(Request $request) {
    $request->validate([
        'first_name' => 'required',
        'last_name' => 'required',
        'email' => 'required|email|unique:users',
        'phone' => 'required',
        'password' => 'required',
        'device_name' => 'required',
    ]);
    
    $user = new User;
    $user->first_name = $request->first_name;
    $user->last_name = $request->last_name;
    $user->email = $request->email;
    $user->phone = $request->phone;
    $user->password = Hash::make($request->password);
    $user->save();
    
    return response()->json([
        'token' => $user->createToken($request->device_name)->plainTextToken,
        'role' => $user->role,
    ]);
}
```

Logout
```php
public function logoutUser(Request $request) {
    $request->user()->currentAccessToken()->delete();
    return response()->json(['message' => 'Logged out']);
}
```

Make sure to include your backend URL in the `.env` file in the NextJs project.