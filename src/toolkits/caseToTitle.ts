export function toTitleCase(input: string): string {
  return input
    .replace(/([a-z])([A-Z])/g, '$1 $2') // camelCase and PascalCase
    .replace(/_/g, ' ') // snake_case
    .replace(/\s+/g, ' ') // remove extra spaces
    .trim() // trim leading/trailing spaces
    .toLowerCase()
    .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()); // capitalize first letter of each word
}
