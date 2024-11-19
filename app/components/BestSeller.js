import React from 'react'
import products from "../../data/product.json";
import ProductCard from './ProductCard';

export default function BestSeller() {
   
const bestSellers = products.filter(product => product.isBestSeller);
// console.log("Best Seller", bestSellers)

  return (
    <div>
      <ProductCard  products={bestSellers}/>
    </div>
  )
}
