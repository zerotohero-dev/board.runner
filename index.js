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

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _child_process = require('child_process');

var _path = require('path');

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _boardLog = require('board.log');

var _boardLog2 = _interopRequireDefault(_boardLog);

var run = function run(cwd, glb) {
    (0, _boardLog2['default'])('Board:: Starting Job Runner…');

    (0, _glob2['default'])(glb, { cwd: cwd }, function (err, files) {
        if (err) {
            return;
        }

        files.forEach(function (file) {
            var process = (0, _child_process.spawn)('node', [(0, _path.join)(cwd, file)]);

            process.stdout.on('data', function (data) {
                return (0, _boardLog2['default'])('OUT:', data.toString());
            });
            process.stderr.on('data', function (data) {
                return (0, _boardLog2['default'])('ERR:', data.toString());
            });
        });
    });

    (0, _boardLog2['default'])('Board:: Job Runner has started.');
};

exports.run = run;

//# sourceMappingURL=index.js.map