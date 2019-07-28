<?php

namespace App\FxPro\User\Controllers;

use App\FxPro\User\Models\UserFilter\UserFilter;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class FilterController extends Controller
{
    public function saveFilter(Request $request) {
        $user = Auth::user();

        $requiredData['name'] = 'required';
        $requiredData['page'] = 'required';
        $requiredData['value'] = 'required';

        $this->validate($request, $requiredData);


        $filter = new UserFilter();

        $filter->user_id = $user->id;
        $filter->name = $request->input('name');
        $filter->page = $request->input('page');
        $filter->value = $request->input('value');

        $filter->save();


        return response()->success(compact('user'));
    }

    public function deleteFilter(Request $request) {
        $requiredData['id'] = 'required|exists:user_filters,id';

        $this->validate($request, $requiredData);

        $userFilterId = $request->input('id', 0);
        $filter = UserFilter::find($userFilterId);
        $filter->delete();
        return response()->success('OK');

    }

}

