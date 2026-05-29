<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ServiceController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Service::all());
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nom_service' => 'required|string|max:100',
            'icon'        => 'nullable|string|max:100',
        ]);

        $service = Service::create($validated);
        return response()->json($service, 201);
    }

    public function show(Service $service): JsonResponse
    {
        return response()->json($service->load('rooms'));
    }

    public function update(Request $request, Service $service): JsonResponse
    {
        $validated = $request->validate([
            'nom_service' => 'sometimes|string|max:100',
            'icon'        => 'nullable|string|max:100',
        ]);

        $service->update($validated);
        return response()->json($service->fresh());
    }

    public function destroy(Service $service): JsonResponse
    {
        $service->delete();
        return response()->json(['message' => 'Service deleted successfully.']);
    }
}
