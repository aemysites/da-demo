/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Hero (hero35)'];

  // Row 2: Background image (none in provided HTML)
  const backgroundRow = [''];

  // Row 3: Content (title, subheading, CTA)
  // Defensive: find the grid container
  const grid = element.querySelector('.w-layout-grid');
  let contentCell = [];
  if (grid) {
    // Find the content block (usually the first child)
    const contentBlock = grid.children[0];
    if (contentBlock) {
      // Collect heading and subheading
      const heading = contentBlock.querySelector('h2');
      const subheading = contentBlock.querySelector('p');
      if (heading) contentCell.push(heading);
      if (subheading) contentCell.push(subheading);
    }
    // Find the CTA button (usually the second child)
    const ctaBlock = grid.children[1];
    if (ctaBlock) {
      contentCell.push(ctaBlock);
    }
  }

  // Compose table rows
  const cells = [
    headerRow,
    backgroundRow,
    [contentCell],
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
