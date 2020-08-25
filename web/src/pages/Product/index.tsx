import React, { useEffect, useState, useRef, MouseEvent } from "react";
import { useParams } from "react-router-dom";

import { useGlobalState } from "../../Context";
import Api from "../../Services/api";
import Loading from "../../Components/LoadingBars";

import {
  Container,
  ProductContainer,
  ImageFigure,
  ProductInfo,
  ProductInputs,
  Button,
} from "./styles";

import { DetailedProduct } from "../../Types/cartRelated_types";
import { priceFormater } from "../../Utils/formaters";

const Product: React.FC = () => {
  const { name } = useParams();
  const {
    cartManager: { dispatch },
    modalController: { dispatch: modalDispatch },
  } = useGlobalState();
  const imgRef = useRef<HTMLDivElement>(null);
  const [product, setProduct] = useState<DetailedProduct | undefined>();
  const [imgZoomState, setImgZoomState] = useState("0% 0%");
  const [qntd, setQntd] = useState(1);

  useEffect(() => {
    Api.get(`product/${name}`).then((response) => {
      if (!response.data) alert("Error");

      const serializedProduct = {
        ...response.data,
        convertedPrice: priceFormater(response.data.price),
      };

      setProduct(serializedProduct);
    });
  }, [name]);

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

    delete product["description"];

    dispatch({
      type: "add-product",
      payload: {
        ...product,
        qntd,
      },
    });
    modalDispatch({
      type: "cart",
    });
  }

  return (
    <Container>
      {!product ? (
        <Loading barQntd={5} delay={200} height={"35%"} width={"25%"} />
      ) : (
        <ProductContainer>
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
        </ProductContainer>
      )}
    </Container>
  );
};

export default Product;
