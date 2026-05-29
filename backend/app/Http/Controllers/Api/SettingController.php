<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class SettingController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Setting::all()->pluck('value', 'key'));
    }

    public function show(string $key): JsonResponse
    {
        $value = Setting::getValue($key);

        if ($value === null) {
            return response()->json(['message' => "Setting '{$key}' not found."], 404);
        }

        return response()->json(['key' => $key, 'value' => $value]);
    }

    public function upsert(Request $request): JsonResponse
    {
        $request->validate([
            'settings'       => 'required|array',
            'settings.*.key' => 'required|string|max:100',
            'settings.*.value' => 'required',
        ]);

        foreach ($request->settings as $item) {
            Setting::setValue($item['key'], $item['value']);
        }

        return response()->json(['message' => 'Settings updated successfully.']);
    }

    public function destroy(string $key): JsonResponse
    {
        $deleted = Setting::where('key', $key)->delete();

        if (!$deleted) {
            return response()->json(['message' => "Setting '{$key}' not found."], 404);
        }

        return response()->json(['message' => "Setting '{$key}' deleted."]);
    }
}
