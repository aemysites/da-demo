/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // 1. Header row
  const headerRow = ['Hero (hero28)'];

  // 2. Background image row
  let bgImg = null;
  const parallaxDiv = element.querySelector('.ix-parallax-scale-out-hero');
  if (parallaxDiv) {
    bgImg = parallaxDiv.querySelector('img');
  }

  // 3. Content row (title, subheading, CTA)
  let contentCell = null;
  const gridDivs = element.querySelectorAll(':scope > .w-layout-grid > div');
  if (gridDivs.length > 1) {
    const contentDiv = gridDivs[1];
    const container = contentDiv.querySelector('.utility-margin-bottom-6rem');
    if (container) {
      contentCell = container;
    } else {
      contentCell = contentDiv;
    }
  }

  // Build the table rows
  const rows = [
    headerRow,
    [bgImg ? bgImg : ''],
    [contentCell ? contentCell : ''],
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
