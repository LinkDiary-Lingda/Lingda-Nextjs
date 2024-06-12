export const isValidUrl = (url: string) => {
  const urlPattern = new RegExp(
    '^(https?:\\/\\/)?(www\\.)?' + // protocol
      '((([a-zA-Z0-9\\-])+\\.)+[a-zA-Z]{2,})' + // domain name and extension
      '(\\/[-a-zA-Z0-9@:%._\\+~#?&//=]*)?$', // path, query string, and fragment
    'i'
  );
  return urlPattern.test(url);
};
