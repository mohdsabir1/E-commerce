

export const getUser = () => {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
};

export const setUser = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

export const signUp = (username, email, password) => {
  const users = JSON.parse(localStorage.getItem('users')) || [];

  if (users.some(user => user.email === email)) {
      return { success: false, message: 'Email is already registered' };
  }

  const newUser = { username, email, password };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));

  return { success: true, message: 'User registered successfully' };
};


export const login = (email, password) => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify({ username: user.username }));
    window.location.href = '/';
    return { success: true, message: 'Login successful' };
  } else {
    return { success: false, message: 'Invalid credentials' };
  }
};


export const logout = () => {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('currentUser');
};