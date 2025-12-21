import { CLOUDFRONT_PUBLIC_URL } from '../constants/constants.js';

/**
 *
 * @param imageName
 * @returns {`https://d39z06q23dz2dg.cloudfront.net/${string}`}
 */
export default function getAvatarImageUrl(imageName) {
  if (typeof imageName === 'string' && imageName.startsWith('https')) {
    return imageName;
  }
  return `${CLOUDFRONT_PUBLIC_URL}/${imageName}`;
}
