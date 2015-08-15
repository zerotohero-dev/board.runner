'use strict';

/*
 *  ______                     _________
 *  ___  /_____________ _____________  /
 *  __  __ \  __ \  __ `/_  ___/  __  /
 *  _  /_/ / /_/ / /_/ /_  /   / /_/ /
 *  /_.___/\____/\__,_/ /_/    \__,_/
 *      a minimalist dashboard and monitoring solution.
 *
 * This program is distributed under the terms of the MIT license.
 * Please see `LICENSE.md` file for details.
 *
 * Send your comments and suggestions to…
 * <https://github.com/v0lkan/board/issues>
 */

import {spawn} from 'child_process';
import {join} from 'path';

import glob from 'glob';

import log from 'board.log';

// TODO: this module can be a more general-purpose module; consider renaming
// it and publishing as something else.

let runFiles = (files, cwd) => {
    let dirName = cwd || '';

    files.forEach((file) => {
        let process = spawn('node', [join(dirName, file)]);

        process.stdout.on('data', (data) => log('OUT:', data.toString()));
        process.stderr.on('data', (data) => log('ERR:', data.toString()));
    });
};

let run = (cwd, glb) => {
    log('Board:: Starting Job Runner…');

    glob(glb, {cwd: cwd}, (err, files) => {
        if (err) {return;}

        runFiles(files, cwd);
    });

    log('Board:: Job Runner has started.');
};

let runRelative = (dirName, relativeCwd, glb) => {
    run(join(dirName, relativeCwd), glb);
};

export {run, runFiles, runRelative};
