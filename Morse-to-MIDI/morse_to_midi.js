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
            track.addNote(0, noteC1, dotDuration);  // Add dot (1/8th note)
        } else if (symbol === '-') {
            track.addNote(0, noteC1, dashDuration);  // Add dash (1/4th note)
        } else {
            track.addNoteOff(0, restDuration);  // Space between symbols
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
    downloadLink.textContent = 'Download MIDI file';
    document.getElementById('status').textContent = '';
    document.getElementById('status').appendChild(downloadLink);
}