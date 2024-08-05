import React, { useContext, useState, useEffect } from "react";
import { API_URL } from "../api";
import { useParams, useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
import { CartContext } from "../context/CartContext";
import Swal from "sweetalert2";

const ProductMenu = () => {
  const [products, setProducts] = useState([]);
  const { firmId, firmName } = useParams();
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const productHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/product/${firmId}/products`);
      const newProductData = await response.json();
      setProducts(newProductData.products);
    } catch (error) {
      console.error("failed to fetch", error);
    }
  };

  useEffect(() => {
    productHandler();
  }, []);

  const handleAddToCart = async (product) => {
    const { value: quantity } = await Swal.fire({
      title: 'Enter Quantity',
      input: 'number',
      inputLabel: 'Quantity',
      inputValue: 1,
      inputAttributes: {
        min: 1,
        step: 1
      },
      confirmButtonText: 'Add to Cart',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      customClass: {
        container: 'swal-container',
        input: 'swal-input'
      }
    });

    if (quantity) {
      const parsedQuantity = parseInt(quantity, 10);
      if (parsedQuantity > 0) {
        addToCart(product, parsedQuantity);
      }
    }
  };

  return (
    <>
      <TopBar />
      <section className="productSection">
        <h3>{firmName}</h3>
        {products.map((item) => (
          <div className="productBox" key={item._id}>
            <div>
              <div>
                <strong>{item.productName}</strong>
              </div>
              <div>₹{item.price}</div>
              <div>{item.description}</div>
            </div>
            <div className="productGroup">
              <img src={`${API_URL}/uploads/${item.image}`} alt={item.productName} />
              <div className="addButton" onClick={() => handleAddToCart(item)}>ADD</div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default ProductMenu;
