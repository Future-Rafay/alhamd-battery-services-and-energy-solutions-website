'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ProductPaginationProps {
  currentPage: number
  totalPages: number
}

export function ProductPagination({ currentPage, totalPages }: ProductPaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  if (totalPages <= 1) return null

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    
    router.push(`/products?${params.toString()}`)
  }

  // Generate range of page numbers to show
  const getPageNumbers = () => {
    const range = []
    const start = Math.max(1, currentPage - 1)
    const end = Math.min(totalPages, currentPage + 1)
    
    for (let i = start; i <= end; i++) {
      range.push(i)
    }
    return range
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-12 py-4">
      {/* Prev Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-9 h-9 border-slate-200"
        aria-label="Previous Page"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {/* Pages */}
      {currentPage > 2 && (
        <>
          <Button
            variant="outline"
            onClick={() => handlePageChange(1)}
            className="w-9 h-9 border-slate-200 text-xs font-semibold"
          >
            1
          </Button>
          {currentPage > 3 && <span className="text-slate-400 px-1 text-xs">...</span>}
        </>
      )}

      {getPageNumbers().map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? 'default' : 'outline'}
          onClick={() => handlePageChange(page)}
          className={`w-9 h-9 text-xs font-bold ${
            currentPage === page
              ? 'bg-primary hover:bg-primary text-white'
              : 'border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          {page}
        </Button>
      ))}

      {currentPage < totalPages - 1 && (
        <>
          {currentPage < totalPages - 2 && <span className="text-slate-400 px-1 text-xs">...</span>}
          <Button
            variant="outline"
            onClick={() => handlePageChange(totalPages)}
            className="w-9 h-9 border-slate-200 text-xs font-semibold"
          >
            {totalPages}
          </Button>
        </>
      )}

      {/* Next Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-9 h-9 border-slate-200"
        aria-label="Next Page"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  )
}
