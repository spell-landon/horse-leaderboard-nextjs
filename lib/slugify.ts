export const slugify = (name: string) => {
  return name.toLowerCase().replaceAll(' ', '-').trim();
};
