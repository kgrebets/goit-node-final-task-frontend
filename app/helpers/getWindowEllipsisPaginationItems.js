/**
 * Generate pagination in via as 1,2,3,4,...,144 or, 1,...,142,143,144
 *
 * @param current
 * @param total
 * @returns {*[]}
 */
const getPaginationItems = (current, total) => {
  const delta = 2;
  const range = [];
  const rangeWithDots = [];
  let last = null;

  for (let i = 1; i <= total; i++) {
    if (
      i === 1 ||
      i === total ||
      (i >= current - delta && i <= current + delta)
    ) {
      range.push(i);
    }
  }

  for (const page of range) {
    if (last) {
      if (page - last === 2) {
        rangeWithDots.push(last + 1);
      } else if (page - last > 2) {
        rangeWithDots.push('dots');
      }
    }
    rangeWithDots.push(page);
    last = page;
  }

  return rangeWithDots;
};

export default getPaginationItems;