// Morse code dictionary
const morseCode = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
    'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
    'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
    '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----', ' ': ' '
};

const typewriter_speed = 10; // Speed of typing in ms

// Function to convert text to morse code
function convertTextToMorse(text) {
    return text.toUpperCase().split('').map(char => morseCode[char] || '').join(' ');
}

// Function to convert text to morse code (use musical symbols instead of dots/dashes)
function convertTextToMusicalMorse(text) {
    return text.toUpperCase().split('').map(char => {
        const morse = morseCode[char];
        if (!morse) return '';  // Return empty string for unsupported characters

        return morse.replace(/\./g, '♪').replace(/-/g, '♩.');  // ♪ = quaver, ♩. = dotted crotchet
    }).join(' ');
}

// Typewriter effect for displaying musical Morse code
function displayMusicalMorseCode(morseString) {
    const display = document.getElementById('note-morse-display');
    display.innerHTML = ''; // Clear any previous content
    let index = 0;

    function typewriter() {
        if (index < morseString.length) {
            display.innerHTML += morseString[index];
            index++;
            setTimeout(typewriter, typewriter_speed);
        }
    }

    typewriter();
}

// Typewriter effect for Morse code display
function displayMorseCode(morseString) {
    const display = document.getElementById('morse-display');
    display.innerHTML = ''; // Clear any previous content
    let index = 0;

    function typewriter() {
        if (index < morseString.length) {
            display.innerHTML += morseString[index];
            index++;
            setTimeout(typewriter, typewriter_speed);  // Delay each character by the typerwriter_speed
        }
    }

    typewriter();
}

// Keyboard shortcut for command+return (Mac) and ctrl+enter (Windows)
document.addEventListener('keydown', function(event) {
    const isMac = navigator.userAgent.indexOf('Mac') !== -1;  // Detect macOS based on user agent
    if ((isMac && event.metaKey && event.key === 'Enter') || (!isMac && event.ctrlKey && event.key === 'Enter')) {
        convertToMidi();
    }
});

// Function to convert morse code to MIDI
function convertToMidi() {
    const input = document.getElementById('morse-input').value;
    const morseString = convertTextToMorse(input);

    if (!morseString) {
        document.getElementById('status').textContent = "Invalid input!";
        return;
    }

    // Display the Morse code on the page with typewriter effect
    displayMorseCode(morseString);
    // Display the Morse code on the page with musical symbols
    displayMusicalMorseCode(convertTextToMusicalMorse(input));  // Use musical symbols

    const file = new Midi.File();
    const track = new Midi.Track();
    file.addTrack(track);

    const note = 36;  // C2 note
    const dotDuration = 32;  // 1/16th note length
    const dashDuration = dotDuration * 3;  // Dotted 1/8th note length
    const restBetweenNotes = dotDuration;  // 1-dot-length rest between dots/dashes
    const letterPause = dotDuration * 2;  // Additional rest to make 3 units between letters
    const wordPause = dotDuration * 6;  // Additional rest to make 7 units between words

    // Parse the morse code string and generate the MIDI file
    for (let i = 0; i < morseString.length; i++) {
        const symbol = morseString[i];

        if (symbol === '.') {
            // Play a dot (1/16th note)
            track.addNoteOn(0, note, 0);  // Turn note on immediately
            track.addNoteOff(0, note, dotDuration);  // Turn note off after dot duration
            // Only add rest if this is not the last character
            if (i < morseString.length - 1) {
                track.addNoteOff(0, 0, restBetweenNotes);  // Add 1-unit rest
            }
        } else if (symbol === '-') {
            // Play a dash (dotted 1/8th note)
            track.addNoteOn(0, note, 0);  // Turn note on immediately
            track.addNoteOff(0, note, dashDuration);  // Turn note off after dash duration
            // Only add rest if this is not the last character
            if (i < morseString.length - 1) {
                track.addNoteOff(0, 0, restBetweenNotes);  // Add 1-unit rest
            }
        } else if (symbol === ' ') {
            // Check if it's a letter space or word space
            if (morseString[i + 1] === ' ') {
                // Word space: add 7-unit rest (already includes 1-unit rest)
                track.addNoteOff(0, 0, wordPause);
                i++;  // Skip the next space
            } else {
                // Letter space: add additional 2-unit rest (for total of 3 units)
                track.addNoteOff(0, 0, letterPause);
            }
        }
    }
    
    track.addNoteOff(0, 0, 0);  // No extra rest after the last symbol

    // Convert the MIDI file into byte data
    const midiFile = file.toBytes();
    const uint8Array = new Uint8Array(midiFile.length);
    for (let i = 0; i < midiFile.length; i++) {
        uint8Array[i] = midiFile.charCodeAt(i);  // Convert each character in the byte array
    }

    // Create the Blob using the Uint8Array
    const blob = new Blob([uint8Array], { type: 'audio/midi' });
    const url = URL.createObjectURL(blob);

    // Create and display the download link
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'morse_code.mid';
    // downloadLink.textContent = 'Download MIDI file';
    downloadLink.className = 'btn';  // Add the button class
    downloadLink.innerHTML = '<i class="fas fa-music"></i> Download MIDI file';  // Add the icon and text
    document.getElementById('status').textContent = '';
    document.getElementById('status').appendChild(downloadLink);
}