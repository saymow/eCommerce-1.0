import React, { useState, useEffect, ChangeEvent } from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { useGlobalState } from "context";
import Api from "services/api";
import Loading from "components/LoadingBars";

import { priceFormater } from "utils/formaters";
import { Product } from "types/cartRelated_types";

import Layout from "components/Layout";

import {
  Container,
  FiltersWrapper,
  NoQueryMatches,
  SearcherInput,
  ProductList,
  ProductSelf,
  Options,
  SadIcon,
} from "styles/pages/products";

type FilterOptions = "default" | "PriceHtoL" | "PriceLtoH";

const Products: React.FC<{ data: Product[] }> = ({ data: products }) => {
  const history = useRouter();

  const {
    cartManager: { dispatch },
  } = useGlobalState();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

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

  return (
    <Layout>
      {products.length === 0 ? (
        <Loading barQntd={5} delay={200} height={"35%"} width={"25%"} />
      ) : (
        <Container>
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
                    <Link
                      href={`/product/[name]`}
                      as={`/product/${encodeURIComponent(product.name)}`}
                    >
                      Details
                    </Link>
                    <button onClick={() => handleInsertIntoCart(product.id)}>
                      Add to cart
                    </button>
                  </Options>
                  <span>{product.convertedPrice}</span>
                </ProductSelf>
              ))}
            </ProductList>
          )}
        </Container>
      )}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const response = await Api.get("/products");
  const data = response.data;

  const serializedProduct = data.map(
    ({ price, convertedPrice, ...props }: Product) => ({
      ...props,
      price,
      convertedPrice: priceFormater(price),
    })
  );

  return {
    props: {
      data: serializedProduct,
    },
    revalidate: 60 * 60,
  };
};

export default Products;
