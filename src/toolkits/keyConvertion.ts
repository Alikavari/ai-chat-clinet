// Converts a snake_case string to camelCase
export function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

// Recursively converts all keys in an object from snake_case to camelCase
export function convertKeysToCamelCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(convertKeysToCamelCase);
  } else if (obj !== null && typeof obj === 'object') {
    return Object.entries(obj).reduce(
      (acc, [key, value]) => {
        const newKey = toCamelCase(key);
        acc[newKey] = convertKeysToCamelCase(value);
        return acc;
      },
      {} as Record<string, any>
    );
  }
  return obj;
}
