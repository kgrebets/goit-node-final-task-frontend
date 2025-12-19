import { CLOUDFRONT_PUBLIC_URL } from '../constants/constants.js';

/**
 * Create a cloudfront path to image
 *
 * @param categoryId
 * @param categoryName
 * @returns {`https://d39z06q23dz2dg.cloudfront.net/categories/${string}/${string}.jpg`}
 */
export default function getCategoryImageUrl(categoryId, categoryName) {
  return `${CLOUDFRONT_PUBLIC_URL}/categories/${categoryId}/${categoryName}.jpg`;
}
