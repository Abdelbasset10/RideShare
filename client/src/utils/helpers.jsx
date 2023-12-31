/**
 * Format a GET Query object to a string usable in the url
 * @param {object} queryOptions
 */
export const formatGetQueryOptions = (queryOptions = {}) => {
  let returnValue = "";
  if (queryOptions.length > 0) {
    for (let [key, value] of queryOptions.entries()) {
      returnValue = `${returnValue}${key}=${value}&`;
      console.log(key + " = " + value);
    }
  }
};
