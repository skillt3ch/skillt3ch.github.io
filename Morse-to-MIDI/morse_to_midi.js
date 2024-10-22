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

        // Replace Morse dots/dashes with musical symbols (♪ for 1/8th note, ♩ for 1/4th note)
        return morse.replace(/\./g, '♪').replace(/-/g, '♩');
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
    const musicalMorseString = convertTextToMusicalMorse(input);

    if (!morseString) {
        document.getElementById('status').textContent = "Invalid input!";
        return;
    }

    // Display the Morse code on the page with typewriter effect
    displayMorseCode(morseString);

    // Display the musical Morse code on the page with typewriter effect
    displayMusicalMorseCode(musicalMorseString);

    const file = new Midi.File();
    const track = new Midi.Track();
    file.addTrack(track);

    const note = 36;  // C1 note (in Ableton)
    const dotDuration = 128;  // 1/8th note length
    const dashDuration = 256;  // 1/4th note length
    const letterPause = dotDuration * 3;  // Pause between letters (3-dot length)
    const wordPause = dotDuration * 7;  // Pause between words (7-dot length)
    const restDuration = dotDuration;  // Rest between dots and dashes

    // Parse the morse code string and generate the MIDI file
    for (let i = 0; i < morseString.length; i++) {
        const symbol = morseString[i];

        if (symbol === '.') {
            track.addNoteOn(0, note, 0);  // Turn note on immediately
            track.addNoteOff(0, note, dotDuration);  // Turn note off after dot duration
            track.addNoteOff(0, 0, restDuration);  // Add a rest (empty space) after dot
        } else if (symbol === '-') {
            track.addNoteOn(0, note, 0);  // Turn note on immediately
            track.addNoteOff(0, note, dashDuration);  // Turn note off after dash duration
            track.addNoteOff(0, 0, restDuration);  // Add a rest (empty space) after dash
        } else if (symbol === ' ') {
            // Check if it's a letter space or word space
            if (morseString[i + 1] === ' ') {
                track.addNoteOff(0, 0, wordPause);  // Add word pause (7-dot length)
                i++;  // Skip the next space
            } else {
                track.addNoteOff(0, 0, letterPause);  // Add letter pause (3-dot length)
            }
        }
    }

    // Convert the MIDI file into byte data
    const midiFile = file.toBytes();
    console.log('Generated MIDI file bytes:', midiFile);  // Log the byte data
    console.log('MIDI byte array size:', midiFile.length);  // Log the size of the byte array

    if (midiFile.length === 0) {
        console.error('MIDI file generation failed: empty byte array');
        document.getElementById('status').textContent = "Failed to generate MIDI file!";
        return;
    }

    // Convert the byte array into a Uint8Array properly
    const uint8Array = new Uint8Array(midiFile.length);  // Initialize the correct size
    for (let i = 0; i < midiFile.length; i++) {
        uint8Array[i] = midiFile.charCodeAt(i);  // Convert each character in the byte array
    }
    console.log('Uint8Array size:', uint8Array.length);  // Log to ensure conversion is correct

    // Create the Blob using the Uint8Array
    const blob = new Blob([uint8Array], { type: 'audio/midi' });
    console.log('Blob size after Uint8Array conversion:', blob.size);

    const url = URL.createObjectURL(blob);
    console.log('Blob size:', blob.size);  // Log the size of the blob

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