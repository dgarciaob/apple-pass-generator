import { z } from "zod";

export const couponSchema = z.object({
  title: z.string().min(1, "El título es obligatorio."),
  description: z.string().min(1, "La descripción es obligatoria."),
  discountValue: z.preprocess(
    (value) => (typeof value === "string" ? parseFloat(value) : value),
    z.number().min(1, "El valor del descuento debe ser mayor a 0.")
  ),
  discountType: z.enum(["percentage", "fixed"], {
    required_error: "Selecciona un tipo de descuento.",
  }),
  barcodeMessage: z.string().optional(),
  backgroundColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "El color debe estar en formato HEX."),
  foregroundColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "El color debe estar en formato HEX."),
  labelColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "El color debe estar en formato HEX."),
});
