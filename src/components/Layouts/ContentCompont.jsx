import React from 'react'
import { Outlet } from 'react-router-dom'

export default function ContentCompont() {
  return (
    <div>
      <Outlet />
    </div>
  )
}
