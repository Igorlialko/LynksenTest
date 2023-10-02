export { useDebounce } from './useDebounce';
export { useThrottle } from './useThrottle';

export function pick(obj, keys) {
  if (!obj) return obj;
  const ret = {};
  for (const key of keys) {
    ret[key] = obj[key];
  }
  return ret;
}

export function isEmpty(obj) {
  if (Array.isArray(obj)) return !obj.length;
  if (obj) return !Object.values(obj).length;
  return true;
}
