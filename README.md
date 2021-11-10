# redeqo

Web-based template engine for terminals. Flexible mapping of your website contents (portfolio, project homepage, etc) to templates in plain text, shell script, Python or anything else.

Also, You can share the URL and anybody can show or run the response via **`curl`**.

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
