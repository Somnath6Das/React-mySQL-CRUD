import axios from "axios";
import React, { useState } from "react";
import {Link, useNavigate } from "react-router-dom";


  const Add = () => {
    const [book, setBook] = useState({
      title: "",
      desc: "",
      price: null,
      cover: "",
    });

const [error, setError] = useState(false);
const navigate = useNavigate();
    
const handleChange = (e) => {
    setBook((prev)=>({...prev, [e.target.name]: e.target.value }));
}

const handleClick = async (e) => {
    e.preventDefault();
    try{
        await axios.post("http://localhost:8800/books", book);
        navigate("/")
    }catch(err){
      console.log(err);
      setError(true); 
    }
}


  return (
    <div className="form">
      <h1>Add Book</h1>
      <input type="text" placeholder="Book title"  onChange={handleChange} name="title" />
      <input type="text" placeholder="Book desc" onChange={handleChange} name="desc" />
      <input type="number" placeholder="Book price" onChange={handleChange} name="price"/>
      <input type="text" placeholder="Book cover" onChange={handleChange} name="cover"/>
      <button className="formButton" onClick={handleClick}>Add</button>
      {error && "Something went wrong!"}
      <Link to="/">See all books</Link>
    </div>
  );
};

export default Add;
