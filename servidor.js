/* Sobe o molde em http://localhost:4180.
   Existe porque a central usa localStorage e módulos de rota que se
   comportam diferente em file:// — conferir a central aberta por duplo
   clique não é conferir a central servida. Ela FUNCIONA nos dois; este
   servidor é para a conferência, não para o uso. */
const http = require("http");
const fs   = require("fs");
const path = require("path");

const RAIZ  = __dirname;
const PORTA = Number(process.env.PORT) || 4180;

const TIPOS = {
  ".html": "text/html; charset=utf-8",
  ".css":  "text/css; charset=utf-8",
  ".js":   "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg":  "image/svg+xml",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".ttf":  "font/ttf",
  ".otf":  "font/otf",
  ".woff2":"font/woff2",
  ".md":   "text/plain; charset=utf-8",
};

http.createServer((req, res) => {
  let rel = decodeURIComponent(req.url.split("?")[0]);
  if (rel === "/") rel = "/molde/central.html";

  /* normaliza ANTES de comparar: sem isto, "/../.." sai da raiz */
  const alvo = path.normalize(path.join(RAIZ, rel));
  if (!alvo.startsWith(RAIZ)){
    res.writeHead(403).end("fora da raiz");
    return;
  }

  fs.readFile(alvo, (erro, dados) => {
    if (erro){
      res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      res.end("não encontrado: " + rel);
      return;
    }
    res.writeHead(200, {
      "content-type": TIPOS[path.extname(alvo).toLowerCase()] || "application/octet-stream",
      "cache-control": "no-store",
    });
    res.end(dados);
  });
}).listen(PORTA, () => {
  console.log("molde em http://localhost:" + PORTA);
});
