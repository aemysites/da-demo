/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Block header row as required
  const headerRow = ['Hero (hero39)'];

  // --- Row 2: Background Image ---
  // Find the image element (background image)
  let bgImg = null;
  const imgEl = element.querySelector('img.cover-image');
  if (imgEl) {
    bgImg = imgEl;
  }

  // --- Row 3: Content ---
  // Find the main heading, paragraph, and CTA button
  let heading = element.querySelector('h1');
  let paragraph = element.querySelector('p.paragraph-lg');
  let cta = element.querySelector('.button-group a');

  // Compose content cell
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (paragraph) contentCell.push(paragraph);
  if (cta) contentCell.push(cta);

  // Compose table rows
  const rows = [
    headerRow,
    [bgImg ? bgImg : ''],
    [contentCell]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
