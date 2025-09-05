/* global WebImporter */
export default function parse(element, { document }) {
  // Find the card body containing the slide content
  const cardBody = element.querySelector('.card-body');
  if (!cardBody) return;

  // Extract the image (mandatory)
  const img = cardBody.querySelector('img');
  // Defensive: Only proceed if image exists
  if (!img) return;

  // Extract the heading (optional)
  const heading = cardBody.querySelector('.h4-heading');

  // Build the text cell content, preserving semantic heading if present
  let textCell = '';
  if (heading) {
    // Reference the existing heading node (do not clone)
    textCell = heading;
  }

  // Build table rows as per block spec
  const headerRow = ['Carousel (carousel21)'];
  const slideRow = [img, textCell];
  const rows = [headerRow, slideRow];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block
  element.replaceWith(table);
}
