<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    private const FLAG_PROVIDER = 1 << 0;

    private const FLAG_ADMIN = 1 << 1;

    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'flags' => $this->getUserFlags($request),
        ];
    }

    private function getUserFlags(Request $request): ?int
    {
        if (! $request->user()) {
            return null;
        }

        $accountFlags = 0;
        if ($request->user()->employee) {
            $accountFlags |= self::FLAG_PROVIDER;
        }

        if (str_contains($request->user()->email, 'ufl.edu')) {
            $accountFlags |= self::FLAG_ADMIN;
        }

        return $accountFlags;
    }
}
