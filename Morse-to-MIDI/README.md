# Text → Morse Code → MIDI

This project is a web-based application that converts Morse code into a downloadable MIDI file. The Morse code input is translated into musical notes, where dots are represented by 1/8th notes and dashes by 1/4th notes.

## Features

-	Morse Code Input: Users can input any text, which is converted into Morse code.
-	MIDI Generation: The corresponding Morse code is translated into a sequence of MIDI notes (using the note C2), with accurate note lengths and rests.
-	Real Morse Code Timing: The app handles proper Morse code timing:
	-	1-dot-length pauses between dots and dashes within a letter.
	-	3-dot-length pauses between letters.
	-	7-dot-length pauses between words.
-	Typewriter Effect: Morse code is displayed on the page with a typewriter effect, where each dot and dash is shown in sequence.
-	Keyboard Shortcut: Users can press Cmd + Enter (Mac) or Ctrl + Enter (Windows) to generate the MIDI file.
-	File Download: The generated MIDI file can be downloaded directly from the browser via a styled button with a music icon.

## Demo

Check out the live version of the app here: [Text → Morse Code → MIDI](https://skillt3ch.github.io/Morse-to-MIDI)

## How It Works

1.	Enter a text string in the˝ input box (e.g., “HELLO WORLD”).
2.	Press Cmd + Return (Mac) or Ctrl + Enter (Windows), or click the **Generate** button.
3.	A MIDI file is generated based on the Morse code translation of the input:
	-	Dots (.) are represented by 1/8th notes.
	-	Dashes (-) are represented by 1/4th notes.
	-	Proper pauses (rests) are added between notes, letters, and words.
4.	Download the generated .mid file using the styled button with a music note icon.

## Morse Code Mapping

-	Dots (.) → 1/8th note (C2, MIDI note 36)
-	Dashes (-) → 1/4th note
-	Pauses between dots/dashes within a letter → 1-dot-length rest
-	Pauses between letters → 3-dot-length rest
-	Pauses between words → 7-dot-length rest