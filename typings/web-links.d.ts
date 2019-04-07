/**
 * Copyright (c) 2017 The xterm.js authors. All rights reserved.
 * @license MIT
 */


import { Terminal, ILinkMatcherOptions } from 'xterm';

// TODO: This is temporary, link to xterm when the new version is published
export interface ITerminalAddon {
  activate(terminal: Terminal): void;
  dispose(): void;
}

export class WebLinksAddon implements ITerminalAddon {
  constructor(handler?: (event: MouseEvent, uri: string) => void, options?: ILinkMatcherOptions);

  public activate(terminal: Terminal): void;
  public dispose(): void;
}
