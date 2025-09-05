/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only process if element exists
  if (!element || !document) return;

  // Table header row as specified
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Get all direct card links (each card is an <a> block)
  const cards = element.querySelectorAll(':scope > a.card-link');

  cards.forEach(card => {
    // Defensive: Each card should have image and text content
    // Image: first child div with image inside
    const imageDiv = card.querySelector('.utility-aspect-3x2');
    let imageEl = null;
    if (imageDiv) {
      imageEl = imageDiv.querySelector('img');
    }

    // Text content: the second child div
    const textDiv = card.querySelector('.utility-padding-all-1rem');
    // Defensive: textDiv may be missing, but in this HTML it always exists

    // Compose the row: [image, text content]
    // Use the actual elements, not clones
    const row = [imageEl, textDiv];
    rows.push(row);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
