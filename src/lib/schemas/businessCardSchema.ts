// src/lib/schemas/businessCardSchema.ts
import { z } from "zod";

export const businessCardSchema = z.object({
  // Información personal
  firstName: z.string().min(1, "El nombre es obligatorio"),
  lastName: z.string().min(1, "El apellido es obligatorio"),
  jobTitle: z.string().optional(),
  companyName: z.string().optional(),
  email: z.string().email("El email debe tener un formato válido"),
  phone: z.string().optional(),
  website: z.string().optional(),

  // Redes sociales
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),

  // Dirección
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  country: z.string().optional(),

  // Personalización del pase
  backgroundColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "El color debe estar en formato HEX"),
  foregroundColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "El color debe estar en formato HEX"),
  labelColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "El color debe estar en formato HEX"),

  // Logotipos e imágenes - estos serían manejados a través de uploads
  logo: z.string().optional(),
  profileImage: z.string().optional(),
  icon: z.string().optional(),

  // Código QR/Barcode
  barcodeFormat: z.enum([
    "PKBarcodeFormatQR",
    "PKBarcodeFormatPDF417",
    "PKBarcodeFormatAztec",
    "PKBarcodeFormatCode128",
  ]),
  barcodeMessage: z.string().optional(),
});
