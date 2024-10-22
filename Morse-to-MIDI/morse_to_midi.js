// Morse code dictionary
const morseCode = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
    'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
    'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
    '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----', ' ': ' '
};

// Function to convert text to morse code
function convertTextToMorse(text) {
    return text.toUpperCase().split('').map(char => morseCode[char] || '').join(' ');
}

// Function to convert morse code to MIDI
function convertToMidi() {
    const input = document.getElementById('morse-input').value;
    const morseString = convertTextToMorse(input);

    if (!morseString) {
        document.getElementById('status').textContent = "Invalid input!";
        return;
    }

    const file = new Midi.File();
    const track = new Midi.Track();
    file.addTrack(track);

    const noteC1 = 24;  // C1 note
    const dotDuration = 128;  // 1/8th note length
    const dashDuration = 256;  // 1/4th note length
    const restDuration = 128;  // Pause between symbols (same as dot duration)

    // Parse the morse code string and generate the MIDI file
    for (let symbol of morseString) {
        if (symbol === '.') {
            console.log('Adding dot (1/8 note)');
            track.addNote(0, noteC1, dotDuration);  // Add dot (1/8th note)
        } else if (symbol === '-') {
            console.log('Adding dash (1/4 note)');
            track.addNote(0, noteC1, dashDuration);  // Add dash (1/4th note)
        } else {
            console.log('Adding space between symbols');
            track.addNoteOff(0, restDuration);  // Space between symbols
        }
    }

    console.log('Track:', track);

    // Convert the MIDI file into byte data and create a Blob
    const midiFile = file.toBytes();
    console.log('MIDI File Bytes:', midiFile);
    const blob = new Blob([new Uint8Array(midiFile)], { type: 'audio/midi' });
    const url = URL.createObjectURL(blob);

    // Create a download link for the generated MIDI file
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'morse_code.mid';
    downloadLink.textContent = 'Download MIDI file';
    document.getElementById('status').textContent = '';
    document.getElementById('status').appendChild(downloadLink);
}