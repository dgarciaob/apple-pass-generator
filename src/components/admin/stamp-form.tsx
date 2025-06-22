"use client";

import { useState } from "react";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { stampCardSchema } from "@/lib/schemas/stampCardSchema";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "@/components/ui/form";

import { Separator } from "../ui/separator";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { PassRealTimeView } from "./pass-realtime-view";

export const StampForm = () => {
  const [step, setStep] = useState(0);

  const form = useForm<z.infer<typeof stampCardSchema>>({
    resolver: zodResolver(stampCardSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      backgroundColor: "#FFFFFF",
      foregroundColor: "#000000",
      labelColor: "#000000",
      barcodeFormat: "PKBarcodeFormatQR",
      barcodeMessage: "",
      goal: 5,
      currentStamps: 0,
      reward: "",
      expirationType: "UNLIMITED",
      expirationDate: undefined,
      issueDate: undefined,
      activeStampType: "icon",
      activeStampIcon: "",
      activeStampImage: "",
      inactiveStampType: "icon",
      inactiveStampIcon: "",
      inactiveStampImage: "",
      logo: "",
      icon: "",
      thumbnail: "",
      stampBackgroundColor: "",
      stampOutlineColor: "",
      activeStampFillColor: "",
      inactiveStampFillColor: "",
      isActive: false,
    },
  });

  const router = useRouter();

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof stampCardSchema>) => {
    try {
      const response = await fetch("/api/stamp-card/generate-pass", {
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
    <section className="grid grid-cols-1 md:grid-cols-2 mt-8">
      <div className="border-r border-slate-100 pr-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-6"
          >
            <div className="flex flex-row space-x-2 w-full">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => {
                  return (
                    <FormItem className="flex-1">
                      <FormLabel>Título</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nombre del cupón"
                          className="bg-white w-full"
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
                    <FormItem className="flex-1">
                      <FormLabel>Descripción</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="¿En qué consiste este cupón?"
                          className="bg-white w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            <div className="flex flex-row space-x-2 w-full">
              <FormField
                control={form.control}
                name="backgroundColor"
                render={({ field }) => {
                  return (
                    <FormItem className="flex-1">
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
                    <FormItem className="flex-1">
                      <FormLabel>Color de texto</FormLabel>
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
                    <FormItem className="flex-1">
                      <FormLabel>Color de etiquetas</FormLabel>
                      <FormControl>
                        <Input type="color" className="bg-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="barcodeFormat"
                render={({ field }) => {
                  return (
                    <FormItem className="flex-1">
                      <FormLabel>Formato de Barra</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona el tipo de Código de Barra" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PKBarcodeFormatQR">
                              Código QR
                            </SelectItem>
                            <SelectItem value="PKBarcodeFormatPDF417">
                              PDF417
                            </SelectItem>
                            <SelectItem value="PKBarcodeFormatAztec">
                              Aztec
                            </SelectItem>
                            <SelectItem value="PKBarcodeFormatCode128">
                              Code 128
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
            </div>

            <Separator orientation="horizontal" />

            <div className="flex flex-row space-x-2 w-full">
              <FormField
                name="goal"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem className="flex-1">
                      <FormLabel>Meta</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          value={field.value}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                name="reward"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem className="flex-1">
                      <FormLabel>Recompensa</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="¿Qué se gana con este cupón?"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
            </div>

            <Separator orientation="horizontal" />

            <div>
              <FormField
                name="expirationType"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem className="flex-1">
                      <FormLabel>Expiración</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona el tipo de expiración" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="UNLIMITED">
                              Sin límite
                            </SelectItem>
                            <SelectItem value="FIXED">Fija</SelectItem>
                            <SelectItem value="FIXED_AFTER_ISSUING">
                              Fija después de emitir
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  );
                }}
              />

              <FormField
                name="expirationDate"
                control={form.control}
                render={({ field }) => {
                  return <FormItem></FormItem>;
                }}
              />
            </div>
          </form>
        </Form>
      </div>
      <div className="hidden md:flex items-center justify-center h-screen">
        <PassRealTimeView
          status="Inactive"
          title="¡La 6ta lavada es gratis!"
          type="Stamp Card"
        />
      </div>
    </section>
  );
};
