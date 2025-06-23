// src/lib/utils/vcard.ts

/**
 * Genera un vCard (tarjeta de contacto estándar) a partir de los datos de usuario
 * Este formato puede ser escaneado con la cámara o importado directamente a la aplicación de contactos
 */
export function generateVCard(data: {
  firstName: string;
  lastName: string;
  jobTitle?: string;
  companyName?: string;
  email?: string;
  phone?: string;
  website?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}) {
  // Iniciar vCard con información básica
  let vCard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${data.lastName};${data.firstName};;;`,
    `FN:${data.firstName} ${data.lastName}`,
  ];

  // Añadir información profesional si está disponible
  if (data.jobTitle) vCard.push(`TITLE:${data.jobTitle}`);
  if (data.companyName) vCard.push(`ORG:${data.companyName}`);

  // Añadir información de contacto
  if (data.email) vCard.push(`EMAIL;type=INTERNET;type=WORK:${data.email}`);
  if (data.phone) vCard.push(`TEL;type=CELL:${data.phone}`);
  if (data.website) vCard.push(`URL;type=WORK:${data.website}`);

  // Añadir redes sociales como URLs
  if (data.linkedin) vCard.push(`URL;type=LINKEDIN:${data.linkedin}`);
  if (data.twitter) vCard.push(`URL;type=TWITTER:${data.twitter}`);
  if (data.instagram) vCard.push(`URL;type=INSTAGRAM:${data.instagram}`);
  if (data.facebook) vCard.push(`URL;type=FACEBOOK:${data.facebook}`);

  // Añadir dirección completa si al menos un campo está presente
  if (data.address || data.city || data.state || data.zipCode || data.country) {
    vCard.push(
      `ADR;type=WORK:;;${data.address || ""};${data.city || ""};${
        data.state || ""
      };${data.zipCode || ""};${data.country || ""}`
    );
  }

  // Añadir una foto (podría implementarse si se añade soporte para subir fotos)
  // if (data.photoUrl) vCard.push(`PHOTO;VALUE=URL:${data.photoUrl}`);

  // Cerrar vCard
  vCard.push("END:VCARD");

  // Unir con saltos de línea escapados (\n) para formato correcto
  return vCard.join("\\n");
}

/**
 * Genera un URI de vCard que puede ser usado en códigos QR
 * El formato data:text/vcard;base64,... permite importar directamente el contacto
 */
export function generateVCardUri(data: any) {
  const vcard = generateVCard(data);
  // En un entorno de navegador, se podría usar btoa para la codificación base64
  // En Node.js, se usa Buffer
  const base64Vcard = Buffer.from(vcard).toString("base64");
  return `data:text/vcard;base64,${base64Vcard}`;
}

/**
 * Genera un URI para un enlace de contacto (alternativa a vCard completo)
 * Este formato es más simple pero no incluye todos los detalles
 */
export function generateContactUri(data: any) {
  const params = new URLSearchParams();
  if (data.firstName) params.append("given", data.firstName);
  if (data.lastName) params.append("family", data.lastName);
  if (data.email) params.append("email", data.email);
  if (data.phone) params.append("phone", data.phone);

  return `https://contact.example.com/?${params.toString()}`;
}
