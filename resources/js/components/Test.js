import React, { useState, useEffect } from "react";
import axios from "axios";

const Test = () => {
  const [author, setAuthor] = useState(null);

  const fetchAuthor = async () => {
    const { data } = await axios.get("/api/test");
    setAuthor(data);
  };

  useEffect(() => {
    fetchAuthor();
  }, []);

  console.log(author);

  const renderAuthor = () => {
    if (author) {
      return <p>{author[2].author}</p>;
    }
  };

  return (
    <div className="container py-4">
      <h1>Author: </h1>
    </div>
  );
};

export default Test;
