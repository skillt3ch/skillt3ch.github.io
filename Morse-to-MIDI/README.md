Morse-to-MIDI Converter

This project is a web-based application that converts Morse code into a downloadable MIDI file. The Morse code input is translated into musical notes, where dots are represented by 1/8th notes and dashes by 1/4th notes.

Features

	•	Morse Code Input: Users can input any text, which is converted into Morse code.
	•	MIDI Generation: The corresponding Morse code is translated into a sequence of MIDI notes (C1), with dots as 1/8th notes and dashes as 1/4th notes.
	•	File Download: The generated MIDI file can be downloaded directly from the browser.

Demo

Check out the live version of the app here: Morse-to-MIDI Converter

How It Works

	1.	Enter a text string in the input box (e.g., “HELLO WORLD”).
	2.	Click the “Generate MIDI” button.
	3.	A MIDI file is generated based on the Morse code translation of the input.
	4.	Download the generated .mid file.

Morse Code Mapping

	•	Dot (.) → 1/8th note
	•	Dash (-) → 1/4th note
	•	Spaces between letters → Rest (1/4th note)

Technologies Used

	•	HTML/CSS: For the layout and design of the application.
	•	JavaScript: Logic for Morse code conversion and MIDI file generation.
	•	jsmidgen: A JavaScript library used to generate MIDI files in the browser.

How to Run Locally

	1.	Clone the repository:

git clone https://github.com/skillt3ch/Morse-to-MIDI.git


	2.	Navigate into the project directory:

cd Morse-to-MIDI


	3.	Open the project:
Simply open the index.html file in your browser to use the application locally.

Contribution

Feel free to submit issues or pull requests if you’d like to contribute to the project. Any improvements or suggestions are welcome!

License

This project is licensed under the MIT License. See the LICENSE file for more information.