import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

export const ProductList = ({
  allProducts,
  setAllProducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
}) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const response = await axios.get("http://localhost:3020/product/obtener"); // Ruta a tu controlador backend para obtener los productos
      setArticles(response.data);
      const product=response.data.map
      articles.map(article =>{
        article.cantidad_producto = 1;
      })
      if (response.status === 200) {
        toast.info("Productos obtenidos de la db exitosamente", {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error al obtener los productos", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const addCart = ()=>{
     toast.success("Producto agregado exitosamente", {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        
      }
  

  const onAddProduct = (product) => {
    if (allProducts.find((item) => item.id === product.id)) {
      const products = allProducts.map((item) =>
        item.id === product.id ? { ...item, cantidad_producto: item.cantidad_producto + 1 } : item
      );
      setTotal(total + product.precio* product.cantidad_producto);
      setCountProducts(countProducts + product.cantidad_producto);
     
      return setAllProducts([...products]);
    }

    setTotal(total + product.precio* product.cantidad_producto);
    setCountProducts(countProducts + product.cantidad_producto);
    setAllProducts([...allProducts, product]);
  };

  let rol = localStorage.getItem("rol");
  let rolAdmin = localStorage.getItem("rolAdmin");

  return (

    <>
    
      <div className="container-items">
        {articles.map((article) => (
          <div className="item" key={article.id_producto}>
            <figure>
              <img src={article.id_imagen} alt={article.nombre_producto} />
            </figure>
            <div className="info-product">
              <h2>{article.nombre_producto}</h2>
              <p className="price">${article.precio}</p>
              
              <div className="article-footer">
                <span>{article.date} </span>  
                <span>{article.ReadingTime}</span>
              </div>
              {rolAdmin === "rolAdmin" ? (
                <>
                  <button className="btn btn-danger">Editar</button>
                  <button className="btn btn-danger">Eliminar</button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => onAddProduct(article,addCart())}
                    className="active:scale-95"
                  >
                    Añadir al carrito
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </>
  );
};
