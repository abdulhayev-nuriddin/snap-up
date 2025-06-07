import React, { useEffect, useMemo } from "react";
import "./HomePage.scss";
import HeaderSlider from "../../components/Slider/HeaderSlider";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories } from "../../store/categorySlice";
import ProductList from "../../components/ProductList/ProductList";
import {
  fetchAsyncProducts,
  getAllProducts,
  getAllProductsStatus,
} from "../../store/productSlice";
import Loader from "../../components/Loader/Loader";
import { STATUS } from "../../utils/status";

const HomePage = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getAllCategories) || [];
  const products = useSelector(getAllProducts) || [];
  const productStatus = useSelector(getAllProductsStatus);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchAsyncProducts(50));
    }
  }, [dispatch, products.length]);

  const tempProducts = useMemo(() => {
    const temp = [];
    if (products.length > 0) {
      for (let i = 0; i < Math.min(products.length, 10); i++) {
        let randomIndex = Math.floor(Math.random() * products.length);
        while (temp.includes(products[randomIndex])) {
          randomIndex = Math.floor(Math.random() * products.length);
        }
        temp[i] = products[randomIndex];
      }
    }
    return temp;
  }, [products]);

  const catProductsOne = useMemo(() => {
    return categories[0]
      ? products.filter((product) => product.category === categories[0].name)
      : [];
  }, [products, categories]);
  const catProductsTwo = useMemo(() => {
    return categories[1]
      ? products.filter((product) => product.category === categories[1].name)
      : [];
  }, [products, categories]);
  const catProductsThree = useMemo(() => {
    return categories[2]
      ? products.filter((product) => product.category === categories[2].name)
      : [];
  }, [products, categories]);
  const catProductsFour = useMemo(() => {
    return categories[3]
      ? products.filter((product) => product.category === categories[3].name)
      : [];
  }, [products, categories]);

  return (
    <main>
      <div className="slider-wrapper">
        <HeaderSlider />
      </div>
      <div className="main-content bg-whitesmoke">
        <div className="container">
          <div className="categories py-5">
            <div className="categories-item">
              <div className="title-md">
                <h3>See our products</h3>
              </div>
              {productStatus === STATUS.LOADING ? (
                <Loader />
              ) : tempProducts.length > 0 ? (
                <ProductList products={tempProducts} />
              ) : (
                <p>No products available.</p>
              )}
            </div>

            <div className="categories-item">
              <div className="title-md">
                <h3>{categories[0]?.name || "No Category Available"}</h3>
              </div>
              {productStatus === STATUS.LOADING ? (
                <Loader />
              ) : catProductsOne.length > 0 ? (
                <ProductList products={catProductsOne} />
              ) : (
                <p>No products available in this category.</p>
              )}
            </div>

            <div className="categories-item">
              <div className="title-md">
                <h3>{categories[1]?.name || "No Category Available"}</h3>
              </div>
              {productStatus === STATUS.LOADING ? (
                <Loader />
              ) : catProductsTwo.length > 0 ? (
                <ProductList products={catProductsTwo} />
              ) : (
                <p>No products available in this category.</p>
              )}
            </div>

            <div className="categories-item">
              <div className="title-md">
                <h3>{categories[2]?.name || "No Category Available"}</h3>
              </div>
              {productStatus === STATUS.LOADING ? (
                <Loader />
              ) : catProductsThree.length > 0 ? (
                <ProductList products={catProductsThree} />
              ) : (
                <p>No products available in this category.</p>
              )}
            </div>

            <div className="categories-item">
              <div className="title-md">
                <h3>{categories[3]?.name || "No Category Available"}</h3>
              </div>
              {productStatus === STATUS.LOADING ? (
                <Loader />
              ) : catProductsFour.length > 0 ? (
                <ProductList products={catProductsFour} />
              ) : (
                <p>No products available in this category.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
