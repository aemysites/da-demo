/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children by selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter(el => el.matches(selector));
  }

  // 1. Get tab labels
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabLinks = tabMenu ? getDirectChildren(tabMenu, 'a') : [];
  const tabLabels = tabLinks.map(link => {
    // Defensive: get the first div inside each link for the label
    const labelDiv = link.querySelector('div');
    return labelDiv ? labelDiv.textContent.trim() : link.textContent.trim();
  });

  // 2. Get tab panes/content
  const tabContent = element.querySelector('.w-tab-content');
  const tabPanes = tabContent ? getDirectChildren(tabContent, 'div.w-tab-pane') : [];

  // 3. Build table rows
  const headerRow = ['Tabs (tabs22)'];
  const rows = [headerRow];

  for (let i = 0; i < tabLabels.length; i++) {
    const label = tabLabels[i];
    const pane = tabPanes[i];
    let contentCell;
    if (pane) {
      // Defensive: get the main grid inside each pane
      const grid = pane.querySelector('.w-layout-grid');
      if (grid) {
        // Reference the entire grid (contains heading and image)
        contentCell = grid;
      } else {
        // Fallback: reference the pane itself
        contentCell = pane;
      }
    } else {
      // If no pane, leave cell empty
      contentCell = '';
    }
    rows.push([label, contentCell]);
  }

  // 4. Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // 5. Replace original element
  element.replaceWith(block);
}
