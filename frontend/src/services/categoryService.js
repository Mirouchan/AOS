import API from "./productApi";

export const getCategories = () => API.get("/categories/");