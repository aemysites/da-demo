/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // 1. Header row: must match block name exactly
  const headerRow = ['Hero (hero6)'];

  // 2. Background image row
  let bgImg = element.querySelector('img.cover-image');
  let bgImgCell = '';
  if (bgImg) {
    bgImgCell = bgImg;
  }

  // 3. Content row (title, subheading, CTA)
  // Find the card containing the text and buttons
  let card = element.querySelector('.card.utility-padding-all-3rem');
  let contentCell = '';
  if (card) {
    contentCell = card;
  }

  // Compose the table rows
  const rows = [
    headerRow,
    [bgImgCell],
    [contentCell],
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
