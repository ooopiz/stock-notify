import got from 'got';

export const apiCall = async (url, opts={}) => {
  const response = await got(url, opts).json();
  return response;
  //try {
  //  const response = await got(url, opts).json();
  //  return response;
  //} catch(e) {
  //  console.log(e)
  //}
}