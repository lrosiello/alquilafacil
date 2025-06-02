export function convertBigIntsToStrings(obj: unknown): unknown {
  if (typeof obj === "bigint") {
    return obj.toString();
  } else if (Array.isArray(obj)) {
    return obj.map(convertBigIntsToStrings);
  } else if (obj && typeof obj === "object") {
    const newObj: Record<string, unknown> = {};
    for (const key in obj) {
      const value = (obj as Record<string, unknown>)[key];
      newObj[key] = convertBigIntsToStrings(value);
    }
    return newObj;
  }
  return obj;
}
