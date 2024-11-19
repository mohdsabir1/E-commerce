import React from 'react'
import products from "../../data/product.json";
import ProductCard from './ProductCard';
export default function FeaturedProduct() {
    const featureProducts = products.filter(product => product.isFeature);
    // console.log("Feature", featureProducts)
  return (
    <div>
      <ProductCard products={featureProducts} />
    </div>
  )
}
