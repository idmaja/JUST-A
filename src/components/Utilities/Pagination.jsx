"use client"

import React from 'react';

const Pagination = ({ page, lastPage, setPage }) => {
    // Helper function to generate the array of page numbers
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;  // Control how many pages to display at a time

        let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(lastPage, startPage + maxVisiblePages - 1);

        // If there are fewer pages than maxVisiblePages, adjust startPage
        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    // Smooth scroll to the top of the page
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Handler to change page and scroll to top
    const handlePageChange = (pageNum) => {
        setPage(pageNum);
        scrollToTop(); // Scroll to the top after page change
    };

    return (
        <div className="flex items-center justify-center gap-2 py-4 text-2xl text-color-primary">
            {/* Previous Button */}
            {page > 1 && (
                <button
                    className="px-3 py-2 text-sm font-bold text-white transition-all bg-blue-500 rounded-full hover:bg-blue-700"
                    onClick={() => handlePageChange(page - 1)}
                >
                    Prev
                </button>
            )}

            {/* Page number buttons */}
            {getPageNumbers().map((pageNum) => (
                <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-2 text-sm font-bold transition-all rounded-full ${
                        pageNum === page
                            ? 'bg-color-dark text-color-primary hover:bg-color-secondary text-xl'
                            : 'bg-color-dark text-color-blue hover:bg-color-hover hover:text-color-primary'
                    }`}
                >
                    {pageNum}
                </button>
            ))}

            {/* Next Button */}
            {page < lastPage && (
                <button
                    className="px-3 py-2 text-sm font-bold text-white transition-all bg-blue-500 rounded-full hover:bg-blue-700"
                    onClick={() => handlePageChange(page + 1)}
                >
                    Next
                </button>
            )}
        </div>
    );
};

export default Pagination;
