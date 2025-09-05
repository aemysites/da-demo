/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid containing all cards
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // Helper to extract image from a card block
  function getCardImage(card) {
    // Look for .utility-aspect-* container with img inside
    const aspectDiv = card.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    if (aspectDiv) {
      const img = aspectDiv.querySelector('img');
      if (img) return img;
    }
    // Fallback: any img inside card
    const img = card.querySelector('img');
    if (img) return img;
    return null;
  }

  // Helper to extract text content from a card block
  function getCardText(card) {
    // Collect heading, paragraph, and button (if present)
    const textContent = [];
    // Heading (h2 or h3 or h4)
    const heading = card.querySelector('h2, h3, h4');
    if (heading) textContent.push(heading);
    // Paragraph(s)
    const paragraphs = card.querySelectorAll('p');
    paragraphs.forEach(p => textContent.push(p));
    // Button or CTA (div.button or a.button)
    const button = card.querySelector('.button');
    if (button) textContent.push(button);
    return textContent;
  }

  // Find all card blocks (direct children that are links)
  let cardBlocks = Array.from(mainGrid.children).filter(child => child.matches('a.utility-link-content-block'));
  // Also check for nested grid (for smaller cards)
  mainGrid.querySelectorAll('.w-layout-grid.grid-layout').forEach(nestedGrid => {
    const nestedCards = Array.from(nestedGrid.children).filter(child => child.matches('a.utility-link-content-block'));
    cardBlocks = cardBlocks.concat(nestedCards);
  });

  // Defensive: if no cards found, abort
  if (!cardBlocks.length) return;

  // Table header
  const headerRow = ['Cards (cards37)'];
  const rows = [headerRow];

  // Build rows for each card
  cardBlocks.forEach(card => {
    const img = getCardImage(card);
    const textContent = getCardText(card);
    // Only add row if image and text are present
    if (img && textContent.length) {
      rows.push([img, textContent]);
    }
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(block);
}
