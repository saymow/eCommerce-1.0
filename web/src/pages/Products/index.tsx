import React, { useState, useEffect } from "react";
import { CartAdd } from "@styled-icons/boxicons-solid";

import { useGlobalState } from "../../context/index";
import Api from "../../services/api";

import { Container, ProductsWrapper, ProductList, Product } from "./styles";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

const Products: React.FC = () => {
  const { cartManager: { addProductToCart } } = useGlobalState();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    Api.get("/").then((response) => {
      const data = response.data;

      setProducts(data);
    });
  }, []);

  function handleInsertIntoCart(id: number) {
    const selectedProduct = products.find(product => product.id === id);
    
    if (selectedProduct) addProductToCart(selectedProduct);
  }

  return (
    <Container>
      <ProductsWrapper>
        <ProductList>
          {products.map((product) => (
            <Product key={product.id}>
              <img
                src={product.image}
                alt={product.name}
              />
              <strong>{product.name}</strong>
              <span>R${product.price}</span>
              <CartAdd onClick={() => handleInsertIntoCart(product.id)}/>
            </Product>
          ))}
        </ProductList>
      </ProductsWrapper>
    </Container>
  );
};

export default Products;
