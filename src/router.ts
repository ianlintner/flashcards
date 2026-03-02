// ─── Simple hash-based SPA router ────────────────────────────────────────────

export interface RouteMatch {
  route: string;
  params: Record<string, string>;
}

interface RouteConfig {
  pattern: RegExp;
  name: string;
  paramNames: string[];
}

type RouteHandler = (params: Record<string, string>) => void;

const routes: RouteConfig[] = [];
const handlers = new Map<string, RouteHandler>();

export function registerRoute(
  name: string,
  pattern: string,
  handler: RouteHandler,
): void {
  // Convert simple pattern like "/play/:id" to regex
  const paramNames: string[] = [];
  const regexStr = pattern.replace(/:(\w+)/g, (_match, paramName: string) => {
    paramNames.push(paramName);
    return "([^/]+)";
  });
  routes.push({
    pattern: new RegExp(`^${regexStr}$`),
    name,
    paramNames,
  });
  handlers.set(name, handler);
}

export function matchRoute(hash: string): RouteMatch | null {
  // Strip leading # and normalize
  const path = hash.replace(/^#?\/?/, "/").replace(/\/$/, "") || "/";

  for (const route of routes) {
    const match = path.match(route.pattern);
    if (match) {
      const params: Record<string, string> = {};
      route.paramNames.forEach((name, i) => {
        params[name] = decodeURIComponent(match[i + 1]);
      });
      return { route: route.name, params };
    }
  }
  return null;
}

export function navigateTo(path: string): void {
  window.location.hash = path;
}

export function getCurrentRoute(): RouteMatch | null {
  return matchRoute(window.location.hash);
}

let initialized = false;

export function initRouter(fallback: () => void): void {
  if (initialized) return;
  initialized = true;

  const handleHash = (): void => {
    const match = matchRoute(window.location.hash);
    if (match) {
      const handler = handlers.get(match.route);
      if (handler) {
        handler(match.params);
        return;
      }
    }
    fallback();
  };

  window.addEventListener("hashchange", handleHash);

  // Handle initial route on load
  if (window.location.hash && window.location.hash !== "#") {
    // Defer to allow main.ts init() to complete first
    setTimeout(handleHash, 100);
  }
}

export function buildShareUrl(deckId: string): string {
  const base = window.location.origin + window.location.pathname;
  return `${base}#/play/${encodeURIComponent(deckId)}`;
}

export function buildBrowseUrl(category?: string): string {
  const base = window.location.origin + window.location.pathname;
  if (category) {
    return `${base}#/browse/${encodeURIComponent(category)}`;
  }
  return `${base}#/browse`;
}

export function buildDeckUrl(deckId: string): string {
  const base = window.location.origin + window.location.pathname;
  return `${base}#/deck/${encodeURIComponent(deckId)}`;
}
