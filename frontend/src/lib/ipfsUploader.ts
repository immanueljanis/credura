import { PinataSDK } from 'pinata';
import fs from 'fs';

export const pinata = new PinataSDK({
    pinataJwt: `${process.env.PINATA_JWT}`,
    pinataGateway: `${process.env.NEXT_PUBLIC_GATEWAY_URL}`,
});

interface MetadataAttribute {
    trait_type: string;
    value: string;
}

export interface CertificateMetadata {
    name: string;
    description: string;
    image: string;
    attributes: MetadataAttribute[];
}

function generateMetadataJSON(
    name: string,
    course: string,
    date: string,
    imageIpfsUrl: string
): CertificateMetadata {
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

interface UploadToIPFSResult {
    imageIpfs: string;
    metadataIpfs: string;
}

export async function uploadToIPFS(
    certificatePath: string,
    name: string,
    course: string,
    date: string
): Promise<UploadToIPFSResult> {
    try {
        const metadata: CertificateMetadata = generateMetadataJSON(name, course, date, "");

        const fileBuffer: Buffer = fs.readFileSync(certificatePath);
        const file: File = new File([fileBuffer], `certificate-${name.replace(/\s+/g, "-")}.jpg`, {
            type: "image/jpeg",
        });

        const fileResult: { cid: string } = await pinata.upload.public.file(file);

        console.log("✅ Image uploaded to IPFS:", `ipfs://${fileResult.cid}`);

        metadata.image = `ipfs://${fileResult.cid}`;

        const metadataResult: { cid: string } = await pinata.upload.public.json(metadata);

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