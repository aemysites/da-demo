/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content (image, title, description) from a card wrapper
  function extractCardContent(cardDiv) {
    // Find the first image in the card
    const img = cardDiv.querySelector('img');
    // Find the heading (h3) and paragraph (p) if present
    const heading = cardDiv.querySelector('h3, h2, h4, h5, h6');
    const desc = cardDiv.querySelector('p');
    // Compose the text cell content
    const textContent = [];
    if (heading) textContent.push(heading);
    if (desc) textContent.push(desc);
    // Defensive: if neither heading nor desc, try to get any text
    if (textContent.length === 0) {
      // fallback: get all text nodes except image
      Array.from(cardDiv.childNodes).forEach((node) => {
        if (node.nodeType === 3 && node.textContent.trim()) {
          const p = document.createElement('p');
          p.textContent = node.textContent.trim();
          textContent.push(p);
        }
      });
    }
    return [img, textContent];
  }

  // Get all direct children of the grid
  const cards = [];
  const children = element.querySelectorAll(':scope > div');
  children.forEach((child) => {
    // Only process if it contains an image
    const img = child.querySelector('img');
    if (!img) return;
    // If the card has a heading or paragraph, treat as a full card
    const hasText = child.querySelector('h3, h2, h4, h5, h6, p');
    if (hasText) {
      cards.push(extractCardContent(child));
    } else {
      // If no text, just image
      cards.push([img, '']);
    }
  });

  // Build the table rows
  const rows = [
    ['Cards (cards25)'], // header row
    ...cards
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
