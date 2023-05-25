import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export const Cart = ({
  allProducts,
  setAllProducts,
  total,
  countProducts,
  setTotal,
  setCountProducts,
}) => {
  const [active, setActive] = useState(false);

  const addProduct=async()=>{
    try {
        const response = await axios.post("http://localhost:3020/product/obtener");
        setActive(response.data);
        active.map(active=>{
          active.cantidad_producto=1;
        })
    
    } catch (error) {
      
    }
  }

  const incrementQuantity = (product) => {
    const updatedProducts = allProducts.map((item) =>
      item.id === product.id_producto ? { ...item, quantity: item.quantity + 1 } : item
    );
    setAllProducts(updatedProducts);
    setTotal(total + product.precio);
    setCountProducts(countProducts + 1);
  };

  const decrementQuantity = (product) => {
    if (product.quantity > 1) {
      const updatedProducts = allProducts.map((item) =>
        item.id === product.id_producto ? { ...item, quantity: item.quantity - 1 } : item
      );
      setAllProducts(updatedProducts);
      setTotal(total - product.precio);
      setCountProducts(countProducts - 1);
    }
  };

  const onDeleteProduct = (product) => {
    const updatedProducts = allProducts.filter(
      (item) => item.id !== product.id_producto
    );
    setAllProducts(updatedProducts);
    setTotal(total - product.precio * product.cantidad_producto);
    setCountProducts(countProducts - product.cantidad_producto);
  };

  const onCleanCart = () => {
    <ToastContainer />;
    toast.error("Carrito vacio", {
      position: "top-left",
      autoClose: 900,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
    setAllProducts([]);
    setTotal(0);
    setCountProducts(0);
  };

  const onCash = () => {
    toast.success("Comprando", {
      position: "top-left",
      autoClose: 900,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    <ToastContainer />;
  };

  const deleteList= ()=>{
    toast.error("producto eliminado del carrito ", {
      position: "top-left",
      autoClose: 900,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    <ToastContainer />;
  }

  // Conectar con el backend
  const [cart, setCart] = useState({
    id: "",
    nameProduct: "",
    price: "",
    quantity: "",
  });
  const handleInputChange = ({ target }) => {
    setCart({
      ...cart,
      [target.name]: target.value,
    });
  };

  const getCart = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:3020/buy/compra/:id")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <header>
      <div className="container-icon">
        <div className="container-cart-icon" onClick={() => setActive(!active)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-shopping-cart"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#2c3e50"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
            <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
            <path d="M17 17h-11v-14h-2" />
            <path d="M6 5l14 1l-1 7h-13" />
          </svg>
          <div className="count-products">
            <span id="contador-productos">{countProducts}</span>
          </div>
        </div>

        <div
          className={`container-cart-products ${active ? "" : "hidden-cart"}`}
        >
          {allProducts.length ? (
            <>
              <div className="row-product">
                {allProducts.map((product) => (
                  <div className="cart-product flex align-center justify-center" key={product.id}>
                    <div className="info-cart-product">
                      <div className="flex flex-col h-5 mt-[-25px]">
                      <button
                        className="quantity-button"
                        onClick={() => incrementQuantity(product)}
                      >
                        <p className="text-green-500 text-2xl m-20px  mb-[-5px]" >+</p>
                      </button>
                      <span className="cantidad-producto-carrito">
                        {product.cantidad_producto}
                      </span>
                      <button
                        className="quantity-button"
                        onClick={() => decrementQuantity(product)}   >
                   
                        <p className="text-red-500 text-2xl  mt-[-10px]  ">-</p>
                      </button>
                      </div >
                      <p className="titulo-producto-carrito">
                        {product.nombre_producto}
                      </p>
                      <span className="precio-producto-carrito">
                        ${product.precio * product.cantidad_producto}
                      </span>
                    </div>

                    <p
                      onClick={() => onDeleteProduct(product,deleteList())}
                      
                      className="cursor-pointer text-red-500  ml-[10px] mr-[-10px]"
                    >
                      X
                    </p>
                  </div>
                ))}
              </div>

              <div className="cart-total">
                <h3>Total:</h3>
                <span className="total-pagar">${total}</span>
              </div>
              <button className=" text-white block w-full  cursor-pointer text-base transition-all duration-[0.3s] ease-[ease] px-0 py-[15px] border-[none] bg-green-600" onClick={onCash}>
                Comprar
              </button>
              <button className=" text-white block w-full cursor-pointer text-base transition-all duration-[0.3s] ease-[ease]  px-0 py-[15px] rounded-br-[10px] rounded-bl-[10px] border-[none] bg-red-600" onClick={onCleanCart}>
                Vaciar Carrito
              </button>
            </>
          ) : (
            <p className="cart-empty">El carrito está vacío</p>
          )}
        </div>
      </div>
    </header>
  );
};
