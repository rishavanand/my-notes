import React from "react"
import Link from "gatsby-link"

export default function Menu() {
  return (
    <div>
      <ol>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/blog">Blog</Link>
        </li>
      </ol>
    </div>
  )
}
