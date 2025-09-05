/* global WebImporter */
export default function parse(element, { document }) {
  // Only operate on the main section
  if (!element.matches('section.section')) return;

  // Find the grid-layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const columns = Array.from(grid.children);

  // Identify columns
  const imageCol = columns.find(col => col.querySelector && col.querySelector('img'));
  const contactCol = columns.find(col => col.tagName === 'UL');
  const textCol = columns.find(col => col !== imageCol && col !== contactCol);

  if (!imageCol || !contactCol || !textCol) return;

  // Clone nodes to avoid removing them from the original DOM before replacement
  const textColClone = textCol.cloneNode(true);
  const contactColClone = contactCol.cloneNode(true);
  const img = imageCol.querySelector('img');
  const imgClone = img ? img.cloneNode(true) : null;

  // Compose left cell: textCol (heading, subheading) + contactCol (ul)
  const leftCell = document.createElement('div');
  leftCell.appendChild(textColClone);
  leftCell.appendChild(contactColClone);

  // Compose right cell: image only
  const rightCell = document.createElement('div');
  if (imgClone) rightCell.appendChild(imgClone);

  // Table header must match block name exactly
  const headerRow = ['Columns block (columns18)'];
  const contentRow = [leftCell, rightCell];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the entire section (not just grid) with the table
  element.replaceWith(table);
}
