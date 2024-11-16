// Utility functions to fetch user-related data from localStorage

export const getCurrentUserId = () => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const currentUsername = JSON.parse(localStorage.getItem('currentUser'))?.username;
  const currentUser = users.find(user => user.username === currentUsername);
  return currentUser?.username; // Using username as userId for simplicity
};

export const loadUserCart = (userId) => {
  const cartData = localStorage.getItem(`cart_${userId}`);
  return cartData ? JSON.parse(cartData) : [];
};

export const loadUserWishlist = (userId) => {
  const wishlistData = localStorage.getItem(`wishlist_${userId}`);
  return wishlistData ? JSON.parse(wishlistData) : [];
};

export const loadChecklist = (userId) => {
  const checklistData = localStorage.getItem(`checklist_${userId}`);
  return checklistData ? JSON.parse(checklistData) : [];
};
export const loadProfile = (userId) => {
  const profileData = localStorage.getItem(`profile_${userId}`);
  return profileData ? JSON.parse(profileData) : [];
};

