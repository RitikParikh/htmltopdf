const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const https = require('https');
let html_to_pdf = require('html-pdf-node');
const express = require('express');
const app = express();

app.get('/', async (req, res) => {

   // Create a browser instance
  const browser = await puppeteer.launch({headless: false});

  // Create a new page
  const page = await browser.newPage();

  //Get HTML content from HTML file
  const html = fs.readFileSync('index.html', 'utf-8');
  await page.setContent(html, { waitUntil: 'domcontentloaded' });

  // To reflect CSS used for screens instead of print
  await page.emulateMediaType('screen');

  // Downlaod the PDF
  const pdf = await page.pdf({
    path: 'result.pdf',
    margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
    printBackground: true,
    format: 'A4',
  });

//   await page.click('._2vsJm');

  // Close the browser instance
  await browser.close();
  res.download("./result.pdf");

});


app.listen(3004)