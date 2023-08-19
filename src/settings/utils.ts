export const decodeJwtResponse = (jwt: string): Record<string, string | number> | null => {
  try {
    return JSON.parse(atob(jwt.split('.')[1]))
  } catch {
    return null
  }
}
