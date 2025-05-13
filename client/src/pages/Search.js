import { Layout } from 'antd'
import { useSearch } from '../context/search'
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/cart";
const Search = () => {
    const [values,setValues] = useSearch();
    const params = useParams();
    const navigate = useNavigate();

   
  return (
    <Layout title={'Search results'}>
        <div className='container'>
            <div className='text-center'>
                <h1>Search Results</h1>
                <h6>{values?.results.length < 1 ? 'No Products found' : `Found ${values?.results.length}`}</h6>

                <div className='d-flex flex-wrap'>
          {values.results.map((p) => (
                <div className="card m-2" key={p._id} style={{ width: "20rem"}}>
                  <img
                    src={`${process.env.REACT_APP_API}/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    
                    <p className="card-text">{p.description.substring(0,30)}...</p>
                    <h2 className="card-text"> ₹ {p.price}</h2>
            
                    <button className="btn btn-primary ms-2" onClick={() => navigate(`/product/${p.slug}`)}>
                      More Details
                    </button>

                    <button className="btn btn-primary ms-2"  onClick={() => navigate(`/product/${p.slug}`)}>
                    Add To Cart 
                    </button>
                  </div>
                </div>
              
            ))}
          </div>
            </div>
        </div>
      
    </Layout>
  )
}

export default Search
