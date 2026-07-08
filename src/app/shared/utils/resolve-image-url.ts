import { environment } from '../../../environments/environment';

/**
 * `thumbnail`/`featuredImage`/`coverImage` hold either a static asset path
 * (served by this Angular app, e.g. `/assets/projects/x.png`) or a path
 * returned by the backend's upload endpoint (e.g. `/uploads/x.png`, served
 * from the API origin, not this app's origin). Only the latter needs the
 * API origin prefixed.
 */
export function resolveImageUrl(path: string | null | undefined): string {
  if (!path) return '';
  if (/^https?:\/\//.test(path) || path.startsWith('/assets/')) return path;
  return `${environment.apiUrl}${path}`;
}
