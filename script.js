'use strict';

$(function () {
    var audioCtx = new window.AudioContext();
    var playNote = function (frequency) {
        var gain = audioCtx.createGain();
        gain.connect(audioCtx.destination);

        audioCtx.createKarplus(frequency).connect(gain);

        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 5);
        setTimeout(function () {
            gain.disconnect();
        }, 5000);
    };

    $('.gtr-guitar[data-strum]').each(function () {
        var $gtr = $(this);
        $gtr.data('strum').reverse().forEach(function (fret, string) {
            $gtr.find(
                '.gtr-string[data-string="' + (string + 1) + '"] ' +
                '.gtr-note[data-fret="' + fret + '"]'
            ).addClass('selected');
        });
        $gtr.click(function () {
            $gtr.find('.gtr-note.selected').sort(function (a, b) {
                return $(a).data('note-index') > $(b).data('note-index');
            }).each(function (index, note) {
                var noteObject = new Note($(note).data('note-index'));
                setTimeout(function () {
                    playNote(noteObject.frequency());
                }, index * 80);
            });
        });
    });

    $('.gtr-guitar[data-single-notes="true"] .gtr-note').click(function () {
        var $note = $(this);
        var note = new Note($note.data('note-index'));
        playNote(note.frequency());
    });
});
