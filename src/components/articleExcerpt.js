import React from "react"
import { Link } from "gatsby";

export default (data) => {
    const excerpt = data.excerpt;
    const {title, date, year, month, day} = data.frontmatter;
    const slug = data.fields.slug;
    return (
      <Link to={slug}>
        <span className="date">{ date }</span>
        <span className="month">{ month }</span>
        <span className="day">{ day }</span>
        <span className="year">{ year }</span>
        <div className="title">{ title }</div>
        <div className="excerpt">{ excerpt }</div>
      </Link>
    )
}
  