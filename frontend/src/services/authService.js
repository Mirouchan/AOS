import API from "./api";

export const login = async (data) => {
  const res = await API.post("/auth/login/", data);

  const { access, refresh, user } = res.data;

  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);
  localStorage.setItem("user", JSON.stringify(user));

  return user;
};

export const logout = async () => {
  const refresh = localStorage.getItem("refresh");

  try {
    await API.post("/auth/logout/", { refresh });
  } catch (e) {}

  localStorage.clear();
};