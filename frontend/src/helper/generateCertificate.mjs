import { createCanvas, loadImage, registerFont } from "canvas";
import fs from "fs";
import path from "path";
import { PinataSDK } from "pinata";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const pinata = new PinataSDK({
  pinataJwt: `${process.env.PINATA_JWT}`,
  pinataGateway: `${process.env.NEXT_PUBLIC_GATEWAY_URL}`,
});

async function generateCertificate({ name, course, date, output }) {
  const templatePath = path.join(__dirname, "../../public/template.jpg");
  const base = await loadImage(templatePath);

  const canvas = createCanvas(base.width, base.height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(base, 0, 0);

  registerFont(path.join(__dirname, "../../public/fonts/GreatVibes-Regular.ttf"), {
    family: "Signature",
  });
  registerFont(path.join(__dirname, "../../public/fonts/OpenSans-Regular.ttf"), { family: "Body" });

  ctx.font = "bold 56px Signature";
  ctx.fillStyle = "#2d3748";
  ctx.textAlign = "center";
  ctx.fillText(name, canvas.width / 2, Math.floor(canvas.height * 0.44));

  ctx.font = "bold 36px Body";
  ctx.fillStyle = "#1a202c";
  ctx.fillText("Certificate of Achievement", canvas.width / 2, Math.floor(canvas.height * 0.25));

  ctx.font = "22px Body";
  ctx.fillStyle = "#333";
  const desc = `This certificate is proudly presented to`;
  ctx.fillText(desc, canvas.width / 2, Math.floor(canvas.height * 0.3));

  ctx.font = "28px Body";
  ctx.fillStyle = "#4a5568";
  ctx.fillText(`for successfully completing:`, canvas.width / 2, Math.floor(canvas.height * 0.55));
  ctx.font = "bold 28px Body";
  ctx.fillStyle = "#2d3748";
  ctx.fillText(course, canvas.width / 2, Math.floor(canvas.height * 0.6));

  const logoPath = path.join(__dirname, "../../public/logo.png");
  const logo = await loadImage(logoPath);
  const logoWidth = 100;
  const logoHeight = 100 * (logo.height / logo.width);
  const logoX = (canvas.width - logoWidth) / 2;
  const logoY = Math.floor(canvas.height * 0.69);
  ctx.drawImage(logo, logoX, logoY, logoWidth, logoHeight);

  ctx.font = "20px Body";
  ctx.fillStyle = "#555";
  ctx.textAlign = "left";
  ctx.fillText(`Date: ${date}`, 80, canvas.height - 80);

  ctx.font = "italic 20px Body";
  ctx.fillStyle = "#888";
  ctx.textAlign = "right";
  ctx.fillText("Credura Team", canvas.width - 80, canvas.height - 80);

  const outputPath = path.isAbsolute(output) ? output : path.join(__dirname, "../../", output);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  const out = fs.createWriteStream(outputPath);
  const stream = canvas.createJPEGStream();
  stream.pipe(out);

  out.on("finish", async () => {
    console.log(`✅ Saved: ${outputPath}`);
    try {
      await uploadToIPFS(outputPath, name, course, date);
    } catch (error) {
      console.error("❌ Error uploading to IPFS:", error);
    }
  });
}

async function uploadToIPFS(certificatePath, name, course, date) {
  try {
    const metadata = generateMetadataJSON(name, course, date, "");

    const fileBuffer = fs.readFileSync(certificatePath);
    const file = new File([fileBuffer], `certificate-${name.replace(/\s+/g, "-")}.jpg`, {
      type: "image/jpeg",
    });

    const fileResult = await pinata.upload.public.file(file);

    console.log("✅ Image uploaded to IPFS:", `ipfs://${fileResult.cid}`);

    metadata.image = `ipfs://${fileResult.cid}`;

    const metadataResult = await pinata.upload.public.json(metadata);

    console.log("✅ Metadata uploaded to IPFS:", `ipfs://${metadataResult.cid}`);
    console.log("🌐 Gateway URLs:");
    console.log(`   Image: https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${fileResult.cid}`);
    console.log(
      `   Metadata: https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${metadataResult.cid}`
    );

    return {
      imageIpfs: fileResult.cid,
      metadataIpfs: metadataResult.cid,
    };
  } catch (err) {
    console.error("❌ Error uploading to IPFS:", err);
    throw err;
  }
}

function generateMetadataJSON(name, course, date, imageIpfsUrl) {
  return {
    name: `Certificate of Completion: ${course}`,
    description: `This certificate is proudly presented to ${name} for completing ${course}.`,
    image: imageIpfsUrl,
    attributes: [
      { trait_type: "Student", value: name },
      { trait_type: "Course", value: course },
      { trait_type: "Date", value: date },
      { trait_type: "Certificate Type", value: "Course Completion" },
    ],
  };
}

generateCertificate({
  name: "Immanuel Pratama",
  course: "Rust Programming for Blockchain Developers",
  date: "03 Desember 2028",
  output: "output/certificate_2025001.jpg",
}).catch(console.error);
