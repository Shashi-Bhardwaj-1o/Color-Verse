// Initial palette data
const palettes = [
  {
    name: "Sunset Bliss",
    colors: ["#ff9a8b", "#ff6a88", "#ff99ac", "#fad0c4"]
  },
  {
    name: "Ocean Drive",
    colors: ["#2193b0", "#6dd5ed", "#b2fefa", "#1e3c72"]
  }
];

// Function to display all palettes
function displayPalettes() {
  const container = document.getElementById("paletteContainer");
  const tableBody = document.getElementById("paletteTableBody");
  container.innerHTML = "";
  tableBody.innerHTML = "";

  palettes.forEach(p => {
    // Create card
    const card = document.createElement("div");
    card.className = "palette-card";

    const strip = document.createElement("div");
    strip.className = "color-strip";

    // Add color boxes
    p.colors.forEach(c => {
      const div = document.createElement("div");
      div.className = "color";
      div.style.backgroundColor = c;
      div.setAttribute("title", c); // Tooltip
      strip.appendChild(div);
    });

    const info = document.createElement("div");
    info.className = "palette-info";
    info.textContent = p.name;

    card.appendChild(strip);
    card.appendChild(info);
    container.appendChild(card);

    // Modal on click
    card.addEventListener("click", () => {
      document.getElementById("modalPaletteName").textContent = p.name;
      const modalColors = document.getElementById("modalColors");
      modalColors.innerHTML = "";
      p.colors.forEach(c => {
        const swatch = document.createElement("div");
        swatch.style.backgroundColor = c;
        swatch.style.padding = "1rem";
        swatch.style.margin = "0.5rem 0";
        swatch.style.color = "#000";
        swatch.style.border = "1px solid #ccc";
        swatch.innerText = c;
        modalColors.appendChild(swatch);
      });
      document.getElementById("colorModal").style.display = "block";
    });

    // Add to summary table
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    nameCell.textContent = p.name;
    const colorsCell = document.createElement("td");
    colorsCell.textContent = p.colors.join(", ");
    row.appendChild(nameCell);
    row.appendChild(colorsCell);
    tableBody.appendChild(row);
  });
}

// Handle form submission
document.getElementById("paletteForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("paletteName").value.trim();
  const color1 = document.getElementById("color1").value.trim();
  const color2 = document.getElementById("color2").value.trim();
  const color3 = document.getElementById("color3").value.trim();
  const color4 = document.getElementById("color4").value.trim();

  if (name && color1 && color2 && color3 && color4) {
    palettes.push({ name, colors: [color1, color2, color3, color4] });
    displayPalettes();
    e.target.reset();
  } else {
    alert("Please fill in all fields with valid HEX color codes.");
  }
});

// Modal close button
document.getElementById("modalClose").onclick = function () {
  document.getElementById("colorModal").style.display = "none";
};

// Close modal when clicking outside
window.onclick = function (e) {
  if (e.target === document.getElementById("colorModal")) {
    document.getElementById("colorModal").style.display = "none";
  }
};

// Dark mode toggle
const toggle = document.getElementById("darkModeToggle");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.querySelector(".modal-content").classList.toggle("dark-mode");
});

// Load initial palettes
displayPalettes();
