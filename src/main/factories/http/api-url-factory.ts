export const makeApiUrl = (path: string) => {
  const url = 'http://fordevs.herokuapp.com/api' + path;
  return url;
}