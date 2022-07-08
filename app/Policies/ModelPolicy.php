<?php

namespace App\Policies;

use App\Models\System\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ModelPolicy
{
    use HandlesAuthorization;

    public function __construct()
    {
        //
    }

    public function viewAny(User $user)
    {
        dd($user);
        return true;
    }

    public function view(User $user, $product)
    {
        dd($user);
        return true;
    }

    public function create(User $user)
    {
        dd($user);
        //
    }

    public function update(User $user, $product)
    {
        dd($user);
        //
    }

    public function delete(User $user, $product)
    {
        dd($user);
        //
    }

    public function restore(User $user, $product)
    {
        dd($user);
        //
    }

    public function forceDelete(User $user, $product)
    {
        dd($user);
        //
    }
}
