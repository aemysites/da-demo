/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container that holds the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Each direct child of the grid is a column
  const columnDivs = Array.from(grid.children);

  // For each column, find the image container and get the image element
  const columns = columnDivs.map(col => {
    // Defensive: find the first img inside this column
    const img = col.querySelector('img');
    return img ? img : '';
  });

  // Build the table rows
  const headerRow = ['Columns block (columns16)'];
  const columnsRow = columns;
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
