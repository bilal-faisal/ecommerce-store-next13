import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({});

export const config = {
  matcher: ["/success", "/api/cart"],
};
