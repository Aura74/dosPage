document.addEventListener("DOMContentLoaded", () => {
  const userInput = document.getElementById("user-input");
  const outputDiv = document.getElementById("output");

  // Handle user input when the enter key is pressed
  userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const inputText = userInput.value.trim();
      if (inputText) {
        processCommand(inputText);
        userInput.value = ""; // Clear the input
      }
    }
  });

  function processCommand(command) {
    const output = document.createElement("div");
    output.textContent = "C:\\> " + command;
    outputDiv.appendChild(output);

    // Simulate response to a simple command
    if (command.toLowerCase() === "dir") {
      const files = [
        "Volume in drive C has no label.",
        "Directory of C:\\",
        "2023-09-18  03:40 PM    <DIR>      .",
        "2023-09-18  03:40 PM    <DIR>      ..",
        "2023-09-18  03:40 PM                0 file.txt",
        "1 File(s)              0 bytes",
        "0 Dir(s)  1024.00 MB free",
      ];
      files.forEach((line) => {
        const lineDiv = document.createElement("div");
        lineDiv.textContent = line;
        outputDiv.appendChild(lineDiv);
      });
    } else {
      const lineDiv = document.createElement("div");
      lineDiv.textContent = `'${command}' is not recognized as an internal or external command, operable program or batch file.`;
      outputDiv.appendChild(lineDiv);
    }

    // Scroll to bottom of output
    outputDiv.scrollTop = outputDiv.scrollHeight;
  }
});
