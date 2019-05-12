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

  beforeEach(async function(): Promise<any> {
    this.timeout(5000);
    await page.goto(APP);
  });

  it('.com', async function(): Promise<any> {
    this.timeout(20000);
    await testHostName('foo.com');
  });

  it('.com.au', async function(): Promise<any> {
    this.timeout(20000);
    await testHostName('foo.com.au');
  });

  it('.io', async function(): Promise<any> {
    this.timeout(20000);
    await testHostName('foo.io');
  });
});

async function testHostName(hostname: string): Promise<void> {
  await openTerminal({ rendererType: 'dom' });
  await page.evaluate(`window.term.loadAddon(new window.WebLinksAddon())`);
  await page.evaluate(`window.term.writeln('  http://${hostname}  ')`);
  assert.equal(await getLinkAtCell(3, 1), `http://${hostname}`);
  await page.evaluate(`window.term.writeln('  http://${hostname}/a~b#c~d?e~f  ')`);
  assert.equal(await getLinkAtCell(3, 2), `http://${hostname}/a~b#c~d?e~f`);
  await page.evaluate(`window.term.writeln('  http://${hostname}/colon:test  ')`);
  assert.equal(await getLinkAtCell(3, 3), `http://${hostname}/colon:test`);
  await page.evaluate(`window.term.writeln('  http://${hostname}/colon:test:  ')`);
  assert.equal(await getLinkAtCell(3, 4), `http://${hostname}/colon:test`);
  await page.evaluate(`window.term.writeln('"http://${hostname}/"')`);
  assert.equal(await getLinkAtCell(2, 5), `http://${hostname}/`);
  await page.evaluate(`window.term.writeln('\\'http://${hostname}/\\'')`);
  assert.equal(await getLinkAtCell(2, 6), `http://${hostname}/`);
  await page.evaluate(`window.term.writeln('http://${hostname}/subpath/+/id')`);
  assert.equal(await getLinkAtCell(1, 7), `http://${hostname}/subpath/+/id`);
}

async function openTerminal(options: ITerminalOptions = {}): Promise<void> {
  await page.evaluate(`window.term = new Terminal(${JSON.stringify(options)})`);
  await page.evaluate(`window.term.open(document.querySelector('#terminal'))`);
  if (options.rendererType === 'dom') {
    await page.waitForSelector('.xterm-rows');
  } else {
    await page.waitForSelector('.xterm-text-layer');
  }
}

async function getLinkAtCell(col: number, row: number): Promise<string> {
  const cellSelector = `.xterm-rows > :nth-child(${row}) > :nth-child(${col})`;
  await page.waitForSelector(cellSelector);
  await page.hover(cellSelector);
  await page.waitForSelector(`.xterm-rows > :nth-child(${row}) > span[style]`);
  return await page.evaluate(`Array.prototype.reduce.call(document.querySelectorAll('.xterm-rows > :nth-child(${row}) > span[style]'), (a, b) => a + b.textContent, '');`);
}
