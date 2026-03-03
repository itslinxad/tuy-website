/**
 * Merge two-page PDF forms into single PDF files.
 * Run with: node scripts/merge-pdfs.mjs
 */
import { PDFDocument } from "pdf-lib";
import { readFile, writeFile } from "fs/promises";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const baseDir = resolve(__dirname, "../public/Tuy_Data/engineering");

const formsToMerge = [
  {
    dir: "unified_application_form_for_building_permit",
    prefix: "unified_application_form_for_building_permit",
    output: "unified_application_form_for_building_permit.pdf",
  },
  {
    dir: "architectural_permit",
    prefix: "architectural_permit",
    output: "architectural_permit.pdf",
  },
  {
    dir: "civil_structural_permit",
    prefix: "civil_structural_permit",
    output: "civil_structural_permit.pdf",
  },
  {
    dir: "electrical_permit",
    prefix: "electrical_permit",
    output: "electrical_permit.pdf",
  },
  {
    dir: "plumbing_permit",
    prefix: "plumbing_permit",
    output: "plumbing_permit.pdf",
  },
  {
    dir: "sanitary_permit",
    prefix: "sanitary_permit",
    output: "sanitary_permit.pdf",
  },
  {
    dir: "certificate_of_completion",
    prefix: "certificate_of_completion",
    output: "certificate_of_completion.pdf",
  },
];

for (const form of formsToMerge) {
  const page1Path = resolve(baseDir, form.dir, `${form.prefix}_page1.pdf`);
  const page2Path = resolve(baseDir, form.dir, `${form.prefix}_page2.pdf`);
  const outputPath = resolve(baseDir, form.dir, form.output);

  console.log(`Merging: ${form.dir}...`);

  const page1Bytes = await readFile(page1Path);
  const page2Bytes = await readFile(page2Path);

  const mergedPdf = await PDFDocument.create();

  const pdf1 = await PDFDocument.load(page1Bytes);
  const pdf2 = await PDFDocument.load(page2Bytes);

  const [p1] = await mergedPdf.copyPages(pdf1, pdf1.getPageIndices());
  mergedPdf.addPage(p1);

  const [p2] = await mergedPdf.copyPages(pdf2, pdf2.getPageIndices());
  mergedPdf.addPage(p2);

  const mergedBytes = await mergedPdf.save();
  await writeFile(outputPath, mergedBytes);

  console.log(`  -> ${outputPath} (${mergedBytes.length} bytes)`);
}

console.log("\nDone! All 7 forms merged successfully.");
