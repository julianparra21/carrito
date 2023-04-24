import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../assets/css/Login.css";
import Axios from "axios";

export const Login = () => {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleInputChange = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value,
      [target.apellido]: target.value,
      [target.email]: target.value,
      [target.password]: target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    Axios.post("http://localhost:3020/api/login", form)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    navigate("/login");

    
  };

  return (
    <>
    <div className="bg-[url('https://res.cloudinary.com/dyhfwq81d/image/upload/v1679053889/pexels-hu%E1%BB%B3nh-%C4%91%E1%BA%A1t-2313037_qvujla.jpg')] h-screen W-full bg-cover bg-center p-24 flex items-center justify-center ">
      <div className="absolute w-[400px] -translate-x-2/4 translate-y-[-55%] box-border shadow-[0_15px_25px_#00000099] mx-auto my-5 p-10 rounded-[10px] left-2/4 top-2/4 bg-[#473b3be3]">
        <p className="text-white text-center text-2xl font-[bold] tracking-[1px] mt-0 mb-[30px] mx-0 p-0;">
          Inicio de sesión
        </p>
        <form className="flex flex-col">
          <div className="relative">
            <input
              className="w-full text-base mb-[30px] px-0 py-2.5 border-b-white border-[none] border-b border-solid bg-transparent outline-0 text-white left-0 -top-5 placeholder:text-white"
              name=""
              type="text"
              placeholder="Correo"
            />
          </div>
          <div className="relative">
            <input
              className="w-full text-base mb-[30px] px-0 py-2.5 border-b-white border-[none] border-b border-solid bg-transparent outline-0 text-white left-0 -top-5 placeholder:text-white"
              required=""
              name=""
              type="password"
              placeholder="Contraseña"
            />
          </div>
          <button type="submit">
            <a className="group relative inline-block font-[bold] text-white text-base no-underline uppercase overflow-hidden transition-[0.5s] tracking-[3px] mt-10 px-5 py-2.5 hover:bg-white ">
              <span className="absolute block animate-[btn-anim1_1.5s_linear_infinite]-left-full w-full h-0.5 top-0 background: linear-gradient(90deg, transparent, #fff)"></span>
              <span className="absolute block animate-[btn-anim2_1.5s_linear_infinite]-top-full w-0.5 h-full right-0 background: linear-gradient(180deg, transparent, #fff)"></span>
              <span className="absolute block animate-[btn-anim3_1.5s_linear_infinite]-right-full bottom-0 background: linear-gradient(270deg, transparent, #fff) animation-delay: .75s"></span>
              <span className="absolute block animate-[btn-anim4_1.5s_linear_infinite]-bottom-full w-0.5 left-0 background: linear-gradient(360deg, transparent, #fff)"></span>
              <p className="group-hover:text-black">Entrar</p>
            </a>
          </button>
        </form>

        <p className="text-[#aaa] text-sm">
          ¿No tienes una cuenta?{" "}
          <NavLink
            to="/register"
            className="text-white no-underline hover:text-[#aaa] hover:rounded-[5px] hover:bg-transparent"
          >
            Registrate!
          </NavLink>
        </p>
        <p className="text-[#aaa] text-sm">
          <NavLink
            to="/recoverpassword"
            className="text-white no-underline hover:text-[#aaa] hover:rounded-[5px] hover:bg-transparent"
          >
            ¿Olvidaste tu contraseña?
          </NavLink>
        </p>
      </div>
    </div>
    </>
  );
};
