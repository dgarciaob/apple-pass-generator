// src/app/api/business-card/generate-pass/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PKPass } from "passkit-generator";
import fs from "fs/promises";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

// Función para convertir de HEX a RGB para el formato de PassKit
function hexToRgb(hex: string) {
  // Eliminar # si está presente
  hex = hex.replace("#", "");

  // Parsear los valores RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Devolver en formato "rgb(r, g, b)"
  return `rgb(${r}, ${g}, ${b})`;
}

// Función para generar vCard (formato de tarjeta de contacto)
function generateVCard(data: any) {
  let vCard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${data.lastName};${data.firstName};;;`,
    `FN:${data.firstName} ${data.lastName}`,
  ];

  if (data.jobTitle) vCard.push(`TITLE:${data.jobTitle}`);
  if (data.companyName) vCard.push(`ORG:${data.companyName}`);
  if (data.email) vCard.push(`EMAIL:${data.email}`);
  if (data.phone) vCard.push(`TEL:${data.phone}`);
  if (data.website) vCard.push(`URL:${data.website}`);

  // Agregar redes sociales como URLs
  if (data.linkedin) vCard.push(`URL;type=LINKEDIN:${data.linkedin}`);
  if (data.twitter) vCard.push(`URL;type=TWITTER:${data.twitter}`);
  if (data.instagram) vCard.push(`URL;type=INSTAGRAM:${data.instagram}`);
  if (data.facebook) vCard.push(`URL;type=FACEBOOK:${data.facebook}`);

  // Agregar dirección si está completa
  if (data.address || data.city || data.state || data.zipCode || data.country) {
    vCard.push(
      `ADR;TYPE=WORK:;;${data.address || ""};${data.city || ""};${
        data.state || ""
      };${data.zipCode || ""};${data.country || ""}`
    );
  }

  vCard.push("END:VCARD");

  return vCard.join("\\n");
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const data = await req.json();

    // Crear el registro en la base de datos
    const businessCard = await db.businessCard.create({
      data: {
        ...data,
        userId,
      },
    });

    // Generar el código vCard para el contacto
    const vCardData = generateVCard(data);

    // Crear el pase utilizando PKPass
    const pass = await PKPass.from(
      {
        model: "./templates/business-card.pass",
        certificates: {
          wwdr: await fs.readFile("./certs/wwdr.pem"),
          signerCert: await fs.readFile("./certs/signerCert.pem"),
          signerKey: await fs.readFile("./certs/signerKey.pem"),
          signerKeyPassphrase: process.env.CERT_PASSPHRASE || "",
        },
      },
      {
        // Configuración básica del pase
        formatVersion: 1,
        passTypeIdentifier: "pass.com.v1.bounti",
        serialNumber: businessCard.id,
        teamIdentifier: "P2247QRL75",
        organizationName: data.companyName || "Tarjeta Personal",
        description: `Business Card de ${data.firstName} ${data.lastName} - YaVendió`,
        logoText: data.companyName || `${data.firstName} ${data.lastName}`,

        // Colores personalizados
        foregroundColor: hexToRgb(data.foregroundColor),
        backgroundColor: hexToRgb(data.backgroundColor),
        labelColor: hexToRgb(data.labelColor),
      }
    );

    // Establecer localización
    pass.localize("es_PE", {});

    // Agregar campos principales
    pass.primaryFields.push({
      key: "name",
      label: "Nombre",
      value: `${data.firstName} ${data.lastName}`,
    });

    // Agregar campos secundarios
    if (data.jobTitle) {
      pass.secondaryFields.push({
        key: "job",
        label: "Cargo",
        value: data.jobTitle,
      });
    }

    if (data.companyName) {
      pass.secondaryFields.push({
        key: "company",
        label: "Empresa",
        value: data.companyName,
      });
    }

    // Agregar campos auxiliares (contacto)
    if (data.email) {
      pass.auxiliaryFields.push({
        key: "email",
        label: "Email",
        value: data.email,
      });
    }

    if (data.phone) {
      pass.auxiliaryFields.push({
        key: "phone",
        label: "Teléfono",
        value: data.phone,
      });
    }

    // Agregar información al reverso de la tarjeta
    pass.backFields.push({
      key: "contactInfo",
      label: "Contacto",
      value: `${data.email || ""}${data.phone ? "\\n" + data.phone : ""}${
        data.website ? "\\n" + data.website : ""
      }`,
    });

    // Agregar redes sociales al reverso si existen
    const socialNetworks = [];
    if (data.linkedin) socialNetworks.push(`LinkedIn: ${data.linkedin}`);
    if (data.twitter) socialNetworks.push(`Twitter: ${data.twitter}`);
    if (data.instagram) socialNetworks.push(`Instagram: ${data.instagram}`);
    if (data.facebook) socialNetworks.push(`Facebook: ${data.facebook}`);

    if (socialNetworks.length > 0) {
      pass.backFields.push({
        key: "socialMedia",
        label: "Redes Sociales",
        value: socialNetworks.join("\\n"),
      });
    }

    // Agregar dirección al reverso si existe
    if (
      data.address ||
      data.city ||
      data.state ||
      data.zipCode ||
      data.country
    ) {
      const addressParts = [
        data.address,
        data.city,
        data.state,
        data.zipCode,
        data.country,
      ].filter((part) => part && part.trim().length > 0);

      if (addressParts.length > 0) {
        pass.backFields.push({
          key: "address",
          label: "Dirección",
          value: addressParts.join(", "),
        });
      }
    }

    // Configurar el código QR/barcode (con datos vCard o URL personalizada)
    const barcodeMessage = data.barcodeMessage || vCardData;

    pass.setBarcodes({
      message: barcodeMessage,
      format: data.barcodeFormat,
      messageEncoding: "utf-8",
    });

    // Generar el buffer del pase
    const buffer = await pass.getAsBuffer();

    // Devolver el pase como descarga
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/vnd.apple.pkpass",
        "Content-Disposition": `attachment; filename=${data.firstName}_${data.lastName}_Card.pkpass`,
      },
    });
  } catch (error) {
    console.error("ERROR AL CREAR TARJETA DE PRESENTACIÓN:", error);
    return NextResponse.json(
      { error: "Ocurrió un error al crear la tarjeta de presentación." },
      { status: 500 }
    );
  }
}
