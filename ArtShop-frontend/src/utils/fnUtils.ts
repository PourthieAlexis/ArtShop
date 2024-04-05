interface PageData {
    data: {
        pagination: {
            itemsPerPage: number;
        }
    };
}

export function calculateTotalItems(pages: PageData[] | undefined): number {
    if (!pages) return 0;
    return pages.reduce((total, page) => total + page.data.pagination.itemsPerPage, 0);
}
