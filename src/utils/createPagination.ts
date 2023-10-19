export const createPaginationList = (
  currentPage: number,
  totalPages: number,
) => {
  const maxPages = 4;

  const pages = [{
    page: '1',
    current: currentPage === 1,
  }];

  let start = 0;
  let end = maxPages + 2;

  if (currentPage < maxPages + 1) {
     start = 2;
  } else if (
    currentPage >= maxPages + 1
    && currentPage < totalPages - 2
  ) {
     start = currentPage - 1
     end = start + 3
  } else {
    start = totalPages - maxPages;
  }

  if (currentPage >= totalPages - 3) {
    end = totalPages;
  }

  if (
    currentPage > maxPages
    && maxPages + 2 !== totalPages
  ) {
    pages.push({ page: '...', current: false })
  }

  for (let i = start; i < end; i++) {
    pages.push({ page: i.toString(), current: currentPage === i });
  }

  if (
    currentPage <= totalPages - 4
    && maxPages + 2 !== totalPages
  ) {
    pages.push({ page: '...', current: false })
  }

  pages.push({
    page: totalPages.toString(),
    current: currentPage === totalPages,
  });
  
  return pages;
};
