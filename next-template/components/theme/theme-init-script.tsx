import { DEFAULT_THEME_ACCENT, DEFAULT_THEME_APPEARANCE } from "@/lib/theme/accents"
import { DEFAULT_DENSITY, DEFAULT_FOOTER, DEFAULT_LAYOUT, THEME_STORAGE_KEY } from "@/lib/theme/storage"

const themeInitScript = `
(function () {
  try {
    var raw = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
    var appearance = ${JSON.stringify(DEFAULT_THEME_APPEARANCE)};
    var density = ${JSON.stringify(DEFAULT_DENSITY)};
    var layout = ${JSON.stringify(DEFAULT_LAYOUT)};
    var footer = ${JSON.stringify(DEFAULT_FOOTER)};
    if (raw) {
      var parsed = JSON.parse(raw);
      if (parsed && parsed.density === "compact") density = "compact";
      if (parsed && (parsed.layout === "top" || parsed.layout === "right")) layout = parsed.layout;
      if (parsed && parsed.footer === false) footer = false;
      if (parsed && parsed.appearance === "dark") {
        document.documentElement.classList.add("dark");
        document.documentElement.dataset.accent = ${JSON.stringify(DEFAULT_THEME_ACCENT)};
        document.documentElement.dataset.density = density;
        document.documentElement.dataset.layout = layout;
        document.documentElement.dataset.footer = footer ? "on" : "off";
        return;
      }
      if (parsed && parsed.appearance) appearance = parsed.appearance;
      else if (parsed && parsed.dark) {
        document.documentElement.classList.add("dark");
        document.documentElement.dataset.accent = ${JSON.stringify(DEFAULT_THEME_ACCENT)};
        document.documentElement.dataset.density = density;
        document.documentElement.dataset.layout = layout;
        document.documentElement.dataset.footer = footer ? "on" : "off";
        return;
      }
      else if (parsed && parsed.accent) appearance = parsed.accent;
    }
    var root = document.documentElement;
    if (appearance === "navy") appearance = ${JSON.stringify(DEFAULT_THEME_ACCENT)};
    if (appearance === "dark") {
      root.classList.add("dark");
      root.dataset.accent = ${JSON.stringify(DEFAULT_THEME_ACCENT)};
    } else {
      root.dataset.accent = appearance;
    }
    root.dataset.density = density;
    root.dataset.layout = layout;
    root.dataset.footer = footer ? "on" : "off";
  } catch (e) {}
})();
`

/** React 19 dev uyarısını önlemek için Next.js “preventing flash” deseni */
export function ThemeInitScript() {
  return (
    <script
      id="theme-init"
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: themeInitScript }}
    />
  )
}
