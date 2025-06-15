// TBA
import { generateCertificate } from "./certificateGenerator";

generateCertificate({
    name: "Immanuel Pratama",
    course: "Rust Programming for Blockchain Developers",
    date: "03 Desember 2028",
    output: "output/certificate_2025001.jpg",
}).catch(console.error);