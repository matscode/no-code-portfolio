export function sortWorkExperience<T extends { entry: { startDate?: string | null } }>(
  items: T[],
) {
  return [...items].sort((a, b) => {
    const dateA = new Date(a.entry.startDate ?? 0).getTime();
    const dateB = new Date(b.entry.startDate ?? 0).getTime();
    return dateB - dateA;
  });
}
