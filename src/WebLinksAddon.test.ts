/**
 * Copyright (c) 2019 The xterm.js authors. All rights reserved.
 * @license MIT
 */

import * as puppeteer from 'puppeteer';
import { assert } from 'chai';
import { ITerminalOptions } from 'xterm';

const APP = 'http://127.0.0.1:3000';

let browser: puppeteer.Browser;
let page: puppeteer.Page;
const width = 800;
const height = 600;

describe('API Integration Tests', () => {
  before(async function(): Promise<any> {
    this.timeout(10000);
    browser = await puppeteer.launch({
      headless: process.argv.indexOf('--headless') !== -1,
      slowMo: 80,
      args: [`--window-size=${width},${height}`]
    });
    page = (await browser.pages())[0];
    await page.setViewport({ width, height });
  });

  after(() => {
    browser.close();
  });

  beforeEach(async () => {
    await page.goto(APP);
  });

  it('Default options', async function(): Promise<any> {
    this.timeout(10000);
    await openTerminal({ rendererType: 'dom' });
    await page.evaluate(`window.term.loadAddon(new window.WebLinksAddon())`);
    await page.evaluate(`window.term.write('  http://foo.com  ')`);
    await hoverCell(3, 1);

    // const match = row.match(term.regex);
    // const uri = match[term.options.matchIndex];

    // assert.equal(uri, 'http://foo.com');
  });
});

async function openTerminal(options: ITerminalOptions = {}): Promise<void> {
  await page.evaluate(`window.term = new Terminal(${JSON.stringify(options)})`);
  await page.evaluate(`window.term.open(document.querySelector('#terminal'))`);
  if (options.rendererType === 'dom') {
    await page.waitForSelector('.xterm-rows');
  } else {
    await page.waitForSelector('.xterm-text-layer');
  }
}

async function hoverCell(col: number, row: number): Promise<void> {
  await page.hover(`.xterm-rows > :nth-child(${col}) > :nth-child(${row})`);
}
