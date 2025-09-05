/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container that holds the two columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the immediate children of the grid (should be two: image and content)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: image
  const imageCol = columns[0];
  // Second column: content (text, headings, etc)
  const contentCol = columns[1];

  // Build the table rows
  const headerRow = ['Columns block (columns32)'];
  const contentRow = [imageCol, contentCol];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
