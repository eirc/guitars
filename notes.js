'use strict';

function Note(index) {
    this.index = index;
    this.octave = parseInt(this.index / Note.octave.length);
    this.octaveIndex = this.index % Note.octave.length;
    this.name = Note.octave[this.octaveIndex];
    this.fullName = this.name + this.octave;
}

Note.octave = [
    'C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'
];

Note.prototype.naturalName = function () {
    return this.name[0];
};

Note.prototype.isFlat = function () {
    return this.name.includes('♭');
};

Note.prototype.isSharp = function () {
    return this.name.includes('♯');
};

Note.prototype.frequency = function () {
    // http://www.phy.mtu.edu/~suits/NoteFreqCalcs.html
    var stepsFromBase = this.index - Note.frequencyBaseNote.index;
    var frequencyChange = Math.pow(Note.frequencyStepBase, stepsFromBase);
    var frequency = Note.frequencyBaseFrequency * frequencyChange;

    return frequency;
};

Note.prototype.transpose = function (steps) {
    return new Note(this.index + steps);
};

Note.fromFullName = function (fullName) {
    var noteNameComponents = fullName.split(/^(\w)([♯♭])?(\d+)$/);

    var natural = noteNameComponents[1];
    var flatOrSharp = noteNameComponents[2] || '';
    var octave = parseInt(noteNameComponents[3]);

    var octaveIndex = Note.octave.indexOf(natural + flatOrSharp);
    var index = octave * Note.octave.length + octaveIndex;

    return new Note(index);
};

Note.frequencyBaseNote = Note.fromFullName('A4');
Note.frequencyBaseFrequency = 440;
Note.frequencyStepBase = Math.pow(2, 1 / Note.octave.length);
