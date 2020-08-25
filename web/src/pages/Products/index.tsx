import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

import { useGlobalState } from "../../Context/";
import Api from "../../Services/api";
import Loading from "../../Components/LoadingBars";

import { priceFormater } from "../../Utils/formaters";
import { Product } from "../../Types/cartRelated_types";

import {
  Container,
  LoadingContainer,
  ProductsWrapper,
  ProductList,
  ProductSelf,
  Options,
} from "./styles";

const Products: React.FC = () => {
  const {
    cartManager: { dispatch },
  } = useGlobalState();
  const [products, setProducts] = useState<Product[]>([]);
  const history = useHistory();

  useEffect(() => {
    Api.get("/products").then((response) => {
      const data = response.data;

      const serializedProduct = data.map(
        ({ price, convertedPrice, ...props }: Product) => ({
          ...props,
          price,
          convertedPrice: priceFormater(price),
        })
      );

      setProducts(serializedProduct);
    });
  }, []);

  function handleInsertIntoCart(id: number) {
    const selectedProduct = products.find((product) => product.id === id);

    if (selectedProduct) {
      selectedProduct["qntd"] = 1;
      dispatch({
        type: "add-product",
        payload: selectedProduct,
      });
    }
  }

  return products.length === 0 ? (
    <LoadingContainer>
      <Loading barQntd={5} delay={200} height={"35%"} width={"25%"} />
    </LoadingContainer>
  ) : (
    <Container>
      <ProductsWrapper>
        <ProductList>
          {products.map((product) => (
            <ProductSelf key={product.id}>
              <img
                src={product.image}
                alt={product.name}
                onClick={() => history.push(`product/${product.name}`)}
              />
              <strong>{product.name}</strong>
              <Options>
                <Link to={`product/${product.name}`}>Details</Link>
                <button onClick={() => handleInsertIntoCart(product.id)}>
                  Add to cart
                </button>
              </Options>
              <span>{product.convertedPrice}</span>
            </ProductSelf>
          ))}
        </ProductList>
      </ProductsWrapper>
    </Container>
  );
};

export default Products;
