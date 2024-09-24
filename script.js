document.addEventListener("DOMContentLoaded", () => {
  const userInput = document.getElementById("user-input");
  const outputDiv = document.getElementById("output");

  // Hantera användarinmatning när Enter-tangenten trycks
  userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const inputText = userInput.value.trim();
      if (inputText) {
        processCommand(inputText);
        userInput.value = ""; // Rensa inmatningsfältet
      }
    }
  });

  function processCommand(command) {
    const output = document.createElement("div");
    output.textContent = "C:\\> " + command;
    outputDiv.appendChild(output);

    // Simulera svar på ett enkelt kommando
    if (command.toLowerCase() === "dir") {
      const files = [
        {
          date: "2023-09-18",
          time: "03:40 PM",
          dir: "<DIR>",
          size: "",
          name: ".",
          link: "https://www.example.com/dot", // Länk för "."
        },
        {
          date: "2023-09-18",
          time: "03:40 PM",
          dir: "<DIR>",
          size: "",
          name: "..",
          link: "https://www.example.com/dotdot", // Länk för ".."
        },
        {
          date: "2023-09-18",
          time: "03:40 PM",
          dir: "",
          size: "0",
          name: "file.txt",
          link: "https://www.example.com/file.txt", // Länk för "file.txt"
        },
        "1 File(s)              0 bytes",
        "0 Dir(s)  1024.00 MB free",
      ];

      files.forEach((item) => {
        const lineDiv = document.createElement("div");

        if (typeof item === "string") {
          // Om det är en vanlig sträng, lägg till den som text
          lineDiv.textContent = item;
        } else {
          // Bygg raden med 'name' som en klickbar länk

          // Skapa textnoder för datum, tid, dir, storlek
          const dateText = item.date + "  ";
          const timeText = item.time + "    ";
          const dirText = (item.dir || "").padEnd(10);
          const sizeText = (item.size || "").padEnd(10);

          // Skapa namn-länken
          const nameLink = document.createElement("a");
          nameLink.textContent = item.name;
          nameLink.href = item.link;
          nameLink.target = "_blank"; // Öppna länken i en ny flik
          nameLink.style.color = "#00ff00";
          nameLink.style.textDecoration = "none";

          // Lägg till textnoder och namn-länk till raden
          lineDiv.appendChild(document.createTextNode(dateText));
          lineDiv.appendChild(document.createTextNode(timeText));
          lineDiv.appendChild(document.createTextNode(dirText));
          lineDiv.appendChild(document.createTextNode(sizeText));
          lineDiv.appendChild(nameLink);
        }
        outputDiv.appendChild(lineDiv);
      });
    } else {
      const lineDiv = document.createElement("div");
      lineDiv.textContent = `'${command}' is not recognized as an internal or external command, operable program or batch file.`;
      outputDiv.appendChild(lineDiv);
    }

    // Scrolla till botten av output
    outputDiv.scrollTop = outputDiv.scrollHeight;
  }
});
