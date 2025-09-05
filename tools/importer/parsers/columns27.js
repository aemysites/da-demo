/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid container (columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (should be two: content and image)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: content block (text, button)
  const contentCol = columns[0];
  // Second column: image block
  const imageCol = columns[1];

  // Header row
  const headerRow = ['Columns block (columns27)'];

  // Second row: two columns
  const secondRow = [contentCol, imageCol];

  // Build table
  const cells = [headerRow, secondRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}
