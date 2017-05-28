'use strict';

(function ($) {
    $.fn.guitar = function (userOptions) {
        var globalOptions = $.extend({}, $.fn.guitar.defaults, userOptions);

        this.each(function () {
            var $this = $(this);
            var options = $.extend({}, globalOptions, $this.data());

            options.realTuning = options.tuning.slice().reverse();
            // options.realSelected = options.selected.slice().reverse();

            var $header = $('<div></div>');
            $header.addClass(options.cssClasses.header);
            $header.append(createFretNumbers(options));

            var $fretboard = $('<div></div>');
            $fretboard.addClass(options.cssClasses.fretboard);

            var $strings = createStrings(options);

            $fretboard.append($strings);

            var $footer = $('<div></div>');
            $footer.addClass(options.cssClasses.footer);
            $footer.append(createFretDots(options));

            $this.addClass(options.cssClasses.guitar);
            if (!($this.hasClass(options.cssClasses.horizontal) || $this.hasClass(options.cssClasses.vertical))) {
                $this.addClass(options.cssClasses.horizontal);
            }

            $this.append($header);
            $this.append($fretboard);
            $this.append($footer);
        });
        return this;
    };

    var createFretNumbers = function (options) {
        var $fretNumbers = $('<div></div>');
        $fretNumbers.addClass(options.cssClasses.fretNumbers);

        for (var fretIndex = options.startFret; fretIndex <= options.endFret; fretIndex++) {
            var $fretNumber = $('<div></div>');
            $fretNumber.addClass(options.cssClasses.fretNumber);

            $fretNumber.attr('data-fret', fretIndex);
            $fretNumbers.append($fretNumber);
        }
        return $fretNumbers;
    };

    var createStrings = function (options) {
        var $strings = [];

        for (var stringIndex = 1; stringIndex <= options.realTuning.length; stringIndex++) {
            var $string = $('<div></div>');
            $string.addClass(options.cssClasses.string);
            $string.attr('data-string', stringIndex);

            var openStringNote = Note.fromFullName(options.realTuning[stringIndex - 1]);

            for (var fretIndex = options.startFret; fretIndex <= options.endFret; fretIndex++) {
                var $note = $('<div></div>');
                $note.addClass(options.cssClasses.note);
                $note.attr('data-fret', fretIndex);

                var note = openStringNote.transpose(fretIndex);
                $note.attr('data-note-index', note.index);
                $note.attr('data-natural', note.naturalName());
                $note.attr('data-flat', note.isFlat());
                $note.attr('data-sharp', note.isSharp());
                $note.attr('data-octave', note.octave);

                $string.append($note);
            }

            $strings.push($string);
        }

        return $strings;
    };

    var createFretDots = function (options) {
        var $fretDots = $('<div></div>');
        $fretDots.addClass(options.cssClasses.fretDots);

        for (var fretIndex = options.startFret; fretIndex <= options.endFret; fretIndex++) {
            var $fretDot = $('<div></div>');
            $fretDot.addClass(options.cssClasses.fretDot);
            $fretDot.attr('data-fret', fretIndex);
            $fretDots.append($fretDot);
        }
        return $fretDots;
    };

    $.fn.guitar.defaults = {
        tuning: ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'],
        selected: [],
        startFret: 0,
        endFret: 24,
        cssClasses: {
            guitar: 'gtr-guitar',
            horizontal: 'gtr-horizontal',
            vertical: 'gtr-vertical',
            header: 'gtr-header',
            fretboard: 'gtr-fretboard',
            footer: 'gtr-footer',
            fretNumbers: 'gtr-fret-numbers',
            fretNumber: 'gtr-fret-number',
            string: 'gtr-string',
            note: 'gtr-note',
            fretDots: 'gtr-fret-dots',
            fretDot: 'gtr-fret-dot'
        }
    };

    $('.gtr-guitar').guitar();
}(jQuery));
