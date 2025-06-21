import { createCanvas, loadImage, registerFont } from "canvas";
import path from "path";
import fs from "fs";

export interface CertificateOptions {
    name: string;
    course: string;
    date: string;
    output: string;
}

function getBaseUrl() {
    if (
        process.env.NODE_ENV === "development" ||
        process.env.VERCEL_ENV === "development" ||
        (typeof window !== "undefined" && window.location.hostname === "localhost")
    ) {
        return "http://localhost:3000";
    }

    return "https://files.ramanode.top/public/credura";
}

export async function generateCertificate({
    name,
    course,
    date,
    output,
}: CertificateOptions): Promise<string> {
    try {
        const templateUrl = `${getBaseUrl()}/template.jpg`;
        let base;
        try {
            const response = await fetch(templateUrl);
            if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            base = await loadImage(buffer);
        } catch (e) {
            throw new Error(`Failed to load template image from URL ${templateUrl}: ${e}`);
        }

        const canvas = createCanvas(base.width, base.height);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(base, 0, 0);

        try {
            const font1 = "/tmp/GreatVibes-Regular.ttf";
            const font2 = "/tmp/OpenSans-Regular.ttf";

            if (fs.existsSync(font1)) {
                registerFont(font1, { family: "Signature" });
            } else {
                const fontUrl1 = `${getBaseUrl()}/fonts/GreatVibes-Regular.ttf`;
                const response1 = await fetch(fontUrl1);
                if (response1.ok) {
                    const buffer1 = Buffer.from(await response1.arrayBuffer());
                    fs.writeFileSync(font1, buffer1);
                    registerFont(font1, { family: "Signature" });
                }
            }
            if (fs.existsSync(font2)) {
                registerFont(font2, { family: "Body" });
            } else {
                const fontUrl2 = `${getBaseUrl()}/fonts/OpenSans-Regular.ttf`;
                const response2 = await fetch(fontUrl2);
                if (response2.ok) {
                    const buffer2 = Buffer.from(await response2.arrayBuffer());
                    fs.writeFileSync(font2, buffer2);
                    registerFont(font2, { family: "Body" });
                }
            }
        } catch (e) {
            throw new Error(`Failed to load fonts: ${e}`);
        }

        ctx.font = "bold 56px Signature, sans-serif";
        ctx.fillStyle = "#2d3748";
        ctx.textAlign = "center";
        ctx.fillText(name, canvas.width / 2, Math.floor(canvas.height * 0.44));

        ctx.font = "bold 36px Body, sans-serif";
        ctx.fillStyle = "#1a202c";
        ctx.fillText("Certificate of Achievement", canvas.width / 2, Math.floor(canvas.height * 0.25));

        ctx.font = "22px Body, sans-serif";
        ctx.fillStyle = "#333";
        ctx.fillText(
            "This certificate is proudly presented to",
            canvas.width / 2,
            Math.floor(canvas.height * 0.3)
        );

        ctx.font = "28px Body, sans-serif";
        ctx.fillStyle = "#4a5568";
        ctx.fillText(
            "for successfully completing:",
            canvas.width / 2,
            Math.floor(canvas.height * 0.55)
        );
        ctx.font = "bold 28px Body, sans-serif";
        ctx.fillStyle = "#2d3748";
        ctx.fillText(course, canvas.width / 2, Math.floor(canvas.height * 0.6));

        const logoUrl = `${getBaseUrl()}/logo.png`;
        let logo;
        try {
            const response = await fetch(logoUrl);
            if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            logo = await loadImage(buffer);
        } catch (e) {
            logo = null;
        }
        if (logo) {
            const logoWidth = 100;
            const logoHeight = 100 * (logo.height / logo.width);
            const logoX = (canvas.width - logoWidth) / 2;
            const logoY = Math.floor(canvas.height * 0.69);
            ctx.drawImage(logo, logoX, logoY, logoWidth, logoHeight);
        }

        ctx.font = "20px Body, sans-serif";
        ctx.fillStyle = "#555";
        ctx.textAlign = "left";
        ctx.fillText(`Date: ${date}`, 80, canvas.height - 80);

        ctx.font = "italic 20px Body, sans-serif";
        ctx.fillStyle = "#888";
        ctx.textAlign = "right";
        ctx.fillText("Credura Team", canvas.width - 80, canvas.height - 80);

        const outputPath = path.isAbsolute(output) ? output : path.join("/tmp", output);
        try {
            fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        } catch (e) {
            throw new Error(`Failed to create output directory: ${e}`);
        }
        let out;
        try {
            out = fs.createWriteStream(outputPath);
        } catch (e) {
            throw new Error(`Failed to create write stream for output: ${e}`);
        }
        const stream = canvas.createJPEGStream();
        stream.pipe(out);
        return new Promise((resolve, reject) => {
            out.on("finish", () => resolve(outputPath));
            out.on("error", (e) => reject(new Error(`Failed to write certificate image: ${e}`)));
        });
    } catch (err) {
        throw new Error(`Certificate generation failed: ${err}`);
    }
}
