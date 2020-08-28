import React, { useState, useEffect, ChangeEvent } from "react";
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
  FiltersWrapper,
  NoQueryMatches,
  SearcherInput,
  ProductList,
  ProductSelf,
  Options,
  SadIcon
} from "./styles";

type FilterOptions = "default" | "PriceHtoL" | "PriceLtoH";

const Products: React.FC = () => {
  const history = useHistory();

  const {
    cartManager: { dispatch },
  } = useGlobalState();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

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
      setFilteredProducts(serializedProduct);
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

  function handleTextFilter(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;

    let orderedProducts = products.filter((product) => {
      return (
        product.name.slice(0, value.length).toLocaleLowerCase() ===
        value.toLocaleLowerCase()
      );
    });

    setFilteredProducts(orderedProducts);
  }

  function handleOptionsFilter(e: ChangeEvent<HTMLSelectElement>) {
    const { value } = e.target;

    const Options = {
      default: (): Product[] => filteredProducts,
      PriceLtoH: (): Product[] =>
        filteredProducts.slice().sort((a, b) => a.price - b.price),
      PriceHtoL: (): Product[] =>
        filteredProducts.slice().sort((a, b) => b.price - a.price),
    };

    const newFilteredProducts = Options[value as FilterOptions]();

    setFilteredProducts(newFilteredProducts);
  }

  return products.length === 0 ? (
    <LoadingContainer>
      <Loading barQntd={5} delay={200} height={"35%"} width={"25%"} />
    </LoadingContainer>
  ) : (
    <Container>
      <ProductsWrapper>
        <FiltersWrapper>
          <div>
            <div>
              <strong>Order by</strong>
              <select
                name="orderSelect"
                id="orderSelect"
                onChange={handleOptionsFilter}
              >
                <option value="default">Not sorted</option>
                <option value="PriceLtoH">Price: Low to High</option>
                <option value="PriceHtoL">Price: High to Low</option>
              </select>
            </div>
            <SearcherInput
              type="text"
              name="searchInput"
              placeholder="Search..."
              onChange={handleTextFilter}
            />
          </div>
        </FiltersWrapper>
        {filteredProducts.length === 0 ? (
          <NoQueryMatches>
            <h1>Your query haven't matched anything</h1>
            <SadIcon />
          </NoQueryMatches>
        ) : (
          <ProductList>
            {filteredProducts.map((product) => (
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
        )}
      </ProductsWrapper>
    </Container>
  );
};

export default Products;
