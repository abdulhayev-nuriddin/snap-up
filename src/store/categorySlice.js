import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";

const initialState = {
  categories: [],
  categoriesStatus: STATUS.IDLE,
  categoryProducts: [],
  categoryProductsStatus: STATUS.IDLE,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncCategories.pending, (state) => {
        state.categoriesStatus = STATUS.LOADING;
      })
      .addCase(fetchAsyncCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.categoriesStatus = STATUS.SUCCEEDED;
      })
      .addCase(fetchAsyncCategories.rejected, (state) => {
        state.categoriesStatus = STATUS.FAILED;
      })
      .addCase(fetchAsyncProductsOfCategory.pending, (state) => {
        state.categoryProductsStatus = STATUS.LOADING;
      })
      .addCase(fetchAsyncProductsOfCategory.fulfilled, (state, action) => {
        state.categoryProducts = action.payload;
        state.categoryProductsStatus = STATUS.SUCCEEDED;
      })
      .addCase(fetchAsyncProductsOfCategory.rejected, (state) => {
        state.categoryProductsStatus = STATUS.FAILED;
      });
  },
});

export const fetchAsyncCategories = createAsyncThunk(
  "categories/fetch",
  async () => {
    try {
      const response = await fetch(`${BASE_URL}products/categories`);
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error("Invalid categories data");
      }
      return data.map((category, index) => ({
        id: index + 1,
        name:
          typeof category === "string" ? category : category.name || "Unknown",
        slug:
          typeof category === "string"
            ? category.replace(/\s+/g, "-")
            : category.slug || "unknown",
        url: `/category/${
          typeof category === "string"
            ? category.replace(/\s+/g, "-")
            : category.slug || "unknown"
        }`,
      }));
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      throw error;
    }
  }
);

export const fetchAsyncProductsOfCategory = createAsyncThunk(
  "category-products/fetch",
  async (category) => {
    try {
      const categorySlug =
        typeof category === "string" ? category : category.slug || category;
      const response = await fetch(
        `${BASE_URL}products/category/${categorySlug}`
      );
      const data = await response.json();
      return data.products || [];
    } catch (error) {
      console.error(
        `Failed to fetch products for category ${category}:`,
        error
      );
      throw error;
    }
  }
);

export const getAllCategories = (state) => state.category.categories;
export const getAllProductsByCategory = (state) =>
  state.category.categoryProducts;
export const getCategoryProductsStatus = (state) =>
  state.category.categoryProductsStatus;
export default categorySlice.reducer;
