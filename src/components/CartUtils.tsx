export const updateCartItemCountLocalHostVariable = (count: number): void => {
  localStorage.setItem("cartItemCount", String(count));
};

export const updateUserCartProductsLocalHostVariable = (
  arr: { product_id: string; quantity: number }[]
): void => {
  localStorage.setItem("userCartProducts", JSON.stringify(arr));
};
