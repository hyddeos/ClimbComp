export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://climbcomp.eshtropy.se"
    : "http://localhost:4000";
export const FRONTEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://hostclimbcomp.eshtropy.se"
    : "http://localhost:3000";
