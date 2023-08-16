import { useMemo } from 'react'

const range = (start, end) => {
    let length = end - start + 1
    return Array.from({ length }, (_, idx) => idx + start);
}

export const usePagination = ({
    totalPageCount,
    siblingCount = 1,
    currentPage
}) => {

    const paginationRange = useMemo(() => {
        const totalPageNumbers = siblingCount + 5

        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount)
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount)

        const shouldShowLeftDots = leftSiblingIndex > 2
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

        const firstPageIndex = 1
        const lastPageIndex = totalPageCount


        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount
            let leftRange = range(1, leftItemCount)
            return [...leftRange, 'dots', totalPageCount]
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = 3 + 2 * siblingCount
            let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount)
            return [firstPageIndex, 'dots', ...rightRange]
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex)
            return [firstPageIndex, 'dots', ...middleRange, 'dots', lastPageIndex]
        }

    }, [totalPageCount, siblingCount, currentPage])

    return paginationRange
}
