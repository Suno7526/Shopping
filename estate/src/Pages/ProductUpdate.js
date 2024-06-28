import './ProductUpdate.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductUpdate = () => {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useState({
    productCode: '',
    productName: '',
    companyName: '',
    productStuck: '',
    productPrice: '',
    category: '',
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/getProducts');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value,
    });
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(
        `http://localhost:8000/updateProduct/${editingProduct.productCode}`,
        editingProduct,
      );
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, [name]: value });
  };

  const filteredProducts = products.filter((product) => {
    return (
      (searchParams.productCode === '' ||
        product.productCode.includes(searchParams.productCode)) &&
      (searchParams.productName === '' ||
        product.productName.includes(searchParams.productName)) &&
      (searchParams.companyName === '' ||
        product.companyName.includes(searchParams.companyName)) &&
      (searchParams.productStuck === '' ||
        product.productStuck.toString().includes(searchParams.productStuck)) &&
      (searchParams.productPrice === '' ||
        product.productPrice.toString().includes(searchParams.productPrice)) &&
      (searchParams.category === '' ||
        product.category.includes(searchParams.category))
    );
  });

  return (
    <div className="product-update-container">
      <div className="search-filters">
        <input
          type="text"
          name="productCode"
          placeholder="Search by Product Code"
          value={searchParams.productCode}
          onChange={handleSearchChange}
        />
        <input
          type="text"
          name="productName"
          placeholder="Search by Product Name"
          value={searchParams.productName}
          onChange={handleSearchChange}
        />
        <input
          type="text"
          name="companyName"
          placeholder="Search by Company Name"
          value={searchParams.companyName}
          onChange={handleSearchChange}
        />
        <input
          type="text"
          name="productStuck"
          placeholder="Search by Product Stuck"
          value={searchParams.productStuck}
          onChange={handleSearchChange}
        />
        <input
          type="text"
          name="productPrice"
          placeholder="Search by Product Price"
          value={searchParams.productPrice}
          onChange={handleSearchChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Search by Category"
          value={searchParams.category}
          onChange={handleSearchChange}
        />
      </div>
      <table className="product-table">
        <thead>
          <tr>
            <th>Product Code</th>
            <th>Company Name</th>
            <th>Product Name</th>
            <th>Product Stuck</th>
            <th>Product Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.productCode}>
              <td>{product.productCode}</td>
              <td>
                {editingProduct &&
                editingProduct.productCode === product.productCode ? (
                  <input
                    type="text"
                    name="companyName"
                    value={editingProduct.companyName}
                    onChange={handleInputChange}
                  />
                ) : (
                  product.companyName
                )}
              </td>
              <td>
                {editingProduct &&
                editingProduct.productCode === product.productCode ? (
                  <input
                    type="text"
                    name="productName"
                    value={editingProduct.productName}
                    onChange={handleInputChange}
                  />
                ) : (
                  product.productName
                )}
              </td>
              <td>
                {editingProduct &&
                editingProduct.productCode === product.productCode ? (
                  <input
                    type="number"
                    name="productStuck"
                    value={editingProduct.productStuck}
                    onChange={handleInputChange}
                  />
                ) : (
                  product.productStuck
                )}
              </td>
              <td>
                {editingProduct &&
                editingProduct.productCode === product.productCode ? (
                  <input
                    type="number"
                    name="productPrice"
                    value={editingProduct.productPrice}
                    onChange={handleInputChange}
                  />
                ) : (
                  product.productPrice
                )}
              </td>
              <td>
                {editingProduct &&
                editingProduct.productCode === product.productCode ? (
                  <input
                    type="text"
                    name="category"
                    value={editingProduct.category}
                    onChange={handleInputChange}
                  />
                ) : (
                  product.category
                )}
              </td>
              <td>
                {editingProduct &&
                editingProduct.productCode === product.productCode ? (
                  <button onClick={handleSaveClick}>Save</button>
                ) : (
                  <button onClick={() => handleEditClick(product)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductUpdate;
