/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from each anchor
  function extractCardContent(card) {
    // Find the image container (first div with utility-aspect-2x3)
    const imageDiv = card.querySelector('.utility-aspect-2x3');
    let image = null;
    if (imageDiv) {
      image = imageDiv.querySelector('img');
    }

    // Find the text content
    // Tag and date row
    const tagRow = card.querySelector('.flex-horizontal');
    // Heading
    const heading = card.querySelector('h3, .h4-heading');

    // Compose text cell
    const textCell = document.createElement('div');
    if (tagRow) textCell.appendChild(tagRow);
    if (heading) textCell.appendChild(heading);

    return [image, textCell];
  }

  // Get all card anchors (direct children)
  const cards = Array.from(element.querySelectorAll(':scope > a.utility-link-content-block'));

  // Build table rows
  const rows = cards.map(card => extractCardContent(card));

  // Header row as required
  const headerRow = ['Cards (cards24)'];

  // Compose table data
  const tableData = [headerRow, ...rows];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element
  element.replaceWith(block);
}
