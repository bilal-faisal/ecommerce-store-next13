export const updateCartItemCount = (count: number): void => {
  localStorage.setItem("cartItemCount", String(count));
};
