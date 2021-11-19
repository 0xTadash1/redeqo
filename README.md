# redeqo

Web-based template mapper for terminals.
Map your website (blog, portfolio, project wiki, etc) contents to
plain text, shell scripts, Python or others.

Also, You can share the URL and anybody can show or run the response via **`curl`**.

## Example

```sh
curl "https://redeqo.deta.dev/?s=https://0xtadash1.github.io/redeqo/"

# or colorful version

echo -e """$(curl -s "https://redeqo.deta.dev/?s=https://0xtadash1.github.io/redeqo/&d=pj-intro-card.ansi.njk")"""
```

The first one defines the template to be used by `<meta name="redeqo-dst" content="...">` in `?s=...`'s HTML.
The second one overrides it with another template in `&d=...` query.

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
  - [ ] RootPage without queries such as `?src=...`
  - [ ] Documents
  - [ ] Sample/Default templates
    - [ ] ANSI Colored
    - [ ] Bash
    - [ ] Python

## Develop

1. `git clone git@github.com:0xTadash1/redeqo.git`
1. `deta clone --name redeqo --project default`

### env vars

- `IS_DEBUG=true`
- `PORT=3000`