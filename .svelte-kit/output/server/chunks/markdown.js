import { marked, Marked } from "marked";
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
marked.use({ gfm: true });
function parseMarkdown(src, base = "") {
  if (!base) {
    return marked.parse(src);
  }
  const m = new Marked({ gfm: true });
  m.use({
    walkTokens(token) {
      if ((token.type === "link" || token.type === "image") && typeof token.href === "string" && token.href.startsWith("/") && !token.href.startsWith("//")) {
        token.href = base + token.href;
      }
    }
  });
  return m.parse(src);
}
export {
  html as h,
  parseMarkdown as p
};
