# redeqo

Web-based template mapper for terminals.
Map your website (blog, portfolio, project wiki, etc) contents to
plain text, shell scripts, Python or others.

Also, You can share the URL and anybody can show or run the response via **`curl`**.

## Example

```sh
curl "https://redeqo.deta.dev/?s=https://0xtadash1.github.io/redeqo/"
```

![screenshot-plain](https://user-images.githubusercontent.com/56265995/142592495-a8af8a6c-a5a0-425d-abb9-b7b100e095ab.png)

or colorful version

```sh
echo -e """$(curl -s "https://redeqo.deta.dev/?s=https://0xtadash1.github.io/redeqo/&d=pj-intro-card.ansi.njk")"""
```

![screenshot-colorful](https://user-images.githubusercontent.com/56265995/142592913-6318b931-f2ab-493c-a9a4-f6eeaf7104f1.png)


The first defines the template to be used by `<meta name="redeqo-dst" content="...">` in `?s=...` HTML.
The second overrides it with another template in `&d=...` query.

## TODO

- Configuring
  - [ ] Njk `env` by `<meta>`/query
  - [ ] JSDom's options by `<meta>`/query
    - [ ] `runScripts`

---

- Custom Filtters/Tags(Extensions)
  - [ ] ANSI Color Codes (use `chalk` module)
  - [ ] `strip`: Alias for `striptags(true)`
  - [ ] `sindent(n=4, doIndentFirstLine=false)`: `strip()` and `indent()`
  - [ ] `si-wrap(len, n=4, doIndentFirstLine=false)`: `sindent()` and Line-wrapping. `len` is line-length.

---

- Other
  - [x] RootPage without queries such as `?src=...`
    - [x] User-Agent == curl
    - [x] else
  - [ ] Documents
  - [ ] Sample/Default templates
    - [ ] ANSI Colored
    - [ ] Bash
    - [ ] Python

## Develop

### Run

1. Start server
   ```sh
   IS_DEBUG=true node index.js
   ```
1. Test `curl`
   ```sh
   curl "http://localhost:3000/"
   ```
   ```
   redeqo -- Web-based template mapper for terminals
   https://github.com/0xTadash1/redeqo
   ```
   or
   ```sh
   curl "https://localhost:3000/?s=https://0xtadash1.github.io/redeqo/"
   ```
   ```
   =============================================================================
     redeqo
   -----------------------------------------------------------------------------
     Get a different look for your website, specialized for terminals!

    ---
     Web-based template mapper for terminals.
     Map your website (blog, portfolio, project wiki, etc) contents to
     plain text, shell scripts, Python or others.

     Also, You can share the URL and anybody can show or run the response via curl.

    ---
     Home     https://0xTadash1.github.io/redeqo
     Doc      https://github.com/0xTadash1/redeqo/blob/main/README.md
   
     Repo     https://github.com/0xTadash1/redeqo
     License  MIT
              https://github.com/0xTadash1/redeqo/blob/main/LICENSE

   =============================================================================
   ```

### Deploy

```sh
deta deploy
```

### env vars (for debug)

These are case-sensitive.

- `IS_DEBUG`, default: `false`
  - `true` || anything else (null, `false`, `False`, `0`, `1`, `True`, etc.)
- `PORT`, default: `3000`
  - numeric || anything else