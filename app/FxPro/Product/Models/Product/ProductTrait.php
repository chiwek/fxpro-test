<?php
namespace App\FxPro\Product\Models\Product;


trait ProductTrait
{

    /**
     * @param $data
     * @return Product
     */
    public function createProduct($data) {
        $product = new Product();
        
        $product->name = $data['name'];

        $product->is_active = $data['is_active'] == "true" ? true : false;

        $product->save();

        $message = "Product created successfuly";

        $product->message = $message;

        return $product;
    }

    /**
     * @param Product $product entity
     * @param $data
     * @return Product
     */
    public function updateProduct(Product $product, $data) {

        $product->name = $data['name'];

        $product->is_active = $data['is_active'] == "true" ? true : false;

        $product->save();

        $message = "Product updated successfully";

        $product->message = $message;

        return $product;
    }


}