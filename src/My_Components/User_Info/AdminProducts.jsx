

import React, { useState } from 'react';
import "../My_Styles/AdminProducts.css";
import { Link } from 'react-router-dom';
import axios from 'axios';

let server = 'https://marketforrentalequipments-backend-1.onrender.com/';

const AdminProducts = () => {
  const [productId, setProductId] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productKeywords, setProductKeywords] = useState("");
  const [productAvailability, setProductAvailability] = useState(true);
  const [productSearch, setProductSearch] = useState("");
  const [searchedProduct, setSearchedProduct] = useState(null);

  const handleProductSearch = async (e) => {
    e.preventDefault();
    if (productSearch.trim() === "") {
      alert("Enter a Product ID");
      return;
    }

    try {
      const response = await axios.get(`${server}/product/${productSearch}`);
      const product = response.data;
      setSearchedProduct(product);
      setProductId(product.id);
      setProductCategory(product.category);
      setProductName(product.name);
      setProductType(product.type);
      setProductImage(product.image);
      setProductPrice(product.price);
      setProductKeywords(product.search);
      setProductAvailability(product.available);
    } catch (error) {
      console.log("Error fetching product", error);
      alert("Product not found");
    }
  };

  const handleAddOrUpdateProduct = async () => {
    if (productId.trim() === "" || productCategory.trim() === "" || productName.trim() === "" || productType.trim() === "" || productImage.trim() === "" || productPrice.trim() === "" || productKeywords.trim() === "") {
      alert("Enter All Fields");
      return;
    }

    let payload = {
      id: productId,
      category: productCategory,
      name: productName,
      type: productType,
      image: productImage,
      price: productPrice,
      search: productKeywords,
      available: productAvailability
    };

    try {
      let response;
      if (searchedProduct) {
        response = await axios.put(`${server}/product/${productId}`, payload);
        alert("Product updated successfully");
        resetForm();
      } else {
        response = await axios.post(`${server}/products`, payload);
        alert("Product added successfully");
        resetForm();
      }
      setSearchedProduct(response.data);
    } catch (error) {
      console.log("Error", error);
      alert("Error adding/updating product");
    }
  };

  const handleDeleteProduct = async () => {
    try {
      if(confirm("Confirm Delete the Product ?")){
        await axios.delete(`${server}/product/${productId}`);
        alert("Product deleted successfully")}
       resetForm();
    } catch (error) {
      console.log("Error deleting product", error);
      alert("Error deleting product");
    }
  };

  const resetForm = () => {
    setProductId("");
    setProductCategory("");
    setProductName("");
    setProductType("");
    setProductImage("");
    setProductPrice("");
    setProductKeywords("");
    setProductAvailability(true);
    setSearchedProduct(null);
  };

  return (
    <div className='login'>
      <div className='addproduct'>
        <button className="btn btn-dark" type="button" onClick={resetForm}>
          {searchedProduct ? "Edit Full Product" : "Add New Product"}
        </button>
        <nav className="navbar navbar-light bg-light">
          <form className="form-inline" onSubmit={handleProductSearch}>
            <div className="row">
              <div className="col">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search Product by ID"
                  aria-label="Search"
                />
              </div>
              <div className="col">
                <button className="btn btn-outline-dark my-2 my-sm-0" type="submit">
                  <b>Search</b>
                </button>
              </div>
            </div>
          </form>
        </nav>
      </div>
      <div className="productinfo">
        <form>
          <div className="form-group">
            <label htmlFor="id"><b>Product Id</b></label><br />
            <input type="text" id="id" value={productId} onChange={(e) => setProductId(e.target.value)} /><br />
          </div><br />

          <div className="form-group">
            <label htmlFor="category"><b>Product Category</b></label><br />
            <input type="text" id="category" value={productCategory} placeholder="Must be in lowercase" onChange={(e) => setProductCategory(e.target.value)} /><br />
          </div><br />

          <div className="form-group">
            <label htmlFor="name"><b>Product Name</b></label><br />
            <input type="text" id="name" value={productName} onChange={(e) => setProductName(e.target.value)} /><br />
          </div><br />

          <div className="form-group">
            <label htmlFor="type"><b>Product Type</b></label><br />
            <input type="text" id="type" value={productType} onChange={(e) => setProductType(e.target.value)} /><br />
          </div><br />

          <div className="form-group">
            <label htmlFor="image"><b>Product Image URL</b></label><br />
            <input type="text" id="image" value={productImage} placeholder="Copy Paste your image url here" onChange={(e) => setProductImage(e.target.value)} /><br />
          </div><br />

          <div className="form-group">
            <label htmlFor="price"><b>Product Price</b></label><br />
            <input type="text" id="price" value={productPrice} placeholder="eg. 3000 / per day" onChange={(e) => setProductPrice(e.target.value)} /><br />
          </div><br />

          <div className="form-group">
            <label htmlFor="search"><b>Product Search Keywords</b></label><br />
            <input type="text" id="search" value={productKeywords} onChange={(e) => setProductKeywords(e.target.value)} /><br />
          </div><br />

          <div className="form-group">
            <label htmlFor="availability"><b>Product Availability</b></label><br />
            <select id="availability" value={productAvailability} onChange={(e) => setProductAvailability(e.target.value === "true")}>
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select><br />
          </div><br /><br/>

          <div>
            <button className="btn btn-success" type="button" onClick={handleAddOrUpdateProduct}>
              {searchedProduct ? "Update Product" : "Add Product"}
            </button>&nbsp;&nbsp;&nbsp;&nbsp;
            {searchedProduct && (
              <button className="btn btn-danger" type="button" onClick={handleDeleteProduct}>Delete Product</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProducts;



