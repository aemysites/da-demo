/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image from a card block
  function getImage(card) {
    // Look for an img tag inside the card
    const img = card.querySelector('img');
    return img || '';
  }

  // Helper to extract text content from a card block
  function getTextContent(card) {
    // We'll collect tag, heading, paragraph, and any CTA
    const fragments = [];
    // Tag (optional)
    const tagGroup = card.querySelector('.tag-group');
    if (tagGroup) {
      fragments.push(tagGroup);
    }
    // Heading (h2 or h3 or h4)
    const heading = card.querySelector('h2, h3, h4');
    if (heading) {
      fragments.push(heading);
    }
    // Paragraph (description)
    const paragraph = card.querySelector('p');
    if (paragraph) {
      fragments.push(paragraph);
    }
    return fragments;
  }

  // Find the grid layout containing the cards
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Prepare header row
  const headerRow = ['Cards (cards2)'];
  const rows = [headerRow];

  // Defensive: get all direct children of grid
  const gridChildren = Array.from(grid.children);

  // First card: big card on the left
  const firstCard = gridChildren[0];
  if (firstCard && firstCard.matches('a')) {
    const image = getImage(firstCard);
    const textContent = getTextContent(firstCard);
    rows.push([
      image,
      textContent
    ]);
  }

  // Second block: vertical stack of two cards with images
  const secondBlock = gridChildren[1];
  if (secondBlock) {
    const cards = Array.from(secondBlock.querySelectorAll(':scope > a.utility-link-content-block'));
    cards.forEach(card => {
      const image = getImage(card);
      const textContent = getTextContent(card);
      rows.push([
        image,
        textContent
      ]);
    });
  }

  // Third block: vertical stack of text-only cards separated by dividers
  const thirdBlock = gridChildren[2];
  if (thirdBlock) {
    const cards = Array.from(thirdBlock.querySelectorAll(':scope > a.utility-link-content-block'));
    cards.forEach(card => {
      // No image, so first cell is empty string
      const textContent = getTextContent(card);
      rows.push([
        '',
        textContent
      ]);
    });
  }

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
