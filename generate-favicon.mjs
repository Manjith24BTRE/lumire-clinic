import { renderToString } from 'react-dom/server';
import { Flower2 } from 'lucide-react';
import React from 'react';
import fs from 'fs';

const svgString = renderToString(
  React.createElement(Flower2, { color: 'white', size: 24, strokeWidth: 2 })
);

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  <circle cx="24" cy="24" r="24" fill="#B9975B" />
  <g transform="translate(12, 12)">
    ${svgString.replace('<svg ', '<svg fill="none" ')}
  </g>
</svg>`;

fs.writeFileSync('public/favicon.svg', faviconSvg);
console.log('favicon.svg generated!');
