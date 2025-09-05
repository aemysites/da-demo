/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Block header as per guidelines
  const headerRow = ['Cards (cards7)'];
  const rows = [headerRow];

  // Each card is a .utility-aspect-1x1 div
  const cardDivs = element.querySelectorAll(':scope > .utility-aspect-1x1');

  cardDivs.forEach((cardDiv) => {
    const img = cardDiv.querySelector('img');
    if (!img) return;
    // Always two columns per block spec: image and text content (empty string if none)
    rows.push([img, '']);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
