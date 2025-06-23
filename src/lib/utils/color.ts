// src/lib/utils/color.ts

/**
 * Convierte un color de formato hexadecimal (#RRGGBB) a formato RGB (rgb(r, g, b))
 * Este formato es requerido por la API de PassKit
 */
export function hexToRgb(hex: string): string {
  // Eliminar # si está presente
  hex = hex.replace("#", "");

  // Asegurarse de que el formato es correcto
  if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
    throw new Error("Formato hexadecimal inválido. Debe ser #RRGGBB");
  }

  // Parsear los valores RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Devolver en formato "rgb(r, g, b)"
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Convierte un color de formato RGB a formato hexadecimal
 * Útil para mostrar valores en inputs de tipo color
 */
export function rgbToHex(rgb: string): string {
  // Extrae los valores de RGB
  const matches = rgb.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/);
  if (!matches) {
    throw new Error("Formato RGB inválido. Debe ser rgb(r, g, b)");
  }

  // Convierte cada valor a hexadecimal
  const r = parseInt(matches[1], 10).toString(16).padStart(2, "0");
  const g = parseInt(matches[2], 10).toString(16).padStart(2, "0");
  const b = parseInt(matches[3], 10).toString(16).padStart(2, "0");

  return `#${r}${g}${b}`;
}

/**
 * Calcula si un color de fondo requiere texto claro u oscuro
 * Basado en la luminosidad percibida del color
 */
export function getTextColorForBackground(bgColor: string): string {
  // Si es formato hexadecimal, convertir a RGB primero
  let r, g, b;

  if (bgColor.startsWith("#")) {
    bgColor = bgColor.replace("#", "");
    r = parseInt(bgColor.substring(0, 2), 16);
    g = parseInt(bgColor.substring(2, 4), 16);
    b = parseInt(bgColor.substring(4, 6), 16);
  } else {
    // Extraer valores RGB
    const matches = bgColor.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/);
    if (!matches) {
      throw new Error("Formato de color inválido");
    }
    r = parseInt(matches[1], 10);
    g = parseInt(matches[2], 10);
    b = parseInt(matches[3], 10);
  }

  // Calcular luminosidad percibida
  // Fórmula: 0.299*R + 0.587*G + 0.114*B
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Si la luminosidad es mayor a 0.5, usar texto oscuro, sino texto claro
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
}

/**
 * Genera un color complementario al proporcionado
 */
export function getComplementaryColor(hexColor: string): string {
  // Eliminar # si está presente
  hexColor = hexColor.replace("#", "");

  // Convertir a RGB
  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);

  // Calcular el complementario (invertir los valores)
  const compR = (255 - r).toString(16).padStart(2, "0");
  const compG = (255 - g).toString(16).padStart(2, "0");
  const compB = (255 - b).toString(16).padStart(2, "0");

  return `#${compR}${compG}${compB}`;
}
