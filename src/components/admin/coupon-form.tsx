"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { couponSchema } from "@/lib/schemas/couponSchema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const CouponForm = () => {
  const form = useForm<z.infer<typeof couponSchema>>({
    resolver: zodResolver(couponSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      discountValue: 0,
      discountType: "percentage",
      barcodeMessage: "",
      backgroundColor: "#000000",
      foregroundColor: "#FFFFFF",
      labelColor: "#000000",
    },
  });

  const router = useRouter();

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof couponSchema>) => {
    try {
      const response = await fetch("/api/coupon-card/generate-pass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${values.title.replace(/\s+/g, "_")}.pkpass`;
        a.click();

        toast.success("Cupón generado correctamente.");
        router.refresh();
      } else {
        const error = await response.json();
        toast.error(error.error || "Ocurrió un error al generar el pase.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Ocurrió un error inesperado.");
    }
  };

  return (
    <div className="mt-4 border bg-slate-100 p-4 rounded-lg">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-6"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Nombre del cupón</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nombre del cupón"
                      className="bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="¿Cómo funciona el cupón?"
                      className="bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="discountType"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Tipo de descuento</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue="percentage"
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Selecciona un tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Porcentaje</SelectItem>
                        <SelectItem value="fixed">Fijo</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="discountValue"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Valor del descuento</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Valor del descuento (ej. 20)"
                      className="bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="barcodeMessage"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Mensaje del código de barras</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Mensaje para el código de barras (opcional)"
                      className="bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="backgroundColor"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Color de fondo</FormLabel>
                  <FormControl>
                    <Input type="color" className="bg-white" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="foregroundColor"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Color del texto</FormLabel>
                  <FormControl>
                    <Input type="color" className="bg-white" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="labelColor"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Color de etiquetas</FormLabel>
                  <FormControl>
                    <Input type="color" className="bg-white" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <Button type="submit" disabled={isSubmitting || !isValid}>
            Crear Cupón
          </Button>
        </form>
      </Form>
    </div>
  );
};
