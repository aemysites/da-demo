/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract title and content from each accordion item
  function getAccordionRow(accordionEl) {
    // Defensive selectors for title and content
    let titleEl = null;
    let contentEl = null;

    // Title: find the .paragraph-lg inside the toggle
    const toggle = accordionEl.querySelector('.w-dropdown-toggle');
    if (toggle) {
      titleEl = toggle.querySelector('.paragraph-lg');
    }
    // Content: find the .accordion-content nav, then the rich-text div inside
    const nav = accordionEl.querySelector('.accordion-content');
    if (nav) {
      // Find the rich-text block inside nav
      const richText = nav.querySelector('.rich-text, .w-richtext');
      if (richText) {
        contentEl = richText;
      } else {
        // Fallback: use the nav itself
        contentEl = nav;
      }
    }
    // Defensive fallback for title
    if (!titleEl) {
      // Try to find any text node inside toggle
      if (toggle) {
        titleEl = document.createElement('div');
        titleEl.textContent = toggle.textContent.trim();
      } else {
        titleEl = document.createElement('div');
        titleEl.textContent = 'Untitled';
      }
    }
    // Defensive fallback for content
    if (!contentEl) {
      contentEl = document.createElement('div');
      contentEl.textContent = '';
    }
    return [titleEl, contentEl];
  }

  // Build the table rows
  const rows = [];
  // Header row
  rows.push(['Accordion (accordion34)']);

  // Each accordion item is a direct child with class 'accordion'
  const accordionItems = element.querySelectorAll(':scope > .accordion');
  accordionItems.forEach((accordionEl) => {
    rows.push(getAccordionRow(accordionEl));
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
