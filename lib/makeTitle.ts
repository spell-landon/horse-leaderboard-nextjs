export const makeTitle = (slug: string) => {
  let words = slug?.split('-');
  if (!words) {
    return null;
  } else {
    for (let i = 0; i < words.length; i++) {
      let word = words[i];
      words[i] = word.charAt(0).toUpperCase() + word.slice(1);
    }
  }

  return words.join(' ');
};
