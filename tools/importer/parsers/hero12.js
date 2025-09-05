/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Get the two main grid children
  const gridDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Row 1: Block header
  const headerRow = ['Hero (hero12)'];

  // Row 2: Background image (optional)
  let bgImgCell = '';
  if (gridDivs[0]) {
    const bgImg = gridDivs[0].querySelector('img.cover-image');
    if (bgImg) bgImgCell = bgImg;
  }

  // Row 3: Content (headline, list, CTA)
  let contentCell = '';
  if (gridDivs[1]) {
    const cardBody = gridDivs[1].querySelector('.card-body');
    if (cardBody) {
      const innerGrid = cardBody.querySelector('.grid-layout');
      if (innerGrid) {
        // Find the right content div (with h2)
        const rightDiv = Array.from(innerGrid.children).find(div => div.querySelector && div.querySelector('h2'));
        const leftImg = innerGrid.querySelector('img.cover-image');
        const contentParts = [];
        // Only include left image if it's not the same as the background image
        if (leftImg && (!bgImgCell || leftImg.src !== bgImgCell.src)) {
          contentParts.push(leftImg.cloneNode(true));
        }
        if (rightDiv) {
          Array.from(rightDiv.childNodes).forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim())) {
              contentParts.push(node.cloneNode(true));
            }
          });
        }
        contentCell = contentParts.length > 0 ? contentParts : '';
      } else if (cardBody.textContent.trim()) {
        contentCell = cardBody.cloneNode(true);
      } else {
        contentCell = '';
      }
    } else if (gridDivs[1].textContent.trim()) {
      contentCell = gridDivs[1].cloneNode(true);
    } else {
      contentCell = '';
    }
  }

  // Only include the content row if it is not empty
  const rows = [
    headerRow,
    [bgImgCell],
  ];
  if (
    (Array.isArray(contentCell) && contentCell.length > 0) ||
    (typeof contentCell === 'string' && contentCell.trim() !== '') ||
    (contentCell && contentCell.textContent && contentCell.textContent.trim() !== '')
  ) {
    rows.push([contentCell]);
  }

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
