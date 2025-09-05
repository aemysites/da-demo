/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Table header row
  const headerRow = ['Columns (columns31)'];

  // Second row: each cell is a column's content
  // For resilience, include the entire column element in each cell
  const contentRow = columns.map(col => col);

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
