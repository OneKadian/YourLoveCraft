import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// export default authMiddleware({
//   publicRoutes: ["/", "/api/(.*)"],
// });

export default authMiddleware({
  // Making sure homepage route and API, especially the webhook, are both public!
  publicRoutes: [
    "/",
    "/api/(.*)",
    "/api/write",
    "/Price",
    "/members",
    "/PrivacyPolicy",
    "/dev",
    "/Terms&Conditions",
    "/craft",
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
