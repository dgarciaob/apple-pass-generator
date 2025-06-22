import fs from "fs/promises";
import { db } from "@/lib/db";
import { PKPass } from "passkit-generator";
import { NextRequest, NextResponse } from "next/server";
