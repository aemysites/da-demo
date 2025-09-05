/* global WebImporter */
export default function parse(element, { document }) {
  if (!element || !element.classList.contains('grid-layout')) return;

  // Table header row as required
  const headerRow = ['Cards (cards17)'];
  const rows = [headerRow];

  // Get all immediate children (each card wrapper)
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    // Find the image inside the card
    const img = cardDiv.querySelector('img');
    if (!img) return;
    // Only include the image in a single column (no unnecessary empty column)
    rows.push([img]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
