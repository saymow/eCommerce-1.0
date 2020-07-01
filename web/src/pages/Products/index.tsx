import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CartAdd } from "@styled-icons/boxicons-solid";

import { useGlobalState } from "../../Context/";
import Api from "../../Services/api";

import { Product } from '../../Types/cartRelated_types';

import { Container, ProductsWrapper, ProductList, ProductSelf } from "./styles";

const Products: React.FC = () => {
  const {
    cartManager: { dispatch },
  } = useGlobalState();
  const [products, setProducts] = useState<Product[]>([]);
  const history = useHistory();

  useEffect(() => {
    Api.get("/").then((response) => {
      const data = response.data;

      setProducts(data);
    });
  }, []);

  function handleInsertIntoCart(id: number) {
    const selectedProduct = products.find((product) => product.id === id);

    if (selectedProduct) {
      selectedProduct["qntd"] = 1;
      dispatch({
        type:"add-product",
        payload: selectedProduct
      });
    }
  }

  return (
    <Container>
      <ProductsWrapper>
        <ProductList>
          {products.map((product) => (
            <ProductSelf key={product.id}>
              <img
                src={product.image}
                alt={product.name}
                onClick={() =>
                  history.push(`product/${product.name}`, { id: product.id })
                }
              />
              <strong>{product.name}</strong>
              <span>R${product.price}</span>
              <CartAdd onClick={() => handleInsertIntoCart(product.id)} />
            </ProductSelf>
          ))}
        </ProductList>
      </ProductsWrapper>
    </Container>
  );
};

export default Products;
