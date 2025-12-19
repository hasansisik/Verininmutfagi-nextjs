"use client"

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SimplePaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export function SimplePagination({
    currentPage,
    totalPages,
    onPageChange,
}: SimplePaginationProps) {
    if (totalPages <= 1) return null

    const getPageNumbers = () => {
        const pages = []
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i)
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, "...", totalPages)
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
            } else {
                pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages)
            }
        }
        return pages
    }

    return (
        <div className="flex items-center justify-center space-x-2 py-4 mt-4">
            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-9 w-9 border-gray-200 hover:bg-white hover:border-gray-300 transition-all rounded-xl"
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-1">
                {getPageNumbers().map((page, index) => (
                    page === "..." ? (
                        <div key={`dots-${index}`} className="flex h-9 w-9 items-center justify-center">
                            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                        </div>
                    ) : (
                        <Button
                            key={`page-${page}`}
                            variant={currentPage === page ? "default" : "ghost"}
                            size="icon"
                            onClick={() => onPageChange(Number(page))}
                            className={`h-9 w-9 rounded-xl transition-all ${currentPage === page
                                    ? "bg-black text-white hover:bg-black/90 shadow-sm"
                                    : "text-muted-foreground hover:text-foreground hover:bg-gray-100/50"
                                }`}
                        >
                            {page}
                        </Button>
                    )
                ))}
            </div>

            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="h-9 w-9 border-gray-200 hover:bg-white hover:border-gray-300 transition-all rounded-xl"
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    )
}
