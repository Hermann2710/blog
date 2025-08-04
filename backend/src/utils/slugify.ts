export const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Remplace espaces par -
    .replace(/&/g, "-and-") // Remplace &
    .replace(/[^\w\-]+/g, "") // Retire caractères spéciaux
    .replace(/\-\-+/g, "-") // Retire tirets multiples
}
