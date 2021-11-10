const got = require('got');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const njk = require('nunjucks');

const isDebug = process.env.IS_DEBUG === 'true';
const port = process.env.PORT || 3000;

const app = require('fastify')({ logger: true });


app.get('/', async (req, rep) => {
  try {
    const src = req.query.s ?? req.query.src;
    const dom = new JSDOM(await gotBody(src));
    // Priority: query > HTML meta tag
    const dst = req.query.d ?? req.query.dst ?? dom.window.document
      .querySelector('meta[name="redeqo-dst"]')
      .getAttribute('content');

    const [env, ctx] = await Promise.all([
      defineNjkEnv(dom),
      parseCtx(dom)
    ]);

    // Download template as needed, and Render
    if (dst.startsWith('http')) {
      const template = njk.compile(await gotBody(dst), env);
      rep.send(template.render(ctx));
    } else {
      rep.send(env.render(dst, ctx));
    }
  } catch (err) {
    return err;
  }
});


async function gotBody(s) {
  if (s.match(/redeqo\.fly\.dev/)) {
    throw new Error('avoid recursive access');
  }
  return (await got(s)).body;
}


async function defineNjkEnv(dom, query = null) {
  return new njk.Environment(new njk.FileSystemLoader('templates/'), {
    autoescape: false,
    trimBlocks: true,
    watch: true
  });
}


async function parseCtx(dom) {
  const ctx = {};
  const elms = Array.from(dom.window.document.querySelectorAll('[redeqo-key]'));

  await Promise.all(elms.map(async elm => {
    ctx[elm.getAttribute('redeqo-key')] = (() => {
      if (elm.hasAttribute('redeqo-childKeys')) {
        const childDict = {};
        const childKeys = elm.getAttribute('redeqo-childKeys').split(' ');
        childKeys.forEach(k => {
          childDict[k] = k === 'textContent' ? elm.textContent : elm.getAttribute(k);
        });

        return childDict;
      } else {
        return elm.textContent;
      }
    })()
  }))

  return ctx;
}


const start = async () => {
  try {
    await app.listen(port);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

if (isDebug) {
  start();
} else {
  module.exports = app;
}