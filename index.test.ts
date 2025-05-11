import { expect, test } from "bun:test";
import { isRequestSafe } from "./index.ts";

test("request is safe for get method", () => {
  const req = new Request("https://example.com", {
    method: "GET",
  });
  expect(isRequestSafe(req)).toBe(true);
});

test("request is safe for head method", () => {
  const req = new Request("https://example.com", {
    method: "HEAD",
  });
  expect(isRequestSafe(req)).toBe(true);
});

test("request is safe for options method", () => {
  const req = new Request("https://example.com", {
    method: "OPTIONS",
  });
  expect(isRequestSafe(req)).toBe(true);
});

test("request is safe for trace method", () => {
  const req = new Request("https://example.com", {
    method: "TRACE",
  });
  expect(isRequestSafe(req)).toBe(true);
});

test("request is safe for connect method", () => {
  const req = new Request("https://example.com", {
    method: "CONNECT",
  });
  expect(isRequestSafe(req)).toBe(true);
});

test("request is safe if origin and host headers match", () => {
  const req = new Request("https://example.com", {
    method: "PUT",
    headers: {
      Origin: "https://example.com",
      Host: "example.com",
    },
  });
  expect(isRequestSafe(req)).toBe(true);
});

test("request is unsafe if origin header is null", () => {
  const req = new Request("https://example.com", {
    method: "POST",
    headers: {
      Host: "example.com",
    },
  });
  expect(isRequestSafe(req)).toBe(false);
});

test("request is unsafe if host header is null", () => {
  const req = new Request("https://example.com", {
    method: "POST",
    headers: {
      Origin: "https://example.com",
    },
  });
  expect(isRequestSafe(req)).toBe(false);
});

test("request is unsafe if origin and host headers do not match", () => {
  const req = new Request("https://example.com", {
    method: "POST",
    headers: {
      Origin: "https://example.com",
      Host: "example.org",
    },
  });
  expect(isRequestSafe(req)).toBe(false);
});

test("request is unsafe if origin is subdomain of host", () => {
  const req = new Request("https://example.com", {
    method: "POST",
    headers: {
      Origin: "https://sub.example.com",
      Host: "example.com",
    },
  });
  expect(isRequestSafe(req)).toBe(false);
});

test("request is unsafe if host is subdomain of origin", () => {
  const req = new Request("https://example.com", {
    method: "POST",
    headers: {
      Origin: "https://example.com",
      Host: "sub.example.com",
    },
  });
  expect(isRequestSafe(req)).toBe(false);
});
