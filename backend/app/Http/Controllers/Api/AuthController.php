<?php

// namespace App\Http\Controllers\Api;

// use App\Http\Controllers\Controller;
// use App\Models\User;
// use App\Models\UserDetail;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Hash;
// use Illuminate\Support\Facades\DB;
// use Illuminate\Support\Facades\Validator;
// use Illuminate\Validation\Rules\Password;

// class AuthController extends Controller
// {
//     /**
//      * تسجيل مستخدم جديد (Client)
//      */
//     public function register(Request $request)
//     {
//         // التحقق من البيانات
//         $validator = Validator::make($request->all(), [
//             'nom'       => 'required|string|max:100',
//             'prenom'    => 'required|string|max:100',
//             'email'     => 'required|email|unique:users,email',
//             'telephone' => 'required|string|max:20',
//             'password'  => ['required', 'confirmed', Password::min(8)],
//         ]);

//         if ($validator->fails()) {
//             return response()->json([
//                 'success' => false,
//                 'message' => 'بيانات غير صالحة',
//                 'errors'  => $validator->errors()
//             ], 422);
//         }

//         try {
//             return DB::transaction(function () use ($request) {
//                 // 1. إنشاء المستخدم (الدور الافتراضي كليان)
//                 $user = User::create([
//                     'nom'       => $request->nom,
//                     'prenom'    => $request->prenom,
//                     'email'     => $request->email,
//                     'telephone' => $request->telephone,
//                     'password'  => Hash::make($request->password),
//                     'role'      => 'client',
//                 ]);

//                 // 2. إنشاء تفاصيل المستخدم الإضافية
//                 UserDetail::create([
//                     'user_id' => $user->id,
//                 ]);

//                 // 3. إنشاء التوكن (Sanctum)
//                 $token = $user->createToken('auth_token')->plainTextToken;

//                 return response()->json([
//                     'success'      => true,
//                     'access_token' => $token,
//                     'token_type'   => 'Bearer',
//                     'user'         => $user
//                 ], 201);
//             });
//         } catch (\Exception $e) {
//             return response()->json([
//                 'success' => false,
//                 'message' => 'خطأ في الخادم: ' . $e->getMessage(),
//             ], 500);
//         }
//     }

//     /**
//      * تسجيل الدخول (يدعم Admin و Client)
//      */
//     public function login(Request $request)
//     {
//         $validator = Validator::make($request->all(), [
//             'email'    => 'required|email',
//             'password' => 'required',
//         ]);

//         if ($validator->fails()) {
//             return response()->json([
//                 'success' => false,
//                 'message' => 'يرجى إدخال البريد وكلمة المرور',
//                 'errors'  => $validator->errors()
//             ], 422);
//         }

//         // البحث عن المستخدم ببريده الإلكتروني
//         $user = User::where('email', $request->email)->first();

//         // التحقق من وجود المستخدم وصحة كلمة المرور
//         if (!$user || !Hash::check($request->password, $user->password)) {
//             return response()->json([
//                 'success' => false,
//                 'message' => 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
//             ], 401);
//         }

//         // إنشاء التوكن
//         $token = $user->createToken('auth_token')->plainTextToken;

//         return response()->json([
//             'success'      => true,
//             'access_token' => $token,
//             'token_type'   => 'Bearer',
//             'user'         => [
//                 'id'        => $user->id,
//                 'nom'       => $user->nom,
//                 'prenom'    => $user->prenom,
//                 'email'     => $user->email,
//                 'role'      => $user->role, // مهم جداً للتحويل في React
//                 'telephone' => $user->telephone
//             ]
//         ], 200);
//     }

//     /**
//      * تسجيل الخروج
//      */
//     public function logout(Request $request)
//     {
//         // حذف التوكن الحالي
//         $request->user()->currentAccessToken()->delete();

//         return response()->json([
//             'success' => true,
//             'message' => 'تم تسجيل الخروج بنجاح'
//         ]);
//     }
// }

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'password or username incorrect',
                'errors'  => $validator->errors()
            ], 422);
        }

        // البحث عن المستخدم
        $user = User::where('email', $request->email)->first();

        // التحقق من كلمة المرور
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => ' ',
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success'      => true,
            'access_token' => $token,
            'token_type'   => 'Bearer',
            'user'         => [
                'id'        => $user->id,
                'nom'       => $user->nom,
                'prenom'    => $user->prenom,
                'email'     => $user->email,
                'role'      => $user->role,
                'telephone' => $user->telephone
            ]
        ], 200);
    }


    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom'       => 'required|string|max:100',
            'prenom'    => 'required|string|max:100',
            'email'     => 'required|email|unique:users,email',
            'telephone' => 'required|string|max:20',
            'password'  => ['required', 'confirmed', Password::min(8)],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'بيانات التسجيل غير صالحة',
                'errors'  => $validator->errors()
            ], 422);
        }

        try {
            return DB::transaction(function () use ($request) {
                // إنشاء الحساب بـ Role افتراضي 'client'
                $user = User::create([
                    'nom'       => $request->nom,
                    'prenom'    => $request->prenom,
                    'email'     => $request->email,
                    'telephone' => $request->telephone,
                    'password'  => Hash::make($request->password),
                    'role'      => 'client',
                ]);

                // إنشاء سجل التفاصيل المرتبط
                UserDetail::create([
                    'user_id' => $user->id,
                ]);

                $token = $user->createToken('auth_token')->plainTextToken;

                return response()->json([
                    'success'      => true,
                    'access_token' => $token,
                    'user'         => $user
                ], 201);
            });
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'حدث خطأ أثناء التسجيل: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * تسجيل الخروج
     */
    public function logout(Request $request)
    {
        // حذف التوكن الحالي للمستخدم
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'تم تسجيل الخروج بنجاح'
        ]);
    }
}
