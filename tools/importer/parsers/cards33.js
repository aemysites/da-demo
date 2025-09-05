/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct card links
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));

  // Block header row as required
  const headerRow = ['Cards (cards33)'];
  const rows = [headerRow];

  cardLinks.forEach((cardLink) => {
    // Image: first <img> inside the card
    const img = cardLink.querySelector('img');

    // Text content: the div after the image (contains tag, time, h3, p, 'Read')
    // Structure: <a> > <div> > <img> + <div> (text)
    let textDiv = null;
    const divs = cardLink.querySelectorAll(':scope > div');
    if (divs.length > 1) {
      textDiv = divs[1];
    } else if (divs.length === 1) {
      textDiv = divs[0];
    } else {
      textDiv = cardLink;
    }

    rows.push([
      img,
      textDiv
    ]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
