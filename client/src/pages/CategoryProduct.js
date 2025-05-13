import { Layout, Row, Col } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/cart'; // Import useCart hook
import toast from 'react-hot-toast';
import "../styles/CategoryProductStyle.css";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [cart, setCart] = useCart(); // Initialize cart from context

  const user = JSON.parse(localStorage.getItem("auth")); // Retrieve user info

  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);

  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = (product) => {
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
    alert("Item Added to cart");
  };

  return (
    <Layout>
      <div className='container mt-3'>
        <h4 className='text-center'>Category - {category?.name}</h4>
        <h6 className='text-center'>{products?.length} result found</h6>

        <Row gutter={[16, 16]}>
          {products?.map((p) => (
            <Col xs={24} sm={12} md={8} lg={6} key={p._id}>
              <div className="card" style={{ backgroundColor: "rgba(128, 128, 128, 0.097)" }}>
                <img
                  src={`${process.env.REACT_APP_API}/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}...</p>
                  <h2 className="card-text"> ₹ {p.price}</h2>
                  <button className='btn btn-primary ms-2' onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                  <button className="btn btn-secondary ms-2 cart1" onClick={() => addToCart(p)}>
                    Add To Cart 
                  </button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
