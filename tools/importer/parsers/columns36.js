/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // The block header row
  const headerRow = ['Columns block (columns36)'];

  // Find the main grid containing the two columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get the two main columns
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: text block
  const leftCol = columns[0];

  // Right column: images grid
  const rightCol = columns[1];
  let imagesGrid = rightCol.querySelector('.w-layout-grid');
  let images = [];
  if (imagesGrid) {
    images = Array.from(imagesGrid.querySelectorAll('img'));
  }
  if (images.length === 0) {
    images = Array.from(rightCol.querySelectorAll('img'));
  }

  // Table row: leftCol (text), rightCol (images array)
  const contentRow = [leftCol, images];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
