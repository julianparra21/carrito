import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Footer } from "../layouts/Footer/Footer.jsx";
import { Header } from "../layouts/Header/Header.jsx";
import "../assets/css/Catalogo.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Cart } from "../Components/Cart";
import { HeaderCliente } from "../layouts/Header/HeaderCliente.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import { ProductList } from "../Components/ProductList.jsx";

export const Catalogo = () => {
  let rol = localStorage.getItem("rol");
  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const response = await axios.get("http://localhost:3020/product/obtener"); // Ruta a tu controlador backend para obtener los productos
      setArticles(response.data);
      articles.map(article =>{
        article.cantidad = 1;
      }
      )
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

  AOS.init();

  const allCategories = [
    "All",
    ...new Set(articles.map((article) => article.categoria)),
  ];

  const [categories, setCategories] = useState(allCategories);

  const filterCategory = (category) => {
    if (category === "All") {
      setArticles(articles);
      return;
    }

    const filteredData = articles.filter(
      (article) => article.categoria === category
    );
    setArticles(filteredData);
  };

  return (
    <>
      {rol === null ? <Header /> : <HeaderCliente />}

      <main className="main-catalogo">
        <h1 className="text-center text-5xl text-brown-kopy my-3">Catalogo</h1>

        <div className="btns-catalogo">
          {categories.map((category) => (
            <button
              className="btn-catalogo bg-orange-kopy text-pink-kopy text-[1.3rem] cursor-pointer m-2.5 p-2.5 rounded-[10px] border-[none] hover:bg-green-kopy"
              type="sumit"
              onClick={() => filterCategory(category)}
              key={category}
            >
              {category}
            </button>
          ))}
          {rol === "rolAdmin" ? (
            <NavLink
              to="/addProduct"
              className="bg-orange-kopy text-pink-kopy text-[1.3rem] cursor-pointer m-2.5 p-2.5 rounded-[10px] border-[none] hover:bg-green-kopy"
            >
              Añadir producto
            </NavLink>
          ) : null}
        </div>
        <Cart
          allProducts={allProducts}
          setAllProducts={setAllProducts}
          total={total}
          setTotal={setTotal}
          countProducts={countProducts}
          setCountProducts={setCountProducts}
        />

        <div className="cards-container">
          <ProductList
            articles={articles}
            allProducts={allProducts}
            setAllProducts={setAllProducts}
            total={total}
            setTotal={setTotal}
            countProducts={countProducts}
            setCountProducts={setCountProducts}
          />
        </div>
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Catalogo;
