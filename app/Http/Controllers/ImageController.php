<?php
// app/Http/Controllers/ImageController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class ImageController extends Controller
{
    /**
     * Display an image from storage.
     * The path should be the full storage path without "storage/" prefix.
     * Example: "cervical-images/folder/image.jpg"
     *
     * @param string $path
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, string $path)
    {
        try {
            // Decode the path if it's URL encoded
            $path = urldecode($path);

            // Remove any leading slashes
            $path = ltrim($path, '/');

            // The path is used directly - no prefix added
            $fullPath = $path;

            // Check if file exists in public storage
            if (!Storage::disk('public')->exists($fullPath)) {
                Log::warning('Image not found', ['path' => $fullPath]);
                return $this->getFallbackImage();
            }

            // Get file content and mime type
            $file = Storage::disk('public')->get($fullPath);
            $mimeType = Storage::disk('public')->mimeType($fullPath);

            // Check if the mime type is an image
            if (!$this->isImageType($mimeType)) {
                Log::warning('Invalid image type', ['path' => $fullPath, 'mime' => $mimeType]);
                return $this->getFallbackImage();
            }

            // Build response with caching headers
            $response = Response::make($file, 200);
            $response->header('Content-Type', $mimeType);
            $response->header('Content-Disposition', 'inline; filename="' . basename($path) . '"');

            // Add cache headers for better performance
            $response->header('Cache-Control', 'public, max-age=86400'); // 24 hours
            $response->header('Expires', gmdate('D, d M Y H:i:s \G\M\T', time() + 86400));

            return $response;

        } catch (\Exception $e) {
            Log::error('Image serving error', [
                'path' => $path,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return $this->getFallbackImage();
        }
    }

    /**
     * Display a cervical image.
     * The path should NOT include "cervical-images/" prefix.
     * Example: "f8d6fc68-e1fc-4499-8496-6adeba3f0900/image.jpg"
     *
     * @param string $path
     * @return \Illuminate\Http\Response
     */
    public function showCervicalImage(Request $request, string $path)
    {
        try {
            // Decode the path if it's URL encoded
            $path = urldecode($path);

            // Remove any leading slashes
            $path = ltrim($path, '/');

            // Add the cervical-images prefix
            $fullPath = 'cervical-images/' . $path;

            // Check if file exists in public storage
            if (!Storage::disk('public')->exists($fullPath)) {
                Log::warning('Cervical image not found', ['path' => $fullPath]);
                return $this->getFallbackImage();
            }

            // Get file content and mime type
            $file = Storage::disk('public')->get($fullPath);
            $mimeType = Storage::disk('public')->mimeType($fullPath);

            // Check if the mime type is an image
            if (!$this->isImageType($mimeType)) {
                Log::warning('Invalid image type', ['path' => $fullPath, 'mime' => $mimeType]);
                return $this->getFallbackImage();
            }

            // Build response with caching headers
            $response = Response::make($file, 200);
            $response->header('Content-Type', $mimeType);
            $response->header('Content-Disposition', 'inline; filename="' . basename($path) . '"');

            // Add cache headers for better performance
            $response->header('Cache-Control', 'public, max-age=86400'); // 24 hours
            $response->header('Expires', gmdate('D, d M Y H:i:s \G\M\T', time() + 86400));

            return $response;

        } catch (\Exception $e) {
            Log::error('Cervical image serving error', [
                'path' => $path,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return $this->getFallbackImage();
        }
    }

    /**
     * Display an image using query parameter.
     * Example: /image?path=cervical-images/folder/image.jpg
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function showByPath(Request $request)
    {
        $path = $request->query('path');

        if (empty($path)) {
            return $this->getFallbackImage();
        }

        return $this->show($request, $path);
    }

    /**
     * Upload a cervical image.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function uploadCervicalImage(Request $request)
    {
        try {
            $request->validate([
                'image' => 'required|image|max:10240', // Max 10MB
                'patient_id' => 'required|uuid',
                'visit_id' => 'nullable|uuid',
                'image_type' => 'nullable|in:original,processed,annotation',
            ]);

            $file = $request->file('image');
            $patientId = $request->patient_id;
            $visitId = $request->visit_id;

            // Generate unique filename
            $uuid = Str::uuid();
            $fileName = $uuid . '.' . $file->getClientOriginalExtension();

            // Build path: cervical-images/{patient_id}/{visit_id}/{uuid}.jpg
            $path = 'cervical-images/' . $patientId;
            if ($visitId) {
                $path .= '/' . $visitId;
            }

            // Store the image - returns the full storage path
            $storedPath = Storage::disk('public')->putFileAs($path, $file, $fileName);

            // Generate the URL using the correct route
            // The path for the route should NOT include "cervical-images/" prefix
            $relativePath = str_replace('cervical-images/', '', $storedPath);

            return response()->json([
                'success' => true,
                'message' => 'Image uploaded successfully',
                'path' => $storedPath, // Full storage path
                'url' => route('cervical.image.show', ['path' => $relativePath]),
                'uuid' => $uuid,
            ]);

        } catch (\Exception $e) {
            Log::error('Cervical image upload error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to upload image: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Check if the mime type is an image.
     *
     * @param string $mimeType
     * @return bool
     */
    private function isImageType(string $mimeType): bool
    {
        $imageTypes = [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/gif',
            'image/webp',
            'image/bmp',
            'image/svg+xml',
            'image/tiff',
            'image/x-icon',
            'image/heic',
            'image/heif',
        ];

        return in_array($mimeType, $imageTypes);
    }

    /**
     * Get fallback image when the requested image is not found.
     *
     * @return \Illuminate\Http\Response
     */
    private function getFallbackImage()
    {
        // Check if custom fallback image exists
        $fallbackPath = 'images/no-image.jpg';

        if (Storage::disk('public')->exists($fallbackPath)) {
            $file = Storage::disk('public')->get($fallbackPath);
            $mimeType = Storage::disk('public')->mimeType($fallbackPath);

            return Response::make($file, 404)
                ->header('Content-Type', $mimeType)
                ->header('Cache-Control', 'public, max-age=3600');
        }

        // Return SVG placeholder with 404 status
        $svg = $this->generatePlaceholderSVG('Image Not Found');

        return Response::make($svg, 404)
            ->header('Content-Type', 'image/svg+xml')
            ->header('Cache-Control', 'public, max-age=3600');
    }

    /**
     * Generate a placeholder SVG image.
     *
     * @param string $text
     * @param int $width
     * @param int $height
     * @return string
     */
    private function generatePlaceholderSVG(string $text = 'No Image', int $width = 400, int $height = 400): string
    {
        return <<<SVG
<svg xmlns="http://www.w3.org/2000/svg" width="{$width}" height="{$height}">
    <rect width="{$width}" height="{$height}" fill="#e2e8f0"/>
    <text x="200" y="180" font-family="Arial, sans-serif" font-size="24" fill="#94a3b8" text-anchor="middle" dominant-baseline="middle">
        {$text}
    </text>
    <text x="200" y="220" font-family="Arial, sans-serif" font-size="14" fill="#94a3b8" text-anchor="middle" dominant-baseline="middle">
        (Image Not Found)
    </text>
</svg>
SVG;
    }
}
