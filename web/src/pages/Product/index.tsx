import React, { useEffect, useState, useRef, MouseEvent } from "react";
import { useLocation } from "react-router-dom";

import Api from "../../services/api";

import {
  Container,
  ProductContainer,
  ImageFigure,
  ProductInfo,
  ProductInputs,
  Button,
} from "./styles";

interface DetailedProduct {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
  qntd: number;
}

const Product: React.FC = (props) => {
  const {
    state: { id },
  } = useLocation();
  const imgRef = useRef<HTMLDivElement>(null);
  const [product, setProduct] = useState<DetailedProduct | undefined>();
  const [imgZoomState, setImgZoomState] = useState("0% 0%");

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

  return (
    <Container>
      <ProductContainer>
        <ImageFigure
          ref={imgRef}
          onMouseMove={handleMouseMove}
          image={product ? product.image : "none"}
          position={imgZoomState}
        >
          <img src={product ? product.image : "none"} alt={product?.name} />
        </ImageFigure>
        <ProductInfo>
          <div>
            <h1>{product?.name}</h1>
            <p>{product?.description}</p>
          </div>
          <ProductInputs>
            <p>Qntd:</p>
            <select>
              {[...Array(product ? product.qntd : 0)].map((item, index) => (
                <option value={index + 1}>{index + 1}</option>
              ))}
            </select>
            <Button>Buy</Button>
            <span>{product?.qntd} items restantes.</span>
          </ProductInputs>
        </ProductInfo>
      </ProductContainer>
    </Container>
  );
};

export default Product;
