import React, { useState, useRef, MouseEvent } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import { useGlobalState } from "context";
import Api from "services/api";

import Layout from "components/Layout";
import Loading from "components/LoadingBars";

import {
  Container,
  ImageFigure,
  ProductInfo,
  ProductInputs,
  Button,
} from "styles/pages/product";

import { DetailedProduct } from "types/cartRelated_types";
import { priceFormater } from "utils/formaters";

const Product: React.FC<{ data: DetailedProduct }> = ({ data: product }) => {
  const history = useRouter();
  const {
    cartManager: { dispatch },
    modalController: { dispatch: modalDispatch },
  } = useGlobalState();
  const imgRef = useRef<HTMLDivElement>(null);
  const [imgZoomState, setImgZoomState] = useState("0% 0%");
  const [qntd, setQntd] = useState(1);

  function handleMouseMove(event: MouseEvent) {
    if (!imgRef.current) return;
    let { left, top, width, height } = imgRef.current.getBoundingClientRect();
    let x = ((event.pageX - left) / width) * 100;
    let y = ((event.pageY - top) / height) * 100;

    setImgZoomState(`${x}% ${y}%`);
  }

  function handleBuy() {
    if (!product) return;
    if (qntd > product?.qntd)
      return alert(
        `There are only ${product?.qntd} ${product?.name} available.`
      );

    const productWithoutDescription = {
      ...product,
      description: null,
    };

    dispatch({
      type: "add-product",
      payload: {
        ...productWithoutDescription,
        qntd,
      },
    });
    modalDispatch({
      type: "cart",
    });
  }

  return (
    <Layout>
      <Container>
        <ImageFigure
          ref={imgRef}
          onMouseMove={handleMouseMove}
          image={product.image}
          position={imgZoomState}
        >
          <img src={product.image} alt={product.name} />
        </ImageFigure>
        <ProductInfo>
          <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
          </div>
          <ProductInputs>
            <strong>{product.convertedPrice}</strong>
            <div>
              <p>Qty:</p>
              <select
                value={qntd}
                onChange={(event) => setQntd(Number(event.target.value))}
              >
                {[...Array(product.qntd)].map((item, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
              <Button onClick={handleBuy}>Buy</Button>
            </div>
            <span>{product.qntd} items left.</span>
          </ProductInputs>
        </ProductInfo>
      </Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await Api.get("/products");

  const paths = response.data.map(({ name }: { name: string }) => ({
    params: {
      name: encodeURI(name),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as any;

  const response = await Api.get(`product/${name}`);

  const serializedProduct = {
    ...response.data,
    convertedPrice: priceFormater(response.data.price),
  };

  return {
    props: {
      data: serializedProduct,
    },
    revalidate: 60 * 60,
  };
};

export default Product;
