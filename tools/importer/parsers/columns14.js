/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid container (the columns)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get immediate children of the grid
  const gridChildren = Array.from(grid.children);
  // Defensive: expect two columns (left: heading, right: paragraph + button)
  if (gridChildren.length < 2) return;

  // Left column: heading
  const leftCol = gridChildren[0]; // <h2>
  // Right column: content block (paragraph + button)
  const rightCol = gridChildren[1];

  // Table header row
  const headerRow = ['Columns (columns14)'];
  // Table content row: two columns
  const contentRow = [leftCol, rightCol];

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace original element with table
  element.replaceWith(table);
}
