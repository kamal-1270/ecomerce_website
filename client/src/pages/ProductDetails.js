import { Layout } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import "../styles/ProductDetailsStyles.css";
const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [cart, setCart] = useCart();

  const user = JSON.parse(localStorage.getItem("auth"));

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/product/products/${params.slug}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  //addtocart
  const addToCart = (product) => {
    if (!user || !user.user) {
      toast.error("Please log in to add items to the cart.");
      return;
    }
  
    const existingProductIndex = cart.findIndex((item) => item._id === product._id);
    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const updatedProduct = { ...product, quantity: 1, user_id: user.user._id };
      setCart([...cart, updatedProduct]);
      localStorage.setItem("cart", JSON.stringify([...cart, updatedProduct]));
    }
    // toast.success("Item Added to cart");
    alert("Item Add")
  };
  

  return (
    <Layout>
      <div className="row container m-2">
        <div className="col-md-6">
          <img
            src={`${process.env.REACT_APP_API}/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="400px"
            width="100%"
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h5><strong>Name :</strong> {product.name}</h5>
          <h6><strong>Description :</strong> {product.description}</h6>
          <h2>
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            })}
          </h2>
          <h6><strong>Category :</strong> {product?.category?.name}</h6>
          <button className="btn btn-secondary ms-2 cart1" onClick={() => addToCart(product)}>
            Add To Cart 
          </button>
        </div>
      </div>
      <hr />
    </Layout>
  );
};

export default ProductDetails;
