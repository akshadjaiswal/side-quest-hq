// Utility functions for generating URL slugs

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
    .replace(/-+/g, '-')       // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, '')   // Remove leading/trailing hyphens
}

export function generateUniqueSlug(text: string, userId: string, existingSlugs: string[] = []): string {
  let slug = generateSlug(text)
  let counter = 1

  // If slug exists, append a number
  while (existingSlugs.includes(slug)) {
    slug = `${generateSlug(text)}-${counter}`
    counter++
  }

  return slug
}

export function isValidSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
  return slugRegex.test(slug)
}
