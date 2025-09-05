/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main grid containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid
  const gridChildren = Array.from(grid.children);

  // First two children are the left and right column content
  // Left column: heading
  const leftCol = gridChildren[0];
  // Right column: paragraph
  const rightCol = gridChildren[1];

  // Third child: inner grid for bottom row
  const bottomGrid = gridChildren[2];
  let leftBottom, rightBottom;
  if (bottomGrid && bottomGrid.classList.contains('grid-layout')) {
    // Get bottom row children
    const bottomChildren = Array.from(bottomGrid.children);
    // leftBottom: avatar + name/title
    leftBottom = bottomChildren[1];
    // rightBottom: logo svg
    rightBottom = bottomChildren[2];
  }

  // Compose left column cell
  const leftCellContent = [leftCol, leftBottom].filter(Boolean);
  // Compose right column cell
  const rightCellContent = [rightCol, rightBottom].filter(Boolean);

  // Table header
  const headerRow = ['Columns block (columns26)'];
  // Table content row: two columns
  const contentRow = [leftCellContent, rightCellContent];

  // Create block table
  const block = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace original element
  element.replaceWith(block);
}
