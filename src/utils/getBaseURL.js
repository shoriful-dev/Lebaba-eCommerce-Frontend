export const getBaseURL = () => {
  if (import.meta.env.MODE === 'development') {
    return 'http://localhost:3000';
  } else {
    return 'https://lebaba-ecommerce-backend.onrender.com';
  }
};
