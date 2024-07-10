export const generateUniqueId = () => {
  return Math.floor(Math.random() * Date.now()).toString();
};

export const getImageUrl = (path: string, name: string) => {
  return new URL(`${path}${name}`, import.meta.url).href;
};
