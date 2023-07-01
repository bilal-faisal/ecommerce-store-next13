export const updateCartItemCountLocalStorageVariable = (count: number): void => {
  localStorage.setItem("cartItemCount", String(count));
};

export const updateUserCartProductsLocalStorageVariable = (
  arr: { product_id: string; quantity: number }[]
): void => {
  localStorage.setItem("userCartProducts", JSON.stringify(arr));
};
