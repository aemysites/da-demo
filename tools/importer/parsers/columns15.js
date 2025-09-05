/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout containing the two columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get the two main columns (left: text/buttons, right: image)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: contains heading, subheading, and button group
  const leftCol = columns[0];
  // Right column: contains the main image
  const rightCol = columns[1];

  // --- Extract content for left column ---
  const leftColContent = document.createElement('div');
  // Heading
  const heading = leftCol.querySelector('h1');
  if (heading) leftColContent.appendChild(heading.cloneNode(true));
  // Subheading
  const subheading = leftCol.querySelector('p');
  if (subheading) leftColContent.appendChild(subheading.cloneNode(true));
  // Button group
  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) leftColContent.appendChild(buttonGroup.cloneNode(true));

  // --- Extract content for right column ---
  let rightColContent = null;
  const img = rightCol.querySelector('img');
  if (img) {
    rightColContent = document.createElement('div');
    rightColContent.appendChild(img.cloneNode(true));
  }

  // Table header row
  const headerRow = ['Columns block (columns15)'];

  // Table content row: only include columns with content
  const contentRow = [leftColContent];
  if (rightColContent && rightColContent.innerHTML.trim() !== '') {
    contentRow.push(rightColContent);
  }

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
