/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find main grid columns for the block
  const mainGrids = element.querySelectorAll('.w-layout-grid.grid-layout');
  // First grid: left column (headline, intro, author, button)
  // Second grid: right column (images)

  // --- LEFT COLUMN ---
  let leftColContent = [];
  if (mainGrids[0]) {
    // Get headline block (trend alert, h1)
    const headlineBlock = mainGrids[0].querySelector('div');
    if (headlineBlock) leftColContent.push(headlineBlock);

    // Get intro paragraph
    const introParagraph = mainGrids[0].querySelector('.rich-text.paragraph-lg');
    if (introParagraph) leftColContent.push(introParagraph);

    // Get author row (avatar, name, date, read time)
    const authorRow = mainGrids[0].querySelector('.w-layout-grid.grid-layout > .flex-horizontal.y-center');
    if (authorRow) leftColContent.push(authorRow);

    // Get button
    const readMoreBtn = mainGrids[0].querySelector('a.button');
    if (readMoreBtn) leftColContent.push(readMoreBtn);
  }

  // --- RIGHT COLUMN ---
  let rightColContent = [];
  // Find the grid with images
  const imageGrid = element.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  if (imageGrid) {
    // Get all images inside aspect wrappers
    const aspectWrappers = imageGrid.querySelectorAll('.utility-aspect-1x1');
    aspectWrappers.forEach(wrapper => {
      const img = wrapper.querySelector('img');
      if (img) rightColContent.push(img);
    });
  }

  // Compose table rows
  const headerRow = ['Columns block (columns11)'];
  const contentRow = [leftColContent, rightColContent];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
