import { isSafe } from "./index.js";

{
  console.info("request is safe for get method");
  const req = new Request("https://example.com", {
    method: "GET",
  });
  if (!isSafe(req)) throw new Error();
}

{
  console.info("request is safe for head method");
  const req = new Request("https://example.com", {
    method: "HEAD",
  });
  if (!isSafe(req)) throw new Error();
}

{
  console.info("request is safe for options method");
  const req = new Request("https://example.com", {
    method: "OPTIONS",
  });
  if (!isSafe(req)) throw new Error();
}

{
  console.info("request is safe if origin and host headers match");
  const req = new Request("https://example.com", {
    method: "PUT",
    headers: {
      Origin: "https://example.com",
      Host: "example.com",
    },
  });
  if (!isSafe(req)) throw new Error();
}

{
  console.info("request is unsafe if origin header is null");
  const req = new Request("https://example.com", {
    method: "POST",
    headers: {
      Host: "example.com",
    },
  });
  if (isSafe(req)) throw new Error();
}

{
  console.info("request is unsafe if host header is null");
  const req = new Request("https://example.com", {
    method: "POST",
    headers: {
      Origin: "https://example.com",
    },
  });
  if (isSafe(req)) throw new Error();
}

{
  console.info("request is unsafe if origin and host headers do not match");
  const req = new Request("https://example.com", {
    method: "POST",
    headers: {
      Origin: "https://example.com",
      Host: "example.org",
    },
  });
  if (isSafe(req)) throw new Error();
}

{
  console.info("request is unsafe if origin is subdomain of host");
  const req = new Request("https://example.com", {
    method: "POST",
    headers: {
      Origin: "https://sub.example.com",
      Host: "example.com",
    },
  });
  if (isSafe(req)) throw new Error();
}

{
  console.info("request is unsafe if host is subdomain of origin");
  const req = new Request("https://example.com", {
    method: "POST",
    headers: {
      Origin: "https://example.com",
      Host: "sub.example.com",
    },
  });
  if (isSafe(req)) throw new Error();
}
