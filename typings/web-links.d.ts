/**
 * Copyright (c) 2017 The xterm.js authors. All rights reserved.
 * @license MIT
 */


import { Terminal, ILinkMatcherOptions } from 'xterm';

// TODO: This is temporary, link to xterm when the new version is published
export interface ITerminalAddon {
  dispose(): void;
}

export class WebLinksAddon implements ITerminalAddon {
  constructor(terminal: Terminal);
  public init(handler?: (event: MouseEvent, uri: string) => void, options?: ILinkMatcherOptions): void;

  public dispose(): void;
}
