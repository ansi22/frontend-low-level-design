import React, { useEffect, useState } from "react";
import "./App.css";

const ProductCard = ({ key, image, title }: any) => {
  return (
    <div key={key} className="product">
      <img src={image} alt="product" width={100} height={100} />
      <p>{title}</p>
    </div>
  );
};

function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const PAGE_SIZE = 10;
  const fetchData = async () => {
    const data = await fetch(`https://dummyjson.com/products?limit=100&page`);
    const json = await data.json();
    console.log(json.products);
    setProducts(json.products);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalProducts = products.length;
  const noOfPages = Math.ceil(totalProducts / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const handlePageChange = (n: any) => {
    setCurrentPage(n);
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };
  const goToNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="container">
      {!products.length ? (
        <h1>No products found...</h1>
      ) : (
        <div className="container">
          <h1>Pagination</h1>

          <div className="paginationContainer">
            <button onClick={goToPrevPage} disabled={currentPage === 0}>
              {"<<"}
            </button>
            <div className="paginationContainer">
              {Array.from({ length: noOfPages }, (_, i) => (
                <span
                  key={i}
                  className={`${
                    currentPage === i ? "activePage" : ""
                  } pageNumber`}
                  onClick={() => handlePageChange(i)}
                >
                  {i}
                </span>
              ))}
            </div>
            <button
              onClick={goToNextPage}
              disabled={currentPage === noOfPages - 1}
            >
              {">>"}
            </button>
          </div>

          <div className="productContainer">
            {products.slice(start, end).map((product: any) => {
              return (
                <ProductCard
                  key={product.id}
                  image={product.images[0]}
                  title={product.title}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
