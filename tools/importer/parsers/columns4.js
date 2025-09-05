/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only process if element has children
  if (!element || !element.children || element.children.length === 0) return;

  // Header row as specified
  const headerRow = ['Columns block (columns4)'];

  // Get all direct children (each is a column cell)
  const columnDivs = Array.from(element.children);

  // Defensive: Only process if at least one column
  if (columnDivs.length === 0) return;

  // For each column, find the main content (image or other)
  const contentRow = columnDivs.map((col) => {
    // If the column contains a single image, use it directly
    const img = col.querySelector('img');
    if (img) return img;
    // Otherwise, use the whole column div
    return col;
  });

  // Build the table rows
  const rows = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
