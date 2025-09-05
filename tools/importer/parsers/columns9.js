/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid container with columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Build the header row as required
  const headerRow = ['Columns block (columns9)'];

  // Build the second row: each cell is the content of a column
  // For each column, include the whole column element
  const contentRow = columns.map((col) => col);

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
