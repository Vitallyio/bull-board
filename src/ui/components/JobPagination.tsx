import React from 'react'

import { NavLink, useParams } from 'react-router-dom'
import { AppQueue } from '../../@types/app'
import * as api from '../../@types/api'
import { Status } from './constants'

export const JobPagination = ({
  queue,
  status,
}: {
  queue: AppQueue
  status: Status
}) => {
  const count = queue.counts[status]
  const params = useParams<api.RouteParams>()
  let pageNumbers: (number | undefined)[] = []
  const totalPages = Math.ceil(count / 10)
  if (totalPages >= 2 && totalPages <= 10) {
    pageNumbers = new Array(totalPages).fill(null).map((_, i) => i)
  } else if (totalPages > 10) {
    if (params.page) {
      pageNumbers = [
        0,
        1,
        undefined,
        parseInt(params.page, 10),
        undefined,
        totalPages - 2,
        totalPages - 1,
      ]
    } else {
      pageNumbers = [
        0,
        1,
        undefined,
        Math.floor(totalPages / 2),
        totalPages - 2,
        totalPages - 1,
      ]
    }
  }

  return (
    <div className="job-pagination">
      {pageNumbers.map(pageNum => {
        const pageString = pageNum !== 0 ? `/${pageNum}` : ''
        return (
          <NavLink
            exact
            key={`${pageNum}`}
            className={`menu-item ${status} ${count === 0 ? 'off' : 'on'}`}
            activeClassName={`selected`}
            to={{
              pathname: `/${encodeURIComponent(
                queue.name,
              )}/${status}${pageString}`,
            }}
          >
            <b className="page">{pageNum != null ? pageNum + 1 : '...'}</b>
          </NavLink>
        )
      })}
    </div>
  )
}
