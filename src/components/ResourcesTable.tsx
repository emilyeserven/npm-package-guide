import { badgeMap, type ResourceGroup } from '../data/overallResources'

export function renderResourcesTableHtml(groups: ResourceGroup[]): string {
  let html = ""
  groups.forEach(group => {
    html += `<div class="resources-category">${group.category}</div>`
    group.items.forEach(item => {
      html += `<div class="resource-row">`
      html += `<a class="resource-link" href="${item.url}" target="_blank" rel="noopener noreferrer">${item.name}</a>`
      html += `<span class="resource-desc">${item.desc}</span>`
      html += `<span class="resource-badges">`
      item.badges.forEach(b => {
        const badge = badgeMap[b]
        if (badge) html += `<span class="resource-badge ${badge.cls}">${badge.label}</span>`
      })
      html += `</span></div>`
    })
  })
  return html
}
