export const getLocalStorage = (key) => {
  let data = localStorage.getItem(key);

  if (data) {
    return data.split(",");
  }
  return [];
};
