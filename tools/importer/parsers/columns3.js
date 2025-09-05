/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container (the columns wrapper)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Block header row as required
  const headerRow = ['Columns (columns3)'];

  // Each cell is the referenced DOM node for a column
  const contentRow = columns.map(col => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original section with the block table
  element.replaceWith(table);
}
