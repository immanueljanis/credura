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
]);
