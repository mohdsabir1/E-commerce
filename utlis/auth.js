import { setCookie, deleteCookie } from "cookies-next";

export const getUser = () => {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
};

export const setUser = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

export const signUp = (username, email, password) => {
  const users = getUser();

  if (users.some((user) => user.email === email)) {
    return { success: false, mesaage: "Email already in use" };
  }

  const newUser = { username, email, password };
  users.push(newUser);
  setUser(users);

  return { success: true, message: "User created successfully" };
};

export const signIn = (email, password) => {
  const users = getUser();
  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  if (user) {
    // Set a session cookie on successful login
    setCookie("userSession", email, { maxAge: 3600, path: "/" });
    return { success: true, message: "Login successful" };
  }
  return { success: false, message: "Invalid credentials" };
};

export const logut = () => {
  deleteCookie("userSession");
  return { success: true, message: "Logged out successfully" };
};
