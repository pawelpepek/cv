import { RenderMode, ServerRoute } from '@angular/ssr';

// All routes are static, so everything is prerendered at build time
// (outputMode "static" in angular.json) — no Node server in production.
export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
