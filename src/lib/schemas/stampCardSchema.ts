import { z } from "zod";

export const stampCardSchema = z.object({
  title: z.string().min(1, "El título es obligatorio."),
  description: z.string().min(1, "La descripción es obligatoria."),
  backgroundColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "El color debe estar en formato HEX."),
  foregroundColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "El color debe estar en formato HEX."),
  labelColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "El color debe estar en formato HEX."),
  barcodeFormat: z.enum([
    "PKBarcodeFormatQR",
    "PKBarcodeFormatPDF417",
    "PKBarcodeFormatAztec",
    "PKBarcodeFormatCode128",
  ]),
  barcodeMessage: z.string().optional(),

  goal: z.number().min(1, "La meta debe ser mayor a 0."),
  currentStamps: z.number().default(0),
  reward: z.string().min(1, "La recompensa es obligatoria."),

  expirationType: z.enum(["UNLIMITED", "FIXED", "FIXED_AFTER_ISSUING"]),
  expirationDate: z.date().optional(),
  issueDate: z.date().optional(),

  activeStampType: z.enum(["icon", "image"]),
  activeStampIcon: z.string().optional(),
  activeStampImage: z.string().optional(),

  inactiveStampType: z.enum(["icon", "image"]),
  inactiveStampIcon: z.string().optional(),
  inactiveStampImage: z.string().optional(),

  logo: z.string().optional(),
  icon: z.string().optional(),
  thumbnail: z.string().optional(),

  stampBackgroundColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "El color debe estar en formato HEX.")
    .optional(),
  stampOutlineColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "El color debe estar en formato HEX.")
    .optional(),
  activeStampFillColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "El color debe estar en formato HEX.")
    .optional(),
  inactiveStampFillColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "El color debe estar en formato HEX.")
    .optional(),

  isActive: z.boolean().default(false),
});
