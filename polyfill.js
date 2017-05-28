'use strict';

if (!String.prototype.includes) {
    String.prototype.includes = function (search, start) {
        if (typeof start !== 'number') {
            start = 0;
        }

        if (start + search.length > this.length) {
            return false;
        } else {
            return this.indexOf(search, start) !== -1;
        }
    };
}

if (!AudioContext.prototype.createKarplus) {
    AudioContext.prototype.createKarplus = function (frequency) {
        var impulse = 0.001 * this.sampleRate;
        var N = Math.round(this.sampleRate / frequency);
        var y = new Float32Array(N);
        var n = 0;

        var node = this.createScriptProcessor(4096, 0, 1);
        node.onaudioprocess = function (e) {
            var output = e.outputBuffer.getChannelData(0);
            for (var i = 0; i < e.outputBuffer.length; ++i) {
                var xn = (--impulse >= 0) ? Math.random() - 0.5 : 0;
                output[i] = y[n] = xn + (y[n] + y[(n + 1) % N]) / 2;
                if (++n >= N) n = 0;
            }
        };
        return node;
    };
}
