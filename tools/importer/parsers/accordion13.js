/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get all direct children with class 'divider' (each is an accordion item)
  const items = Array.from(element.querySelectorAll(':scope > .divider'));

  // Defensive: if the first child is also a divider, include it
  if (element.classList.contains('divider')) {
    items.unshift(element);
  }

  // The header row must be exactly as specified
  const headerRow = ['Accordion (accordion13)'];

  // Each item is a .divider containing a .w-layout-grid with two children: title and content
  const rows = items.map((divider) => {
    // Find the grid inside the divider
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return [ '', '' ]; // Defensive: skip if structure is unexpected
    // The first child is the title, the second is the content
    const children = Array.from(grid.children);
    const title = children[0] || document.createElement('div');
    const content = children[1] || document.createElement('div');
    return [title, content];
  });

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
