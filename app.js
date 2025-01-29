// Crear el contenido dinámicamente con JavaScript
document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector(".main-content")) return; // Evitar duplicados

    // Crear el contenedor principal
    const main = document.createElement("main");
    main.classList.add("main-content");

    // Crear el header
    const header = crearHeader();

    // Crear la sección de inputs
    const section = crearInputSection();

    // Agregar el header y la sección al main
    main.appendChild(header);
    main.appendChild(section);

    // Agregar el main al body
    document.body.appendChild(main);
});

function crearHeader() {
    const header = document.createElement("header");
    header.classList.add("header-banner");

    const h1 = document.createElement("h1");
    h1.classList.add("main-title");
    h1.textContent = "Amigo Secreto";

    const imgHeader = document.createElement("img");
    imgHeader.src = "assets/amigo-secreto.png";
    imgHeader.alt = "Imagen representativa de amigo secreto";

    header.appendChild(h1);
    header.appendChild(imgHeader);

    return header;
}

function crearInputSection() {
    const section = document.createElement("section");
    section.classList.add("input-section");

    const h2 = document.createElement("h2");
    h2.classList.add("section-title");
    h2.textContent = "Digite el nombre de sus amigos";

    const inputWrapper = document.createElement("div");
    inputWrapper.classList.add("input-wrapper");

    const input = document.createElement("input");
    input.type = "text";
    input.id = "amigo";
    input.classList.add("input-name");
    input.placeholder = "Escribe un nombre";

    const addButton = document.createElement("button");
    addButton.classList.add("button-add");
    addButton.textContent = "Añadir";
    addButton.addEventListener("click", agregarAmigo);

    inputWrapper.appendChild(input);
    inputWrapper.appendChild(addButton);

    const listaAmigos = document.createElement("ul");
    listaAmigos.id = "listaAmigos";
    listaAmigos.classList.add("name-list");
    listaAmigos.setAttribute("role", "list");

    const resultado = document.createElement("ul");
    resultado.id = "resultado";
    resultado.classList.add("result-list");
    resultado.setAttribute("aria-live", "polite");

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    const drawButton = document.createElement("button");
    drawButton.classList.add("button-draw");
    drawButton.setAttribute("aria-label", "Sortear amigo secreto");
    drawButton.addEventListener("click", sortearAmigo);

    const imgButton = document.createElement("img");
    imgButton.src = "assets/play_circle_outline.png";
    imgButton.alt = "Ícono para sortear";

    drawButton.appendChild(imgButton);
    drawButton.appendChild(document.createTextNode(" Sortear amigo"));

    buttonContainer.appendChild(drawButton);

    section.appendChild(h2);
    section.appendChild(inputWrapper);
    section.appendChild(listaAmigos);
    section.appendChild(resultado);
    section.appendChild(buttonContainer);

    return section;
}

// Función para añadir amigos
function agregarAmigo() {
    const input = document.getElementById("amigo");
    const listaAmigos = document.getElementById("listaAmigos");

    if (input.value.trim() !== "") {
        const li = document.createElement("li");
        li.textContent = input.value;
        listaAmigos.appendChild(li);
        input.value = "";
    } else {
        alert("Por favor, escribe un nombre válido.");
    }
}

// Función para sortear amigo secreto
function sortearAmigo() {
    const listaAmigos = document.getElementById("listaAmigos");
    const resultado = document.getElementById("resultado");

    const nombres = Array.from(listaAmigos.children).map((li) => li.textContent);

    if (nombres.length < 2) {
        alert("Debes añadir al menos dos nombres para sortear.");
        return;
    }

    const sorteados = [...nombres];

    // Mezclar los nombres para asignar de manera aleatoria
    sorteados.sort(() => Math.random() - 0.5);

    resultado.innerHTML = "";

    nombres.forEach((nombre, index) => {
        const li = document.createElement("li");
        const amigo = sorteados[index === sorteados.length - 1 ? 0 : index + 1];
        li.textContent = `${nombre} le regala a ${amigo}`;
        resultado.appendChild(li);
    });
}