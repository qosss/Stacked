export const DISPLAY_NAME_MAX_LENGTH = 24;
export const DISPLAY_NAME_REGEX = /^[A-Za-z\s]+$/;

export function validateDisplayName(name: string): string | null {
  if (!name || name.trim().length < 2) {
    return "Display name must be at least 2 characters";
  }
  if (name.length > DISPLAY_NAME_MAX_LENGTH) {
    return `Display name must be ${DISPLAY_NAME_MAX_LENGTH} characters or less`;
  }
  if (!DISPLAY_NAME_REGEX.test(name)) {
    return "Display name can only contain letters and spaces";
  }
  return null;
}

export function sanitizeDisplayName(name: string): string {
  return name.replace(/[^A-Za-z\s]/g, "");
}
