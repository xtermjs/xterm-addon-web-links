/**
 * Copyright (c) 2019 The xterm.js authors. All rights reserved.
 * @license MIT
 */

import { Terminal } from 'xterm';
import { WebLinksAddon } from '..';

(<any>window).Terminal = Terminal;
(<any>window).WebLinksAddon = WebLinksAddon;
