/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element exists and is a grid block
  if (!element || !element.classList.contains('w-layout-grid')) return;

  // Header row as per spec
  const headerRow = ['Cards (cards19)'];
  const rows = [headerRow];

  // Get all immediate card children
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    // Each cardDiv contains: icon (svg) and text (p)
    // Find the icon (svg)
    let iconDiv = null;
    let iconSvg = null;
    let textP = null;
    // Defensive: find icon and text
    const children = cardDiv.children;
    for (let i = 0; i < children.length; i++) {
      // Icon is nested: div > div.icon > svg
      if (children[i].querySelector('.icon')) {
        iconDiv = children[i].querySelector('.icon');
        iconSvg = iconDiv && iconDiv.querySelector('svg');
      }
      // Text is in <p>
      if (children[i].tagName === 'P') {
        textP = children[i];
      }
    }
    // Fallback: if not found, try direct
    if (!iconSvg && cardDiv.querySelector('.icon svg')) {
      iconSvg = cardDiv.querySelector('.icon svg');
    }
    if (!textP && cardDiv.querySelector('p')) {
      textP = cardDiv.querySelector('p');
    }
    // Defensive: clone icon if needed (to avoid removing from original)
    let iconCell;
    if (iconSvg) {
      iconCell = iconSvg;
    } else if (iconDiv) {
      iconCell = iconDiv;
    } else {
      iconCell = document.createTextNode('');
    }
    // Text cell: use the <p> element directly
    let textCell = textP ? textP : document.createTextNode('');
    // Add row: [icon, text]
    rows.push([iconCell, textCell]);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(block);
}
