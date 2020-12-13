const toUrl = (string) => {
  try {
    return new URL(string);
  } catch {
    return null;
  }
};

export default toUrl;
