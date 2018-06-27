import React from 'react'
import cn from 'classnames'

import './pagination.css'

const Pagination = ({
  total,
  active,
  onChange
}) => (
  <nav className="pagination">
    {active > 1 && (
      <button
        className="pagination__previous"
        onClick={() => onChange(active - 1)}
      >
        Previous
      </button>
    )}
    {
      Array(total)
        .fill(null)
        .map((_, i) => i + 1)
        .splice((active - 2) > 0 ? active - 2 : 0, 3)
        .map(n => (
          <button
            key={n}
            className={cn(
              'pagination__page',
              active === n && 'pagination__page--active'
            )}
            onClick={() => onChange(n)}
          >
            {n}
          </button>
        ))
    }
    {active < total && (
      <button
        className="pagination__next"
        onClick={() => onChange(active + 1)}
      >
        Next
      </button>
    )}
  </nav>
)

export default Pagination
