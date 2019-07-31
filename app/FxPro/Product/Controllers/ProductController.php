<?php

namespace App\FxPro\Product\Controllers;


use App\FxPro\Product\Models\Product\Product;
use App\FxPro\Product\Models\Product\ProductInterface;
use App\FxPro\Product\Models\Product\ProductTrait;
use App\FxPro\User\Models\ActionLog\ActionLog;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;


class ProductController extends Controller
{
    use ProductTrait;

    /**
     * @var ProductInterface
     */
    private $productRepo;

    public function __construct(ProductInterface $userRepo)
    {
        $this->productRepo = $userRepo;
    }

    public function getItems(Request $request)
    {

        $perPage = $request->has('perPage') ? $request->input('perPage') : 10;
        $order = $request->has('order') ? $request->get('order') : 'products.name';
        $sort = $request->has('sort') ? $request->get('sort') : 'asc';

        $filterParams = [
            'name' => $request->has('name') ? $request->input('name') : "",
            'isActive' => $request->has('isActive') ? $request->input('isActive') : "",
        ];

        $sort = explode(",", $sort);
        $order = explode(",", $order);

        $products = $this->productRepo->filter(
            $filterParams['name'],
            $order,
            $sort,
            $perPage,
            $filterParams['isActive']
        );

        return response()->success(compact('products'));
    }



    public function getProduct(Request $request)
    {

        $product = Product::find($request->input('id'));

        return response()->success(compact('product'));
    }

    public function processForm(Request $request)
    {

        $id = $request->input('id', 0);
        $requiredData = [
            'name' => 'required',
        ];

        if ($id > 0) {
            $requiredData['id'] = 'required|exists:products,id';
        }

        $this->validate($request, $requiredData);
        $data = $request->all();

        if ($id == 0) {
            $product = $this->createProduct($data);
        } else {
            $product = Product::find($id);
            $product = $this->updateProduct($product, $data);
        }
        return response()->success(compact('product'));
    }

    public function deleteProduct(Request $request) {
        $requiredData['id'] = 'required|exists:products,id';
        $this->validate($request, $requiredData);

        $authUser = Auth::user();
        if (!$authUser->canDelete()) {
            return response()->error('NO ACCESS');
        }

        $product = Product::find($request->input('id'));
        $product->is_active = false;
        $product->save();

        ActionLog::create([
            'user_id' => Auth::user()->id,
            'resource_name' => 'Product',
            'resource_id' => $product->id,
            'action' => 'Delete'
        ]);

        return response()->success('OK');
    }

}
