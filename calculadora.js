let band2 = true;
let opAnterior = "";

function isEmpty(valor) {
  // Verificar si el valor es nulo o indefinido
  if (valor === null || valor === undefined) {
    return true;
  }

  // Verificar si es una cadena de texto vacía
  if (typeof valor === "string" && valor.trim() === "") {
    return true;
  }

  // Verificar si es un arreglo y está vacío
  if (Array.isArray(valor) && valor.length === 0) {
    return true;
  }

  // Verificar si es un objeto y no tiene propiedades
  if (typeof valor === "object" && Object.keys(valor).length === 0) {
    return true;
  }

  return false; // En caso contrario, no está vacío
}

function inputValue(value) {
  const result = document.getElementById("result");
  const resultAnt = document.getElementById("resultAnt");

  if (isEmpty(resultAnt.value)) {
    if (isNaN(value) && value != ".") {
      resultAnt.value = result.value + value;
      resultAnt.style.display = "block";
    } else {
      result.value == 0 ? (result.value = value) : (result.value += value);
    }
  } else {
    if ((!isNaN(value) || value == ".") && band2) {
      clearResult();
      result.value = value;
      band2 = false;
    } else if (!isNaN(value) || value == ".") {
      result.value += value;
    } else if (isNaN(value) && !band2) {
      calculateResult(resultAnt.value + result.value);
      resultAnt.value = result.value + value;
      band2 = true;
    } else {
      if (isNaN(value)) {
        resultAnt.value = result.value + value;
      } else {
        clearResultAll();
        result.value = value;
        band2 = true;
      }
    }
  }
}

function clearResult() {
  const result = document.getElementById("result");
  result.value = "0";
  band2 = true;
}

function clearResultAll() {
  const resultAnt = document.getElementById("resultAnt");
  resultAnt.value = "";
  resultAnt.style.display = "none";
  clearResult();
  band2 = true;
}

function calculateResult(values) {
  const result = document.getElementById("result");
  const resultAnt = document.getElementById("resultAnt");

  if (isEmpty(values)) {
    resultAnt.value = resultAnt.value + result.value;
    values = resultAnt.value;
    band2 = true;
  }

  let valorA = 0,
    valorB = 0,
    operador = "";

  for (let i = 0; i < values.length; ++i) {
    if (isNaN(values[i]) && values[i] != ".") {
      valorA = parseFloat(values.slice(0, i));
      valorB = parseFloat(values.slice(i + 1, values.length));
      operador = values[i];
    }
  }

  switch (operador) {
    case "+":
      result.value = valorA + valorB;
      break;
    case "-":
      result.value = valorA - valorB;
      break;
    case "*":
      result.value = valorA * valorB;
      break;
    case "/":
      result.value = valorA / valorB;
      break;
    default:
      break;
  }
}

function deleteValue() {
  const result = document.getElementById("result");

  result.value = result.value.slice(0, result.value.length - 1);
}

function negValue() {
  const result = document.getElementById("result");
  const resultAnt = document.getElementById("resultAnt");

  if (!isEmpty(resultAnt.value))
    resultAnt.value = "negate(" + result.value + ")";

  result.value =
    result.value <= 0
      ? result.value.slice(1, result.value.length)
      : "-" + result.value;
}
