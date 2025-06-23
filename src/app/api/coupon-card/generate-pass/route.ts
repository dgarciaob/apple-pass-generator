// import { NextRequest, NextResponse } from "next/server";

// import { PKPass } from "passkit-generator";

// import fs from "fs/promises";

// import { db } from "@/lib/db";

// export async function POST(req: NextRequest) {
//   try {
//     const {
//       title,
//       description,
//       discountValue,
//       discountType,
//       backgroundColor,
//       foregroundColor,
//       labelColor,
//     } = await req.json();

//     const coupon = await db.coupon.create({
//       data: {
//         title,
//         description,
//         discountValue,
//         discountType,
//         backgroundColor,
//         foregroundColor,
//         labelColor,
//       },
//     });

//     const pass = await PKPass.from(
//       {
//         model: "./templates/coupon",
//         certificates: {
//           wwdr: await fs.readFile("./certs/wwdr.pem"),
//           signerCert: await fs.readFile("./certs/signerCert.pem"),
//           signerKey: await fs.readFile("./certs/signerKey.pem"),
//           signerKeyPassphrase: process.env.CERT_PASSPHRASE || "",
//         },
//       },
//       {
//         formatVersion: 1,
//         passTypeIdentifier: "pass.com.v1.bounti",
//         authenticationToken: coupon.id,
//         serialNumber: coupon.id,
//         teamIdentifier: "P2247QRL75",
//         organizationName: "Bounti",
//         description: description,
//         logoText: title,
//         foregroundColor,
//         backgroundColor,
//         labelColor,
//       }
//     );

//     pass.localize("es_PE", {});

//     pass.primaryFields.push({
//       key: "primary",
//       label: "Título",
//       value: title,
//     });
//     pass.secondaryFields.push({
//       key: "secondary",
//       label: "Descripción",
//       value: description,
//     });
//     pass.auxiliaryFields.push({
//       key: "auxiliary",
//       label: "Descuento",
//       value:
//         discountType === "percentage"
//           ? `${discountValue}%`
//           : `S/${discountValue}`,
//     });

//     pass.setBarcodes({
//       altText: title,
//       messageEncoding: "utf-8",
//       format: "PKBarcodeFormatQR",
//       message: `${process.env.API_URL}/redeem/${coupon.id}`,
//     });

//     pass.setExpirationDate(new Date(Date.now() + 1000 * 60 * 60 * 24 * 30));

//     const buffer = await pass.getAsBuffer();

//     return new NextResponse(buffer, {
//       headers: {
//         "Content-Type": "application/vnd.apple.pkpass",
//         "Content-Disposition": `attachment; filename=${title}.pkpass`,
//       },
//     });
//   } catch (error) {
//     console.error("ERROR AL CREAR CUPON:", error);
//     return NextResponse.json(
//       { error: "Ocurrió un error al crear el cupón." },
//       { status: 500 }
//     );
//   }
// }
