/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid container (columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (should be two: image and content)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: image
  const imageCol = columns[0];
  // Second column: content (heading, subheading, buttons)
  const contentCol = columns[1];

  // Table header row
  const headerRow = ['Columns block (columns1)'];
  // Table content row: two columns
  const contentRow = [imageCol, contentCol];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
