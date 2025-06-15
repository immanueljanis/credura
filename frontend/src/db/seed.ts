import { db } from ".";
import { courses } from "./schema";

await db.insert(courses).values([
  {
    id: BigInt(1),
    courseName: "Blockchain Fundamentals",
    description:
      "Master the basics of blockchain technology and cryptocurrency. Learn about consensus mechanisms, mining, and the underlying principles.",
    instructor: "Dr. Sarah Chen",
    duration: "6 weeks",
    level: "Beginner",
    studentsEnrolled: 1245,
    rating: 4.8,
    price: 0.05,
    image:
      "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=400",
    tags: "Blockchain,Cryptocurrency,DeFi",
    category: "Fundamentals",
  },

  {
    id: BigInt(2),
    courseName: "Smart Contract Development",
    description:
      "Learn to build and deploy smart contracts on Ethereum using Solidity programming language and development frameworks.",
    instructor: "Prof. Michael Rodriguez",
    duration: "8 weeks",
    level: "Intermediate",
    studentsEnrolled: 892,
    rating: 4.9,
    price: 0.08,
    image:
      "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400",
    tags: "Solidity,Ethereum,Web3",
    category: "Development",
  },
  {
    id: BigInt(3),
    courseName: "DeFi Protocol Design",
    description:
      "Advanced concepts in decentralized finance and protocol design. Build your own DeFi applications from scratch.",
    instructor: "Alex Thompson",
    duration: "10 weeks",
    level: "Advanced",
    studentsEnrolled: 567,
    rating: 4.7,
    price: 0.12,
    image:
      "https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=400",
    tags: "DeFi,Protocols,Advanced",
    category: "Finance",
  },
  {
    id: BigInt(4),
    courseName: "NFT Marketplace Development",
    description:
      "Build your own NFT marketplace from scratch using React, Web3.js, and smart contracts.",
    instructor: "Emma Watson",
    duration: "7 weeks",
    level: "Intermediate",
    studentsEnrolled: 734,
    rating: 4.6,
    price: 0.09,
    image:
      "https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400",
    tags: "NFT,Marketplace,React",
    category: "Development",
  },
  {
    id: BigInt(5),
    courseName: "Cryptocurrency Trading",
    description:
      "Learn technical analysis, risk management, and trading strategies for cryptocurrency markets.",
    instructor: "David Kim",
    duration: "5 weeks",
    level: "Beginner",
    studentsEnrolled: 923,
    rating: 4.5,
    price: 0.06,
    image:
      "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=400",
    tags: "Trading,Analysis,Markets",
    category: "Finance",
  },
  {
    id: BigInt(6),
    courseName: "Web3 Full-Stack Development",
    description:
      "Complete full-stack development course covering frontend, backend, and blockchain integration.",
    instructor: "Maria Garcia",
    duration: "12 weeks",
    level: "Advanced",
    studentsEnrolled: 445,
    rating: 4.9,
    price: 0.15,
    image:
      "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=400",
    tags: "Full-Stack,React,Node.js",
    category: "Development",
  },
]);
