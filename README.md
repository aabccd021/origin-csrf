# tiny-origin-csrf

Simple CSRF request validation for JavaScript.

## Overview

`tiny-origin-csrf` provides a utility to check if an HTTP request is considered "safe" from a CSRF (Cross-Site Request Forgery) perspective, based on the HTTP method and the relationship between the `Origin` and `Host` headers.

- **Safe methods** (`GET`, `HEAD`, `OPTIONS`): Always considered safe.
- **Unsafe methods** (`POST`, `PUT`, `PATCH`, `DELETE`): Only considered safe if the `Origin` header matches the `Host` header exactly.

## Installation

```sh
pnpm install tiny-origin-csrf@github:aabccd021/tiny-origin-csrf
yarn add tiny-origin-csrf@github:aabccd021/tiny-origin-csrf
bun install tiny-origin-csrf@github:aabccd021/tiny-origin-csrf
```

## Usage

```js
import { isSafe } from "tiny-origin-csrf";

const req = new Request("https://example.com", {
  method: "POST",
  headers: {
    Origin: "https://example.com",
    Host: "example.com",
  },
});

if (isSafe(req)) {
  // Proceed with handling the request
} else {
  // Block or reject the request as potentially unsafe
}
```

## Example

See [index.test.js](./index.test.js) for usage examples and edge cases.

## Install

This is a single-file utility. Copy `index.js` and `index.d.ts` into your project, or install via your preferred package manager if published.

## Test

Run the test file with your JavaScript runtime (for example, Node.js >= 18):

```bash
node index.test.js
```

## LICENCE

```
Zero-Clause BSD
=============

Permission to use, copy, modify, and/or distribute this software for
any purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED “AS IS” AND THE AUTHOR DISCLAIMS ALL
WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES
OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLEs
FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY
DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN
AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT
OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```
