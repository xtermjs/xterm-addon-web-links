## xterm-addon-web-links

⚠️ This addon has moved to the core [xtermjs/xterm.js](https://github.com/xtermjs/xterm.js) repo ⚠️

An addon for [xterm.js](https://github.com/xtermjs/xterm.js) that enabled web links. This addon requires xterm.js 3.14+.

### Install

```bash
npm install --save xterm-addon-web-links
```

### Usage

```ts
import { Terminal } from 'xterm';
import { WebLinksAddon } from 'xterm-addon-web-links';

const terminal = new Terminal();
terminal.loadAddon(new WebLinksAddon());
```

You can also specify a custom handler and options, see the [API](https://github.com/xtermjs/xterm-addon-web-links/blob/master/typings/web-links.d.ts) for more details.
