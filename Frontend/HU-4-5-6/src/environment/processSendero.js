// processSendero.js

import senderoJson from './sendero.json' assert { type: 'json' };

// Definimos las interfaces para tipar el contenido del JSON.
function isOsmElement(obj) {
  return obj && typeof obj.type === "string" && typeof obj.id === "number";
}

// Convertimos el JSON importado al tipo correspondiente.
const osmData = senderoJson;

// Creamos un diccionario para mapear cada nodo (id -> [lat, lon])
const nodeMap = {};

// Recorremos los elementos para llenar el diccionario de nodos.
osmData.elements.forEach((element) => {
  if (element.type === "node" && element.lat !== undefined && element.lon !== undefined) {
    nodeMap[element.id] = [element.lat, element.lon];
  }
});

// Buscamos el elemento de tipo "way" que representa el sendero con id 113578285
const wayElement = osmData.elements.find(
  (element) => element.type === "way" && element.id === 113578285
);

if (!wayElement || !wayElement.nodes) {
  throw new Error("No se encontró el elemento 'way' con id 113578285 o no contiene nodos.");
}

// Con el orden de nodos proporcionado en el elemento "way", construimos el array final de coordenadas
const senderoCoords = wayElement.nodes.map((nodeId) => {
  const coord = nodeMap[nodeId];
  if (!coord) {
    throw new Error(`No se encontró la coordenada para el nodo con id ${nodeId}.`);
  }
  return coord;
});

// (Opcional) Imprimir en consola el inicio y final del sendero.
console.log("Inicio del sendero:", senderoCoords[0]);
console.log("Fin del sendero:", senderoCoords[senderoCoords.length - 1]);

/*
El resultado exportado tendrá la siguiente forma:

// Coordenadas completas del sendero ecológico
const senderoCoords = [
  [4.2682484, -73.5680866],
  [4.2683214, -73.5680146],
  [4.2683683, -73.5679473],
  ... // y así sucesivamente, siguiendo el orden definido en el way.
];
*/

export { senderoCoords };
