/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element exists
  if (!element) return;

  // Header row as per block requirements
  const headerRow = ['Columns block (columns38)'];

  // Get all immediate children (the columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: If no columns found, do nothing
  if (!columns.length) return;

  // Each column cell will contain the entire column div (including its image)
  const contentRow = columns;

  // Build the table data
  const tableData = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
