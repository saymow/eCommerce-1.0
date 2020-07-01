import React, { useEffect, useState, useRef, MouseEvent } from "react";
import { useLocation } from "react-router-dom";

import { useGlobalState } from "../../Context";
import Api from "../../Services/api";
import Loading from "../../Components/Loading";

import {
  Container,
  ProductContainer,
  ImageFigure,
  ProductInfo,
  ProductInputs,
  Button,
} from "./styles";

import { DetailedProduct } from "../../Types/cartRelated_types";

const Product: React.FC = () => {
  const {
    cartManager: { dispatch },
    modalController: { setShowModal },
  } = useGlobalState();
  const {
    state: { id },
  } = useLocation();
  const imgRef = useRef<HTMLDivElement>(null);
  const [product, setProduct] = useState<DetailedProduct | undefined>();
  const [imgZoomState, setImgZoomState] = useState("0% 0%");
  const [qntd, setQntd] = useState(1);

  useEffect(() => {
    Api.get(`product/${id}`).then((response) => {
      setProduct(response.data);
    });
  }, [id]);

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

    console.log(qntd);

    dispatch({
      type: "add-product",
      payload: {
        ...product,
        qntd,
      },
    });
    setShowModal("cart");
  }

  return !product ? (
    <Loading />
  ) : (
    <Container>
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
            <p>Qntd:</p>
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
            <span>{product.qntd} items restantes.</span>
          </ProductInputs>
        </ProductInfo>
      </ProductContainer>
    </Container>
  );
};

export default Product;
