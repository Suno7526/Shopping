import React, { useEffect, useState } from 'react';
import './Cart.css';
import axios from 'axios';
import Aside from '../Components/Aside';

const Like = () => {
  const [likeItems, setlikeItems] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/getLikeProduct/${sessionStorage.getItem(
            'userCode',
          )}`,
        );
        setlikeItems(response.data.reverse());
      } catch (error) {
        console.error('상품을 불러오는 중 오류 발생:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="page">
      <Aside />
      <article>
        <h2>찜한 상품</h2>
      </article>
      <section>
        <table>
          <thead>
            <tr>
              <th>상품정보</th>
            </tr>
          </thead>
          <tbody>
            {likeItems.map((product) => (
              <tr key={product.productCode}>
                <td>
                  <img
                    src={`http://localhost:8000/getProductImage/${product.product.productCode}`}
                    alt={product.product.productName}
                    style={{ width: '100px', height: '100px' }}
                  />
                  <div>
                    <strong>{product.product.companyName}</strong>
                    <br />
                    {product.product.information}
                    <br />
                    옵션 : {product.product.productSize}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};
export default Like;
