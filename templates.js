const Templates = {
  dashboard({prevWord, nextWord, children}) {
    return `
      <div class="dashboard">
        <div class="dashboard_prev-word">${prevWord || ''}</div>
        <div class="dashboard_current-word">${children}</div>
        <div class="dashboard_next-word">${nextWord || ''}</div>
      </div>
    `
  },
  currentWord({matchedSegment, rest}) {
    return `
      <span class="current-word_matched-segment">${matchedSegment}</span>
      <span class="current-word_rest">${rest}</span>
    `
  },
  sidebar({collection, currentSlug}) {
    return `
      <ul class="sidebar">
        ${collection.map(([label, value, slug]) =>
          `<li class="sidebar ${slug === currentSlug ? "sidebar_active": ""}"><a href="${value}">${label}</a></li>`
        ).join("")}
      </ul>
    `
  }
}
