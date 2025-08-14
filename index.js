/**
 * @type {import("./index").isSafe}
 */
export const isSafe = (req) => {
  if (!["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
    return true;
  }

  const originHeader = req.headers.get("Origin");
  const hostHeader = req.headers.get("Host");
  if (originHeader === null || hostHeader === null) {
    return false;
  }

  return new URL(originHeader).host === hostHeader;
}
