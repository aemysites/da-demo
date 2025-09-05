/* global WebImporter */
export default function parse(element, { document }) {
  // Always start with the header row
  const rows = [['Cards (cards23)']];

  // Find all tab panes (each tab has its own set of cards)
  const tabPanes = element.querySelectorAll(':scope > div');

  tabPanes.forEach(tabPane => {
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is an anchor
    const cards = grid.querySelectorAll('a.utility-link-content-block, a.card-link.secondary-card-link');
    cards.forEach(card => {
      // Try to find an image (inside a div, usually)
      let img = card.querySelector('img');
      let imageCell = img ? img.cloneNode(true) : '';

      // For text, try to get heading and description
      let heading = card.querySelector('h3, .h4-heading');
      let desc = card.querySelector('div.paragraph-sm');

      // Compose text cell as a fragment to preserve structure
      let textCell = document.createElement('div');
      if (heading) textCell.appendChild(heading.cloneNode(true));
      if (desc) textCell.appendChild(desc.cloneNode(true));

      // If no image, but there is a text block, still add (for cards without images)
      if (imageCell || textCell.textContent.trim()) {
        rows.push([imageCell, textCell.childNodes.length ? Array.from(textCell.childNodes) : textCell.textContent]);
      }
    });
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
