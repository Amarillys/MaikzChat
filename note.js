/* eslint-env node */

var fs = require('fs');
class Note {
    constructor(file) {
        this._file = file;
        this._lines = [];
        this.refresh();
    }

    refresh() {
        fs.readFile(this._file, 'utf-8', (err, data) => {
            if (err) throw err;
            this._lines = data.split(/\r\n/ig);
        });
    }

    read(start, limit) {
        start = parseInt(start);
        limit = parseInt(limit);
        if (Number.isInteger(start) && (Number.isInteger(limit)))
            if (limit !== 0)
                return this._lines.slice(start, start + limit);
            else
                return this._lines.slice(start, this._lines.length);
        return [];
    }

    write(string) {
        fs.stat(this._file, function (err, stats) {
            if(stats.size > 1024 * 1048576)
                return;
        });
        if (string.length > 5600)
            string = string.replace(/</g, '&lt;').replace(/>/g, '&gt;').substr(0, 5600);
            fs.open(this._file, 'a+', (err, fd) => {
                if (err) throw err;
                var writeBuffer = Buffer.from(string + '\r\n', 'utf-8');
                fs.write(fd, writeBuffer, 0, writeBuffer.length, (err) => {
                    if (err) throw err;
                    if(fd.stats)
                    fs.close(fd);
                    this.refresh();
                });
            });
    }
}

module.exports = Note;
