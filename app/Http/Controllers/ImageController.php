<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
class ImageController extends Controller
{
    public function show($path)
    {
        // Get the full storage path
        $fullPath = storage_path('app/public/' . $path);

        // Check if file exists
        if (!file_exists($fullPath)) {
            abort(404);
        }

        // Get the file mime type
        $mimeType = mime_content_type($fullPath);

        // Return the image with proper headers
        return response()->file($fullPath, [
            'Content-Type' => $mimeType,
            'Cache-Control' => 'public, max-age=86400',
        ]);
    }
}
