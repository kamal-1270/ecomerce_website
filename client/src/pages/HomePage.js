import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import slideP from "./slidep.jpg";
import offer from "../components/Layout/image/offer.webp"
import watch from "../components/Layout/image/watch.png";
import laptop from "../components/Layout/image/laptop1.webp"
import alarm from "../components/Layout/image/alarm.webp"
import bankoffer from "../components/Layout/image/bank.png";
import "../styles/Homepage.css";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const HomePage = () => {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [noMatchingItems, setNoMatchingItems] = useState(false);
  const [page, setPage] = useState(1); 
  const [limit, setLimit] = useState(10); 

  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 2,  
    slidesToScroll: 2,  
    autoplay: true,      
    autoplaySpeed: 2000,  
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };
  
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let user = JSON.parse(localStorage.getItem("auth"));
  
  useEffect(() => {
    getAllCategory();
    getTotal();
    getAllProducts(page, limit);
  }, [page, limit]);

  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/product/product-count`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProducts = async (currentPage, currentLimit) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/product/products`, {
        params: { page: currentPage, limit: currentLimit }
      });
      setLoading(false);
      
      const newProducts = data.products.filter(product => !products.some(p => p._id === product._id));
      setProducts((prevProducts) => [...prevProducts, ...newProducts]);

      if (newProducts.length === 0) {
        setNoMatchingItems(true);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) {
      setPage(1);
      setProducts([]);
      getAllProducts(1, limit);
    }
  }, [checked.length, radio.length]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/product/product-filters`, { checked, radio });
      setProducts(data?.products);
      setNoMatchingItems(!data.products.length);
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
    toast.success("Item Added to cart");
  };

  const loadMoreProducts = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <Layout title={"All Products - Best offers"}>
      <Slider {...settings}>
  <div>
    <img src={slideP} alt="slide-1" className="imgh" />
  </div>
  <div>
    <img src={watch} alt="slide-2" className="imgh" />
  </div>

  <div>
    <img src={bankoffer} alt="slide-3" className="imgh"/>
  </div>

  <div>
    <img src={offer} alt="slide-3" className="imgh" />
  </div>
  <div>
    <img src={laptop} alt="slide-3" className="imgh" />
  </div>
  <div>
    <img src={alarm} alt="slide-3" className="imgh"/>
  </div>

  
</Slider>

      <div className="container-fluid row mt-3 home-page">
        <div className="col-md-2 filters">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4 className="text-center mt-4">Filter By Prices</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button className="btn btn-danger" onClick={() => window.location.reload()}>
              Reset Filter
            </button>
            {/* Filter Button */}
            <button className="btn btn-primary mt-3" onClick={filterProduct}>
              Apply Filters
            </button>
          </div>
        </div>
        <div className="col">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap justify-content-center">
            {noMatchingItems ? (
              <p className="text-center">No matching items found.</p>
            ) : (
              products?.map((p) => (
                <div className="card m-2" key={p._id} style={{ width: "18rem" }}>
                  <img src={`${process.env.REACT_APP_API}/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0, 30)}...</p>
                    <h2 className="card-text">₹ {p.price}</h2>
                    <button className="btn btn-primary ms-2" onClick={() => navigate(`/product/${p.slug}`)}>
                      More Details
                    </button>
                    <button className="btn btn-secondary ms-2 cart1" onClick={() => addToCart(p)}>
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="text-center mt-3">
            <button className="btn btn-primary" style={{maxHeight:"100px",maxWidth:"200px",margin:"10px" }} onClick={loadMoreProducts} disabled={loading}>
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
