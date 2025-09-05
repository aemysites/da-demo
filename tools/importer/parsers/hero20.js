/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // 1. Header row
  const headerRow = ['Hero (hero20)'];

  // 2. Background images row (all images in the collage)
  let imagesRowContent = [];
  const gridImageContainer = element.querySelector('.ix-hero-scale-3x-to-1x');
  if (gridImageContainer) {
    const imgs = gridImageContainer.querySelectorAll('img');
    if (imgs.length) {
      imagesRowContent = Array.from(imgs);
    }
  }
  const imagesRow = [imagesRowContent.length ? imagesRowContent : ''];

  // 3. Content row (headline, subheading, CTA)
  const contentRowContent = [];
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content');
  if (contentContainer) {
    // Headline
    const headline = contentContainer.querySelector('h1');
    if (headline) contentRowContent.push(headline);
    // Subheading
    const subheading = contentContainer.querySelector('p');
    if (subheading) contentRowContent.push(subheading);
    // CTA buttons
    const buttonGroup = contentContainer.querySelector('.button-group');
    if (buttonGroup) {
      const buttons = buttonGroup.querySelectorAll('a');
      if (buttons.length) {
        // Instead of pushing an array, push each button as a separate element
        buttons.forEach(btn => contentRowContent.push(btn));
      }
    }
  }
  const contentRow = [contentRowContent.length ? contentRowContent : ''];

  // Compose table rows
  const cells = [
    headerRow,
    imagesRow,
    contentRow,
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
