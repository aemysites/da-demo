/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs (columns)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Prepare the header row as required by the block spec
  const headerRow = ['Columns block (columns29)'];

  // Each column cell should reference the original column div (which contains the image)
  const columnsRow = columnDivs.map(div => div);

  // Compose the table rows
  const cells = [headerRow, columnsRow];

  // Create the table using DOMUtils
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
