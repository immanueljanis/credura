"use client";

import { useEffect, useState } from "react";
import { Search, Plus, BookOpen, Users, Star, Edit, Trash, Eye } from "lucide-react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { courseBadgeAbi, courseBadgeAddress } from "@/abi/course-badge";
import { parseEther } from "viem";
import { addCourseAction } from "@/actions/add-course.action";
import { updateCourseAction } from "@/actions/edit-corse.action"; // Pastikan path ini benar, sebelumnya 'update-course.action'

type CourseInput = {
  courseName: string;
  description: string;
  instructor: string;
  duration: string;
  level: string;
  price: number;
  image?: string;
  tags?: string;
  category?: string;
};

type Course = {
  id: string;
  title: string;
  instructor: string;
  students: number;
  rating: number;
  price: number;
  status: string;
  createdDate: string;
  category: string;
  image?: string;
  description?: string;
  duration?: string;
  level?: string;
  tags?: string;
};

// Modal Component yang disatukan untuk Add dan Edit
const CourseFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEditing,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CourseInput, courseId?: string) => void;
  initialData?: Course;
  isEditing: boolean;
}) => {
  const [formData, setFormData] = useState<CourseInput>({
    courseName: "",
    description: "",
    instructor: "",
    duration: "",
    level: "Beginner",
    price: 0,
    image: "",
    tags: "",
    category: "",
  });

  // Set initial data when modal opens in edit mode
  useEffect(() => {
    if (isOpen && isEditing && initialData) {
      setFormData({
        courseName: initialData.title || "", // Pastikan selalu string
        description: initialData.description || "", // <--- Tambahkan || ""
        instructor: initialData.instructor || "", // Pastikan selalu string
        duration: initialData.duration || "", // <--- Tambahkan || ""
        level: initialData.level || "Beginner", // Pastikan selalu string dan ada fallback
        price: initialData.price || 0, // Pastikan selalu number
        image: initialData.image || "",
        tags: initialData.tags || "", // Jika tags ada di Course, gunakan
        category: initialData.category || "",
      });
    } else if (isOpen && !isEditing) {
      // Reset form for add mode
      setFormData({
        courseName: "",
        description: "",
        instructor: "",
        duration: "",
        level: "Beginner",
        price: 0,
        image: "",
        tags: "",
        category: "",
      });
    }
  }, [isOpen, isEditing, initialData]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.courseName.trim() && formData.instructor.trim() && formData.duration.trim()) {
      onSubmit(formData, isEditing ? initialData?.id : undefined); // Kirim ID jika dalam mode edit
      // onClose(); // Jangan tutup modal di sini, biarkan parent yang menutup setelah berhasil
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600/60 flex justify-center items-center z-50 overflow-y-auto p-4">
      <div className="bg-white rounded-lg p-8 shadow-xl w-full max-w-lg my-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          {isEditing ? "Edit Course" : "Create New Course"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="courseName" className="block text-sm font-medium text-gray-700 mb-1">
              Course Name
            </label>
            <input
              type="text"
              id="courseName"
              name="courseName"
              className="input-field w-full"
              placeholder="e.g., Introduction to Web3"
              value={formData.courseName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className="input-field w-full"
              placeholder="Briefly describe the course content..."
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="instructor" className="block text-sm font-medium text-gray-700 mb-1">
              Instructor
            </label>
            <input
              type="text"
              id="instructor"
              name="instructor"
              className="input-field w-full"
              placeholder="e.g., Dr. Alice Johnson"
              value={formData.instructor}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                Duration
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                className="input-field w-full"
                placeholder="e.g., 8 weeks or 20 hours"
                value={formData.duration}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
                Level
              </label>
              <select
                id="level"
                name="level"
                className="input-field w-full"
                value={formData.level}
                onChange={handleChange}
                required
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price (ETH)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              step="0.0001"
              className="input-field w-full"
              placeholder="e.g., 0.05"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Image URL (Optional)
            </label>
            <input
              type="url"
              id="image"
              name="image"
              className="input-field w-full"
              placeholder="e.g., https://example.com/course.jpg"
              value={formData.image}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
              Tags (Optional, comma-separated)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              className="input-field w-full"
              placeholder="e.g., defi, nft, solidity"
              value={formData.tags}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category (Optional)
            </label>
            <input
              type="text"
              id="category"
              name="category"
              className="input-field w-full"
              placeholder="e.g., Development, Finance"
              value={formData.category}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#58CC02]"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {isEditing ? "Save Changes" : "Create Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export function CourseManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // State untuk mode edit
  const [editingCourse, setEditingCourse] = useState<Course | undefined>(undefined); // State untuk menyimpan kursus yang diedit
  const [courses, setCourses] = useState<Course[]>([]);

  const fetchAllCourse = async () => {
    try {
      const response = await fetch("/api/courses");
      const data = await response.json();

      const mappedData: Course[] = data.map((course: any) => ({
        id: String(course.id),
        title: course.courseName,
        instructor: course.instructor,
        students: course.studentsEnrolled || 0,
        rating: course.rating || 0,
        price: course.price,
        status: "Published",
        createdDate: course.createdAt
          ? new Date(course.createdAt).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        category: course.category || "Uncategorized",
        image: course.image || "/placeholder-course.jpg",
        description: course.description || "", // Pastikan properti ini ada dan string
        duration: course.duration || "", // Pastikan properti ini ada dan string
        level: course.level || "Beginner", // Pastikan properti ini ada dan string
        tags: course.tags && Array.isArray(course.tags) ? course.tags.join(",") : "", // Ubah array tags menjadi string
      }));

      setCourses(mappedData);
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  useEffect(() => {
    fetchAllCourse();
  }, []);

  const { data: hash, error, isPending, writeContractAsync } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const handleAddCourseClick = () => {
    setIsEditing(false); // Pastikan mode add
    setEditingCourse(undefined); // Reset course yang diedit
    setIsModalOpen(true);
  };

  const handleEditCourseClick = (course: Course) => {
    setIsEditing(true); // Masuk mode edit
    setEditingCourse(course); // Set kursus yang akan diedit
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingCourse(undefined); // Bersihkan state edit
  };

  // Fungsi yang dipanggil dari modal (untuk add dan edit)
  const handleSubmitCourse = async (courseData: CourseInput, courseId?: string) => {
    try {
      if (isEditing && courseId) {
        // Logika untuk mengupdate kursus
        // Pastikan properti yang dikirim ke updateCourseAction sesuai dengan skema DB
        // dan CourseInput
        const updatedCourseFromDb = await updateCourseAction(courseId, {
          courseName: courseData.courseName,
          description: courseData.description,
          instructor: courseData.instructor,
          duration: courseData.duration,
          level: courseData.level,
          price: courseData.price,
          image: courseData.image,
          tags: courseData.tags
            ? courseData.tags
                .split(",")
                .map((tag) => tag.trim())
                .join(",")
            : "",
          category: courseData.category,
        });

        // Perbarui state courses
        setCourses((prevCourses: any) =>
          prevCourses.map((course: any) =>
            course.id === courseId
              ? {
                  ...course,
                  title: updatedCourseFromDb.courseName,
                  instructor: updatedCourseFromDb.instructor,
                  price: updatedCourseFromDb.price,
                  category: updatedCourseFromDb.category,
                  image: updatedCourseFromDb.image || "/placeholder-course.jpg",
                  description: updatedCourseFromDb.description,
                  duration: updatedCourseFromDb.duration,
                  // Pastikan untuk memperbarui properti lain yang relevan dari hasil DB
                }
              : course
          )
        );

        alert("Course updated successfully!");
      } else {
        // Logika untuk menambahkan kursus baru
        const result = await addCourseAction({
          courseName: courseData.courseName,
          description: courseData.description,
          instructor: courseData.instructor,
          duration: courseData.duration,
          level: courseData.level,
          price: courseData.price,
          image: courseData.image,
          tags: courseData.tags
            ? courseData.tags
                .split(",")
                .map((tag) => tag.trim())
                .join("")
            : "",
          category: courseData.category,
        });

        const newCourse: Course = {
          id: String(result[0].id), // Ambil ID dari hasil DB
          title: result[0].courseName, // Ambil nama kursus dari hasil DB
          instructor: result[0].instructor,
          students: 0,
          rating: 0,
          price: result[0].price,
          status: "Draft", // Atau status default dari DB jika ada
          createdDate: result[0].createdAt
            ? new Date(result[0].createdAt).toISOString().split("T")[0]
            : new Date().toISOString().split("T")[0],
          category: result[0].category || "Uncategorized",
          image: result[0].image || "/placeholder-course.jpg",
          description: result[0].description,
          duration: result[0].duration,
        };
        setCourses([...courses, newCourse]);
        alert("Course created successfully!");
      }
      setIsModalOpen(false);
      setIsEditing(false);
      setEditingCourse(undefined);
      fetchAllCourse(); // Refresh data setelah operasi (opsional, tergantung kebutuhan)
    } catch (err: any) {
      console.error("Error submitting course:", err);
      alert(`Failed to submit course: ${err.shortMessage || err.message}`);
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || course.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
          <p className="text-gray-600 mt-1">Create, edit, and manage educational content</p>
        </div>
        <button
          className="btn-primary flex items-center"
          onClick={handleAddCourseClick}
          disabled={isPending}
        >
          <Plus className="w-5 h-5 mr-2" />
          {isPending ? "Processing..." : "Create Course"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Courses</p>
              <p className="text-2xl font-bold text-gray-900">58</p>
            </div>
            <BookOpen className="w-8 h-8 text-[#58CC02]" />
          </div>
          <div className="mt-2 text-sm text-green-600">+5 this month</div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-2xl font-bold text-gray-900">42</p>
            </div>
            <BookOpen className="w-8 h-8 text-[#FF6F61]" />
          </div>
          <div className="mt-2 text-sm text-green-600">+3 this month</div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Enrollments</p>
              <p className="text-2xl font-bold text-gray-900">45K</p>
            </div>
            <Users className="w-8 h-8 text-[#4E6C50]" />
          </div>
          <div className="mt-2 text-sm text-green-600">+15% this month</div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold text-gray-900">4.8</p>
            </div>
            <Star className="w-8 h-8 text-[#58CC02]" />
          </div>
          <div className="mt-2 text-sm text-green-600">+0.2 this month</div>
        </div>
      </div>

      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search courses or instructors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#58CC02] focus:border-transparent"
          >
            <option value="All">All Status</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
            <option value="Archived">Archived</option>
          </select>
        </div>
      </div>

      {isConfirming && (
        <p className="text-center text-blue-600">Menunggu konfirmasi transaksi...</p>
      )}
      {isConfirmed && (
        <p className="text-center text-green-600">Transaksi berhasil dikonfirmasi!</p>
      )}
      {error && <p className="text-center text-red-600">Error transaksi: {error.message}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="card p-0 overflow-hidden">
            {course.image && (
              <img src={course.image} alt={course.title} className="w-full h-40 object-cover" />
            )}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    course.status === "Published"
                      ? "bg-green-100 text-green-800"
                      : course.status === "Draft"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {course.status}
                </span>
                <div className="text-lg font-bold text-[#58CC02]">{course.price} ETH</div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {course.title}
              </h3>

              <p className="text-sm text-gray-600 mb-4">By {course.instructor}</p>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {course.students.toLocaleString()} students
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                  {course.rating}
                </div>
              </div>

              <div className="text-xs text-gray-500 mb-4">
                Created: {new Date(course.createdDate).toLocaleDateString()}
              </div>
            </div>

            <div className="border-t border-gray-100 px-6 py-4 bg-gray-50">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{course.category}</span>
                <div className="flex items-center space-x-2">
                  <button className="p-1 text-gray-400 hover:text-[#58CC02]">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    className="p-1 text-gray-400 hover:text-[#FF6F61]"
                    onClick={() => handleEditCourseClick(course)}
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <CourseFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitCourse}
        initialData={editingCourse}
        isEditing={isEditing}
      />
    </div>
  );
}
