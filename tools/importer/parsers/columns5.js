/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the two columns
  const grid = element.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  if (!grid) return;

  // Get all direct children of the grid (should be 2: content and image)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: content block (heading, paragraph, buttons)
  const contentCol = columns.find(
    (col) => col.querySelector('h2, .h2-heading')
  );
  // Second column: image
  const imageCol = columns.find(
    (col) => col.tagName === 'IMG'
  );

  // Defensive: if not found, fallback to order
  const leftCol = contentCol || columns[0];
  const rightCol = imageCol || columns[1];

  // Build the table rows
  const headerRow = ['Columns block (columns5)'];
  const contentRow = [leftCol, rightCol];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
