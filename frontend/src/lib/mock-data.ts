import type {
  School,
  Program,
  AcademicYear,
  Lecturer,
  Course,
  Assignment,
  PasscoPaper,
  VerifiedQuestion,
  PracticeQuestion,
  GuideVideo,
  CourseBreakdown,
  LectureBreakdown,
  SlideResource,
  DisciplineProgram,
  QuizQuestion,
} from "./types";

// ═══════════════════════════════════════════════════
// Schools
// ═══════════════════════════════════════════════════

export const schools: School[] = [
  {
    id: "s1",
    name: "Kwame Nkrumah University of Science and Technology",
    slug: "knust",
    primaryColor: "#8B0000",
    isActive: true,
  },
  {
    id: "s2",
    name: "University of Ghana",
    slug: "ug",
    primaryColor: "#003366",
    isActive: true,
  },
  {
    id: "s3",
    name: "University of Cape Coast",
    slug: "ucc",
    primaryColor: "#FFD700",
    isActive: true,
  },
  {
    id: "s4",
    name: "University for Development Studies",
    slug: "uds",
    primaryColor: "#006400",
    isActive: false,
  },
];

// ═══════════════════════════════════════════════════
// Programs
// ═══════════════════════════════════════════════════

export const programs: Program[] = [
  {
    id: "p1",
    name: "Computer Science",
    slug: "cs",
    disciplineSlug: "computer-science",
    schoolId: "s1",
  },
  {
    id: "p2",
    name: "Computer Science",
    slug: "cs",
    disciplineSlug: "computer-science",
    schoolId: "s2",
  },
  {
    id: "p3",
    name: "Information Technology",
    slug: "it",
    disciplineSlug: "information-technology",
    schoolId: "s1",
  },
  {
    id: "p4",
    name: "Computer Engineering",
    slug: "ce",
    disciplineSlug: "computer-engineering",
    schoolId: "s3",
  },
];

// ═══════════════════════════════════════════════════
// Academic Years
// ═══════════════════════════════════════════════════

export const academicYears: AcademicYear[] = [
  { id: "y1", label: "2024/2025", slug: "2024-25", programId: "p1", isActive: true },
  { id: "y2", label: "2023/2024", slug: "2023-24", programId: "p1", isActive: false },
  { id: "y3", label: "2024/2025", slug: "2024-25", programId: "p2", isActive: true },
];

// ═══════════════════════════════════════════════════
// Lecturers
// ═══════════════════════════════════════════════════

export const lecturers: Lecturer[] = [
  {
    id: "l1",
    name: "Dr. Kwame Asante",
    bio: "Senior Lecturer in Computer Science with expertise in algorithms and data structures. Over 15 years of teaching experience.",
    email: "k.asante@knust.edu.gh",
    officeHours: "Mon & Wed 10:00 AM - 12:00 PM",
    schoolId: "s1",
  },
  {
    id: "l2",
    name: "Prof. Ama Mensah",
    bio: "Associate Professor specializing in software engineering and systems design.",
    email: "a.mensah@knust.edu.gh",
    officeHours: "Tue & Thu 2:00 PM - 4:00 PM",
    schoolId: "s1",
  },
  {
    id: "l3",
    name: "Dr. Yaw Boateng",
    bio: "Lecturer in database systems and web technologies.",
    email: "y.boateng@knust.edu.gh",
    officeHours: "Fri 9:00 AM - 11:00 AM",
    schoolId: "s1",
  },
];

// ═══════════════════════════════════════════════════
// Courses — Real KNUST BSc Computer Science Structure
// ═══════════════════════════════════════════════════

// Helper to build course objects compactly
function mkCourse(
  id: string, code: string, name: string,
  yearLevel: number, semester: 1 | 2,
  t: number, p: number, c: number,
  lecturerIdx: number[] = [0],
  counts?: Partial<Course["sectionCounts"]>
): Course {
  const slug = code.replace(/\s+/g, "").toLowerCase();
  return {
    id, code, name, slug,
    academicYearId: "y1", programId: "p1",
    yearLevel, semester,
    theoryHours: t, practicalHours: p, creditHours: c,
    isEvergreen: false,
    lecturers: lecturerIdx.map((i) => lecturers[i % lecturers.length]),
    sectionCounts: {
      assignments: counts?.assignments ?? 0,
      passco: counts?.passco ?? 0,
      verifiedQuestions: counts?.verifiedQuestions ?? 0,
      practiceQuestions: counts?.practiceQuestions ?? 0,
      videos: counts?.videos ?? 0,
      slides: counts?.slides ?? 0,
      hasBreakdown: counts?.hasBreakdown ?? false,
      lectureCount: counts?.lectureCount ?? 0,
    },
  };
}

export const courses: Course[] = [
  // ── Year 1, Semester 1 ──
  mkCourse("c101","CSM 151","Information Technology I",1,1,2,2,3,[0],{assignments:4,passco:5,verifiedQuestions:6,practiceQuestions:15,videos:3,slides:8,hasBreakdown:true,lectureCount:12}),
  mkCourse("c102","CSM 153","Circuit Theory",1,1,2,0,2,[1]),
  mkCourse("c103","CSM 157","Introduction to Structured Program Design",1,1,2,2,3,[0],{assignments:6,passco:8,verifiedQuestions:12,practiceQuestions:24,videos:5,slides:14,hasBreakdown:true,lectureCount:14}),
  mkCourse("c104","MATH 163","Discrete Mathematics I",1,1,3,0,3,[2]),
  mkCourse("c105","ECON 151","Elements of Economics I",1,1,3,0,3,[1]),
  mkCourse("c106","MATH 161","Pure Mathematics I",1,1,3,0,3,[2]),
  mkCourse("c107","ENGL 157","Communication Skills I",1,1,2,0,2,[1]),
  // ── Year 1, Semester 2 ──
  mkCourse("c108","CSM 152","Information Technology II",1,2,2,2,3,[0]),
  mkCourse("c109","CSM 158","Programming with C++",1,2,2,2,3,[0],{assignments:5,passco:6,verifiedQuestions:8,practiceQuestions:20,videos:4,slides:10,hasBreakdown:true,lectureCount:13}),
  mkCourse("c110","MATH 170","Discrete Mathematics II",1,2,3,0,3,[2]),
  mkCourse("c111","MATH 166","Probability and Statistics",1,2,3,0,3,[2]),
  mkCourse("c112","MATH 162","Pure Maths II",1,2,3,0,3,[2]),
  mkCourse("c113","ECON 152","Elements of Economics II",1,2,2,0,2,[1]),
  mkCourse("c114","ENGL 158","Communication Skills II",1,2,2,0,2,[1]),
  // ── Year 2, Semester 1 ──
  mkCourse("c201","CSM 251","Introductory Electronics",2,1,2,0,2,[1]),
  mkCourse("c202","CSM 281","Object Oriented Programming with JAVA",2,1,2,2,3,[0],{assignments:5,passco:7,verifiedQuestions:10,practiceQuestions:22,videos:3,slides:12,hasBreakdown:true,lectureCount:13}),
  mkCourse("c203","CSM 255","Open Source Operating Systems",2,1,2,1,2,[0]),
  mkCourse("c204","CSM 273","Linear and Numerical Algebra",2,1,3,1,3,[2]),
  mkCourse("c205","CSM 291","Systems Analysis and Design I",2,1,2,1,2,[1]),
  mkCourse("c206","CSM 297","Database Concepts and Technologies I",2,1,2,2,3,[2],{assignments:4,passco:6,verifiedQuestions:8,practiceQuestions:18,videos:4,slides:10,hasBreakdown:true,lectureCount:12}),
  mkCourse("c207","ENGL 263","Literature in English I",2,1,1,0,1,[1]),
  mkCourse("c208","CSM 265","Ethical and Legal Implications of Computing",2,1,2,0,2,[1]),
  // ── Year 2, Semester 2 ──
  mkCourse("c209","CSM 252","Analogue and Digital Electronics",2,2,2,0,2,[1]),
  mkCourse("c210","CSM 254","Programming with Assembly Language",2,2,2,2,3,[0]),
  mkCourse("c211","CSM 258","Numerical Methods and Computations",2,2,3,1,3,[2]),
  mkCourse("c212","CSM 292","Systems Analysis and Design II",2,2,2,1,2,[1]),
  mkCourse("c213","CSM 264","Programming with VISUAL BASIC",2,2,2,2,3,[0]),
  mkCourse("c214","ENGL 264","Literature in English II",2,2,1,0,1,[1]),
  mkCourse("c215","CSM 260","Database Concepts and Technologies II",2,2,2,2,3,[2]),
  // ── Year 3, Semester 1 ──
  mkCourse("c301","CSM 285","Accounting I",3,1,2,0,2,[1]),
  mkCourse("c302","CSM 387","Data Structures I",3,1,2,2,3,[0],{assignments:5,passco:10,verifiedQuestions:15,practiceQuestions:30,videos:3,slides:12,hasBreakdown:true,lectureCount:13}),
  mkCourse("c303","CSM 393","Operations Research I",3,1,2,0,2,[2]),
  mkCourse("c304","CSM 395","Introduction to Artificial Intelligence",3,1,2,0,2,[0],{assignments:3,passco:5,verifiedQuestions:6,practiceQuestions:12,videos:2,slides:8,hasBreakdown:true,lectureCount:11}),
  mkCourse("c305","CSM 357","Human Computer Interaction",3,1,3,0,3,[1]),
  mkCourse("c306","CSM 399","Web-Based Concept and Development",3,1,2,1,2,[2],{assignments:4,passco:4,verifiedQuestions:6,practiceQuestions:15,videos:7,slides:8,hasBreakdown:true,lectureCount:11}),
  mkCourse("c307","CSM 353","Survey of Programming Languages",3,1,2,1,2,[0]),
  // ── Year 3, Semester 2 ──
  mkCourse("c308","CSM 354","Computer Graphics",3,2,2,1,2,[0]),
  mkCourse("c309","CSM 374","Real Time and Embedded Systems",3,2,2,1,2,[1]),
  mkCourse("c310","CSM 352","Computer Architecture",3,2,3,0,3,[0]),
  mkCourse("c311","CSM 366","Mini Project",3,2,2,0,2,[0,1]),
  mkCourse("c312","CSM 386","Accounting II",3,2,2,0,2,[1]),
  mkCourse("c313","CSM 388","Data Structures II",3,2,3,1,3,[0]),
  mkCourse("c314","CSM 394","Operations Research II",3,2,2,0,2,[2]),
  // ── Year 4, Semester 1 ──
  mkCourse("c401","CSM 477","Data Communications",4,1,3,0,3,[1]),
  mkCourse("c402","CSM 481","Information Systems I",4,1,3,0,3,[2]),
  mkCourse("c403","CSM 483","Operating Systems",4,1,3,0,3,[0],{assignments:4,passco:7,verifiedQuestions:10,practiceQuestions:20,videos:2,slides:11,hasBreakdown:true,lectureCount:13}),
  mkCourse("c404","CSM 491","Graph Theory and Its Applications",4,1,2,0,2,[2]),
  mkCourse("c405","CSM 489","Project I",4,1,0,6,3,[0,1,2]),
  mkCourse("c406","CSM 495","Introduction to Software Engineering",4,1,2,0,2,[1],{assignments:3,passco:5,verifiedQuestions:7,practiceQuestions:14,videos:2,slides:9,hasBreakdown:true,lectureCount:12}),
  mkCourse("c407","MGT 471","Principles of Management I",4,1,2,0,2,[1]),
  // ── Year 4, Semester 2 ──
  mkCourse("c408","CSM 478","Computer Networks",4,2,2,2,3,[1]),
  mkCourse("c409","CSM 482","Information Systems II",4,2,3,0,3,[2]),
  mkCourse("c410","CSM 484","Introduction to Compilers",4,2,3,0,3,[0]),
  mkCourse("c411","CSM 490","Project II",4,2,0,6,3,[0,1,2]),
  mkCourse("c412","CSM 494","Computer Security",4,2,3,0,3,[1]),
  mkCourse("c413","MGT 472","Principles of Management II",4,2,2,0,2,[1]),
  mkCourse("c414","CSM 498","Expert Systems",4,2,2,0,2,[0]),
];

// ═══════════════════════════════════════════════════
// Assignments (for CS 161)
// ═══════════════════════════════════════════════════

export const assignments: Assignment[] = [
  {
    id: "a1",
    courseId: "c1",
    title: "Assignment 1 — Variables, Types, and Basic I/O",
    dueDate: "2025-02-15",
    questionType: "text",
    questionContent: "Write a Python program that accepts a student's name and three test scores, calculates the average, and prints the result with the student's name. Handle invalid input gracefully.",
    solutions: [
      {
        id: "as1",
        assignmentId: "a1",
        label: "Official Solution",
        solutionSource: "OFFICIAL",
        solutionType: "text",
        solutionContent: "```python\ndef main():\n    name = input('Enter student name: ')\n    scores = []\n    for i in range(3):\n        while True:\n            try:\n                score = float(input(f'Enter score {i+1}: '))\n                scores.append(score)\n                break\n            except ValueError:\n                print('Invalid input. Please enter a number.')\n    avg = sum(scores) / len(scores)\n    print(f'{name}\\'s average score: {avg:.2f}')\n\nmain()\n```",
        status: "APPROVED",
        isReleased: true,
        releasedAt: "2025-02-20",
      },
      {
        id: "as2",
        assignmentId: "a1",
        label: "Dr. Asante's Alternative Method",
        solutionSource: "LECTURER",
        solutionType: "text",
        solutionContent: "Alternative approach using list comprehension and map function for a more Pythonic solution.",
        status: "APPROVED",
        isReleased: true,
        releasedAt: "2025-02-22",
      },
      {
        id: "as3",
        assignmentId: "a1",
        label: "Student Solution — Kofi Mensah",
        solutionSource: "STUDENT",
        solutionType: "text",
        solutionContent: "Student submitted approach using while loop with try/except blocks.",
        contributorName: "Kofi Mensah",
        status: "APPROVED",
        isReleased: false,
      },
    ],
    createdAt: "2025-02-01",
  },
  {
    id: "a2",
    courseId: "c1",
    title: "Assignment 2 — Control Flow and Loops",
    dueDate: "2025-03-01",
    questionType: "text",
    questionContent: "Implement a number guessing game. The program should generate a random number between 1 and 100. The user has 7 attempts to guess it. After each guess, provide 'higher' or 'lower' feedback.",
    solutions: [
      {
        id: "as4",
        assignmentId: "a2",
        label: "Official Solution",
        solutionSource: "OFFICIAL",
        solutionType: "text",
        solutionContent: "Complete implementation with random module and loop-based guessing logic.",
        status: "APPROVED",
        isReleased: true,
        releasedAt: "2025-03-08",
      },
    ],
    createdAt: "2025-02-15",
  },
  {
    id: "a3",
    courseId: "c1",
    title: "Assignment 3 — Functions and Modules",
    dueDate: "2025-03-15",
    questionType: "pdf",
    questionContent: "See attached PDF for full question details.",
    solutions: [
      {
        id: "as5",
        assignmentId: "a3",
        label: "Official Solution",
        solutionSource: "OFFICIAL",
        solutionType: "pdf",
        solutionContent: "Solution PDF available.",
        status: "APPROVED",
        isReleased: false,
      },
      {
        id: "as6",
        assignmentId: "a3",
        label: "Student Submission",
        solutionSource: "STUDENT",
        solutionType: "text",
        solutionContent: "Pending review",
        contributorName: "Ama Darko",
        status: "PENDING",
        isReleased: false,
      },
    ],
    createdAt: "2025-03-01",
  },
  {
    id: "a4",
    courseId: "c1",
    title: "Assignment 4 — Object-Oriented Programming",
    dueDate: "2025-04-01",
    questionType: "text",
    questionContent: "Design a class hierarchy for a University Management System. Create classes for Person, Student, Lecturer, and Course with appropriate inheritance, encapsulation, and polymorphism.",
    solutions: [],
    createdAt: "2025-03-15",
  },
  {
    id: "a5",
    courseId: "c1",
    title: "Assignment 5 — File Handling and Exception Management",
    dueDate: "2025-04-15",
    questionType: "text",
    questionContent: "Build a student grade management system that reads from and writes to CSV files. Implement proper exception handling for file operations and data validation.",
    solutions: [
      {
        id: "as7",
        assignmentId: "a5",
        label: "Official Solution",
        solutionSource: "OFFICIAL",
        solutionType: "text",
        solutionContent: "Complete CSV-based grade management implementation.",
        status: "APPROVED",
        isReleased: true,
        releasedAt: "2025-04-22",
      },
    ],
    createdAt: "2025-04-01",
  },
  {
    id: "a6",
    courseId: "c1",
    title: "Assignment 6 — Final Project: Mini Application",
    dueDate: "2025-05-01",
    questionType: "text",
    questionContent: "Build a complete command-line application of your choice. Must include: file I/O, OOP principles, error handling, and at least one external library. Submit with documentation.",
    solutions: [],
    createdAt: "2025-04-15",
  },
];

// ═══════════════════════════════════════════════════
// Passco Papers (for CS 161)
// ═══════════════════════════════════════════════════

export const passcoPapers: PasscoPaper[] = [
  {
    id: "pc1",
    courseId: "c1",
    title: "End of Semester Exam 2024",
    examType: "END_OF_SEM",
    examYear: 2024,
    examSemester: "FIRST",
    priority: "HIGH",
    passcoFrequency: 6,
    hasSolutions: true,
    solutionCount: 2,
    isHistorical: false,
  },
  {
    id: "pc2",
    courseId: "c1",
    title: "Mid Semester Exam 2024",
    examType: "MID_SEM",
    examYear: 2024,
    examSemester: "FIRST",
    priority: "MEDIUM",
    passcoFrequency: 3,
    hasSolutions: true,
    solutionCount: 1,
    isHistorical: false,
  },
  {
    id: "pc3",
    courseId: "c1",
    title: "End of Semester Exam 2023",
    examType: "END_OF_SEM",
    examYear: 2023,
    examSemester: "FIRST",
    priority: "HIGH",
    passcoFrequency: 5,
    hasSolutions: true,
    solutionCount: 1,
    isHistorical: true,
  },
  {
    id: "pc4",
    courseId: "c1",
    title: "Mid Semester Exam 2023",
    examType: "MID_SEM",
    examYear: 2023,
    examSemester: "FIRST",
    priority: null,
    passcoFrequency: 2,
    hasSolutions: false,
    solutionCount: 0,
    isHistorical: true,
  },
  {
    id: "pc5",
    courseId: "c1",
    title: "End of Semester Exam 2022",
    examType: "END_OF_SEM",
    examYear: 2022,
    examSemester: "FIRST",
    priority: "MEDIUM",
    passcoFrequency: 4,
    hasSolutions: true,
    solutionCount: 1,
    isHistorical: true,
  },
  {
    id: "pc6",
    courseId: "c1",
    title: "End of Semester Exam 2021",
    examType: "END_OF_SEM",
    examYear: 2021,
    examSemester: "FIRST",
    priority: null,
    passcoFrequency: 1,
    hasSolutions: false,
    solutionCount: 0,
    isHistorical: true,
  },
  {
    id: "pc7",
    courseId: "c1",
    title: "End of Semester Exam 2020",
    examType: "END_OF_SEM",
    examYear: 2020,
    examSemester: "FIRST",
    priority: null,
    passcoFrequency: 1,
    hasSolutions: false,
    solutionCount: 0,
    isHistorical: true,
  },
  {
    id: "pc8",
    courseId: "c1",
    title: "Quiz 1 — 2024",
    examType: "QUIZ",
    examYear: 2024,
    examSemester: "FIRST",
    priority: null,
    passcoFrequency: 0,
    hasSolutions: false,
    solutionCount: 0,
    isHistorical: false,
  },
];

// ═══════════════════════════════════════════════════
// Verified Questions (for CS 161)
// ═══════════════════════════════════════════════════

export const verifiedQuestions: VerifiedQuestion[] = [
  {
    id: "vq1",
    courseId: "c1",
    questionContent: "Explain the difference between mutable and immutable data types in Python. Provide examples of each and demonstrate how mutability affects function behavior when objects are passed as arguments.",
    questionType: "text",
    topic: "Data Types",
    verifiedType: "LIKELY_TO_COME",
    sourceType: "LECTURER_DIRECT",
    evidenceNote: "Dr. Asante emphasized this topic in Week 4 lecture and mentioned it's exam-worthy.",
    passcoFrequency: 5,
    priority: "HIGH",
    solutions: [
      {
        id: "vs1",
        label: "Official Answer Guide",
        solutionSource: "OFFICIAL",
        solutionType: "text",
        solutionContent: "Comprehensive explanation of mutable vs immutable types with code examples.",
        status: "APPROVED",
        isReleased: true,
        releasedAt: "2025-03-01",
        upvoteCount: 45,
      },
    ],
    createdAt: "2025-02-15",
  },
  {
    id: "vq2",
    courseId: "c1",
    questionContent: "Write a recursive function to compute the nth Fibonacci number. Then explain why the naive recursive approach is inefficient and implement memoization to optimize it.",
    questionType: "text",
    topic: "Recursion",
    verifiedType: "CONFIRMED_CAME_UP",
    sourceType: "LECTURER_DIRECT",
    evidenceNote: "Appeared in 2023 End of Semester exam. Dr. Asante confirmed it's a recurring theme.",
    passcoFrequency: 7,
    priority: "HIGH",
    solutions: [
      {
        id: "vs2",
        label: "Official Solution",
        solutionSource: "OFFICIAL",
        solutionType: "text",
        solutionContent: "Recursive + memoized Fibonacci implementation with complexity analysis.",
        status: "APPROVED",
        isReleased: true,
        releasedAt: "2025-03-05",
        upvoteCount: 62,
      },
      {
        id: "vs3",
        label: "TA's Visual Explanation",
        solutionSource: "LECTURER",
        solutionType: "text",
        solutionContent: "Step-by-step visual walkthrough of the recursion tree.",
        status: "APPROVED",
        isReleased: true,
        releasedAt: "2025-03-07",
        upvoteCount: 38,
      },
    ],
    createdAt: "2025-02-20",
  },
  {
    id: "vq3",
    courseId: "c1",
    questionContent: "Describe the four pillars of Object-Oriented Programming with Python examples for each. How does Python implement encapsulation differently from Java?",
    questionType: "text",
    topic: "OOP",
    verifiedType: "LIKELY_TO_COME",
    sourceType: "TA",
    evidenceNote: "Course TA flagged this as a focus area for the upcoming exam.",
    passcoFrequency: 4,
    priority: "HIGH",
    solutions: [
      {
        id: "vs4",
        label: "Comprehensive Guide",
        solutionSource: "OFFICIAL",
        solutionType: "text",
        solutionContent: "Detailed OOP pillars explanation with Python-specific implementations.",
        status: "APPROVED",
        isReleased: true,
        releasedAt: "2025-03-10",
        upvoteCount: 55,
      },
    ],
    createdAt: "2025-02-25",
  },
  {
    id: "vq4",
    courseId: "c1",
    questionContent: "What is the difference between a list and a tuple in Python? When would you choose one over the other?",
    questionType: "text",
    topic: "Data Types",
    verifiedType: "LIKELY_TO_COME",
    sourceType: "ADMIN",
    passcoFrequency: 3,
    priority: "MEDIUM",
    solutions: [],
    createdAt: "2025-03-01",
  },
  {
    id: "vq5",
    courseId: "c1",
    questionContent: "Implement a stack data structure using a Python list. Include push, pop, peek, is_empty, and size methods. Demonstrate its use by evaluating a postfix expression.",
    questionType: "text",
    topic: "Data Structures",
    verifiedType: "CONFIRMED_CAME_UP",
    sourceType: "LECTURER_DIRECT",
    evidenceNote: "Bank question—has appeared in 3 of the last 5 exams.",
    passcoFrequency: 6,
    priority: "HIGH",
    solutions: [
      {
        id: "vs5",
        label: "Official Solution",
        solutionSource: "OFFICIAL",
        solutionType: "text",
        solutionContent: "Stack implementation with postfix evaluation.",
        status: "APPROVED",
        isReleased: true,
        releasedAt: "2025-03-15",
        upvoteCount: 71,
      },
    ],
    createdAt: "2025-03-05",
  },
  {
    id: "vq6",
    courseId: "c1",
    questionContent: "Explain exception handling in Python. What are the differences between try, except, else, and finally blocks?",
    questionType: "text",
    topic: "Error Handling",
    verifiedType: "LIKELY_TO_COME",
    sourceType: "COMMUNITY",
    passcoFrequency: 2,
    priority: "MEDIUM",
    solutions: [],
    createdAt: "2025-03-10",
  },
];

// ═══════════════════════════════════════════════════
// Practice Questions (for CS 161)
// ═══════════════════════════════════════════════════

export const practiceQuestions: PracticeQuestion[] = [
  {
    id: "pq1",
    courseId: "c1",
    questionContent: "Write a function that takes a list of integers and returns the second largest number without using built-in sorting.",
    questionType: "text",
    topic: "Arrays",
    difficulty: "EASY",
    solutions: [
      {
        id: "ps1",
        label: "Solution",
        solutionSource: "OFFICIAL",
        solutionType: "text",
        solutionContent: "Linear scan approach with two variables.",
        status: "APPROVED",
        isReleased: true,
        upvoteCount: 12,
      },
    ],
    createdAt: "2025-01-15",
  },
  {
    id: "pq2",
    courseId: "c1",
    questionContent: "Implement a function to check if a string is a palindrome. Handle edge cases: empty strings, single characters, and strings with spaces.",
    questionType: "text",
    topic: "Strings",
    difficulty: "EASY",
    solutions: [
      {
        id: "ps2",
        label: "Solution",
        solutionSource: "OFFICIAL",
        solutionType: "text",
        solutionContent: "Two-pointer approach.",
        status: "APPROVED",
        isReleased: true,
        upvoteCount: 8,
      },
    ],
    createdAt: "2025-01-20",
  },
  {
    id: "pq3",
    courseId: "c1",
    questionContent: "Given two sorted lists, merge them into a single sorted list without using Python's built-in sort.",
    questionType: "text",
    topic: "Sorting",
    difficulty: "MEDIUM",
    solutions: [
      {
        id: "ps3",
        label: "Solution",
        solutionSource: "OFFICIAL",
        solutionType: "text",
        solutionContent: "Two-pointer merge algorithm.",
        status: "APPROVED",
        isReleased: true,
        upvoteCount: 15,
      },
    ],
    createdAt: "2025-02-01",
  },
  {
    id: "pq4",
    courseId: "c1",
    questionContent: "Implement binary search on a sorted array. What is the time complexity? What happens if the array is not sorted?",
    questionType: "text",
    topic: "Searching",
    difficulty: "MEDIUM",
    solutions: [],
    createdAt: "2025-02-05",
  },
  {
    id: "pq5",
    courseId: "c1",
    questionContent: "Design and implement a linked list class with insert_at_head, insert_at_tail, delete_node, and display methods.",
    questionType: "text",
    topic: "Data Structures",
    difficulty: "HARD",
    solutions: [
      {
        id: "ps4",
        label: "Solution",
        solutionSource: "OFFICIAL",
        solutionType: "text",
        solutionContent: "Complete linked list implementation with all methods.",
        status: "APPROVED",
        isReleased: true,
        upvoteCount: 22,
      },
    ],
    createdAt: "2025-02-10",
  },
  {
    id: "pq6",
    courseId: "c1",
    questionContent: "Implement the Tower of Hanoi problem recursively. Print each step showing the disk movement between pegs.",
    questionType: "text",
    topic: "Recursion",
    difficulty: "HARD",
    solutions: [],
    createdAt: "2025-02-15",
  },
  {
    id: "pq7",
    courseId: "c1",
    questionContent: "Write a program to count word frequency in a text file. Display results sorted by frequency in descending order.",
    questionType: "text",
    topic: "File I/O",
    difficulty: "MEDIUM",
    solutions: [
      {
        id: "ps5",
        label: "Solution",
        solutionSource: "OFFICIAL",
        solutionType: "text",
        solutionContent: "Using collections.Counter with file reading.",
        status: "APPROVED",
        isReleased: true,
        upvoteCount: 10,
      },
    ],
    createdAt: "2025-02-20",
  },
  {
    id: "pq8",
    courseId: "c1",
    questionContent: "Create a decorator function that logs the execution time of any function it wraps.",
    questionType: "text",
    topic: "Functions",
    difficulty: "MEDIUM",
    solutions: [],
    createdAt: "2025-03-01",
  },
];

// ═══════════════════════════════════════════════════
// Quiz Questions (MCQ for Practice mode)
// ═══════════════════════════════════════════════════



export const quizQuestions: QuizQuestion[] = [
  { id:"qq1",courseId:"c103",topic:"Variables",difficulty:"EASY",questionText:"Which of the following is a valid variable name in C?",options:["2count","my-var","_total","class"],correctIndex:2,explanation:"Variable names can start with underscore or letter, not digit or hyphen. 'class' is reserved." },
  { id:"qq2",courseId:"c103",topic:"Variables",difficulty:"EASY",questionText:"What is the output of: int x = 5/2; printf(\"%d\", x);",options:["2.5","2","3","Error"],correctIndex:1,explanation:"Integer division truncates. 5/2 = 2 in integer arithmetic." },
  { id:"qq3",courseId:"c103",topic:"Control Flow",difficulty:"EASY",questionText:"Which loop is guaranteed to execute at least once?",options:["for","while","do-while","None"],correctIndex:2,explanation:"do-while checks condition after the first iteration." },
  { id:"qq4",courseId:"c103",topic:"Control Flow",difficulty:"MEDIUM",questionText:"What does 'break' do inside a nested loop?",options:["Exits all loops","Exits the innermost loop","Skips current iteration","Ends the program"],correctIndex:1,explanation:"break only exits the innermost enclosing loop." },
  { id:"qq5",courseId:"c103",topic:"Functions",difficulty:"MEDIUM",questionText:"What is the return type of a function that returns nothing?",options:["int","null","void","empty"],correctIndex:2,explanation:"void indicates no return value." },
  { id:"qq6",courseId:"c103",topic:"Arrays",difficulty:"MEDIUM",questionText:"In C, arrays are indexed starting from:",options:["1","0","-1","Depends on declaration"],correctIndex:1,explanation:"C arrays are zero-indexed." },
  { id:"qq7",courseId:"c103",topic:"Pointers",difficulty:"HARD",questionText:"If int *p; and int x=10; p=&x; what is *p?",options:["Address of x","10","Address of p","Error"],correctIndex:1,explanation:"*p dereferences the pointer, giving the value stored at the address." },
  { id:"qq8",courseId:"c103",topic:"Pointers",difficulty:"HARD",questionText:"What does malloc() return?",options:["An integer","A void pointer","A char pointer","Nothing"],correctIndex:1,explanation:"malloc returns void* which can be cast to any pointer type." },
  { id:"qq9",courseId:"c103",topic:"Data Types",difficulty:"EASY",questionText:"Which data type stores a single character in C?",options:["string","char","character","text"],correctIndex:1 },
  { id:"qq10",courseId:"c103",topic:"Recursion",difficulty:"HARD",questionText:"What is the base case for factorial(n)?",options:["n == -1","n == 0 or n == 1","n > 100","No base case needed"],correctIndex:1,explanation:"factorial(0) = factorial(1) = 1" },
  { id:"qq11",courseId:"c202",topic:"OOP",difficulty:"MEDIUM",questionText:"Which keyword creates a subclass in Java?",options:["implements","inherits","extends","super"],correctIndex:2 },
  { id:"qq12",courseId:"c202",topic:"OOP",difficulty:"EASY",questionText:"What is encapsulation?",options:["Hiding implementation details","Multiple inheritance","Code reuse","Runtime binding"],correctIndex:0 },
];

export function getQuizTopics(): string[] {
  return [...new Set(quizQuestions.map((q) => q.topic))];
}

export function getFilteredQuizQuestions(topics: string[], difficulty: string, count: number): QuizQuestion[] {
  let filtered = quizQuestions;
  if (topics.length > 0) filtered = filtered.filter((q) => topics.includes(q.topic));
  if (difficulty !== "ALL") filtered = filtered.filter((q) => q.difficulty === difficulty);
  // Shuffle and take count
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// ═══════════════════════════════════════════════════
// Guide Videos (for CSM 157)
// ═══════════════════════════════════════════════════

export const guideVideos: GuideVideo[] = [
  {
    id: "gv1",
    title: "Setting Up Python and VS Code",
    description: "Step-by-step guide to installing Python 3.12 and configuring Visual Studio Code for Python development on Windows and macOS.",
    videoUrl: "https://youtube.com/watch?v=example1",
    isEvergreen: true,
    isPlatformWide: true,
  },
  {
    id: "gv2",
    title: "Installing Git and GitHub Desktop",
    description: "Complete walkthrough of Git installation, SSH key setup, and using GitHub Desktop for version control in your projects.",
    videoUrl: "https://youtube.com/watch?v=example2",
    isEvergreen: true,
    isPlatformWide: true,
  },
  {
    id: "gv3",
    title: "Setting Up Jupyter Notebook",
    description: "How to install and run Jupyter Notebook for interactive Python coding, data exploration, and assignment submissions.",
    videoUrl: "https://youtube.com/watch?v=example3",
    isEvergreen: true,
    isPlatformWide: false,
  },
  {
    id: "gv4",
    title: "Using the Terminal / Command Line",
    description: "Essential terminal commands every CS student needs: navigation, file management, running Python scripts, and pip packages.",
    videoUrl: "https://youtube.com/watch?v=example4",
    isEvergreen: true,
    isPlatformWide: true,
  },
  {
    id: "gv5",
    title: "Debugging Python Code in VS Code",
    description: "Learn to use breakpoints, watch variables, and the debug console to find and fix bugs in your Python programs.",
    videoUrl: "https://youtube.com/watch?v=example5",
    isEvergreen: true,
    isPlatformWide: false,
  },
];

// ═══════════════════════════════════════════════════
// Course Breakdown (for CS 161)
// ═══════════════════════════════════════════════════

export const courseBreakdownData: CourseBreakdown = {
  overview: "CS 161 introduces the fundamentals of programming using Python. The course covers variables, control flow, functions, object-oriented programming, file handling, and basic data structures. Students build practical skills through weekly assignments culminating in a mini-project.",
  studyTips: [
    "Code every day — even 30 minutes of practice compounds over the semester",
    "Don't just read solutions — type them out yourself and modify them",
    "Use the practice questions bank to drill weak topics before exams",
    "Form study groups of 3-4 and solve passco papers under timed conditions",
    "Attend office hours — Dr. Asante's explanations unlock concepts faster than reading alone",
    "Start assignments early — the late-night submission rush leads to poor code quality",
  ],
  weeklyPlan: [
    { week: 1, topic: "Introduction to Python", focus: "Setup, syntax, print, comments" },
    { week: 2, topic: "Variables and Data Types", focus: "int, float, str, bool, type casting" },
    { week: 3, topic: "Control Flow", focus: "if/elif/else, logical operators" },
    { week: 4, topic: "Loops", focus: "for, while, break, continue, nested loops" },
    { week: 5, topic: "Functions", focus: "def, parameters, return, scope, lambda" },
    { week: 6, topic: "Lists and Tuples", focus: "Indexing, slicing, methods, comprehensions" },
    { week: 7, topic: "Dictionaries and Sets", focus: "Key-value pairs, set operations" },
    { week: 8, topic: "String Processing", focus: "Methods, formatting, regex basics" },
    { week: 9, topic: "File Handling", focus: "Reading, writing, CSV, context managers" },
    { week: 10, topic: "Exception Handling", focus: "try/except/else/finally, custom exceptions" },
    { week: 11, topic: "OOP Fundamentals", focus: "Classes, objects, __init__, methods" },
    { week: 12, topic: "OOP Advanced", focus: "Inheritance, polymorphism, encapsulation" },
    { week: 13, topic: "Modules and Packages", focus: "import, pip, virtual environments" },
    { week: 14, topic: "Review and Exam Prep", focus: "Past papers, common pitfalls, Q&A" },
  ],
  topicWeightings: [
    { topic: "OOP", weight: 25 },
    { topic: "Functions & Recursion", weight: 20 },
    { topic: "Data Structures (Lists, Dicts)", weight: 18 },
    { topic: "Control Flow & Loops", weight: 15 },
    { topic: "File Handling", weight: 10 },
    { topic: "Error Handling", weight: 7 },
    { topic: "Variables & Types", weight: 5 },
  ],
  recommendedBooks: [
    "Automate the Boring Stuff with Python — Al Sweigart (Free online)",
    "Python Crash Course — Eric Matthes",
    "Think Python — Allen B. Downey (Free online)",
    "Learning Python — Mark Lutz",
  ],
};

// ═══════════════════════════════════════════════════
// Lecture Breakdowns (for CS 161)
// ═══════════════════════════════════════════════════

export const lectureBreakdowns: LectureBreakdown[] = [
  {
    id: "lb1",
    lectureNumber: 1,
    title: "Welcome to Programming",
    weekNumber: 1,
    summary: "Course overview, assessment structure, and why Python. First program: Hello World. Setting up the development environment.",
    keyTopics: ["Course structure", "Python philosophy", "IDE setup", "Hello World"],
  },
  {
    id: "lb2",
    lectureNumber: 2,
    title: "Variables and Data Types",
    weekNumber: 2,
    summary: "Core data types in Python: integers, floats, strings, booleans. Variable naming conventions. Type conversion and type checking.",
    keyTopics: ["Variables", "int", "float", "str", "bool", "type()"],
    linkedSlideId: "sr1",
  },
  {
    id: "lb3",
    lectureNumber: 3,
    title: "Input, Output, and Operators",
    weekNumber: 2,
    summary: "Using input() for user interaction. Formatted string output with f-strings. Arithmetic, comparison, and logical operators.",
    keyTopics: ["input()", "print()", "f-strings", "Operators"],
    linkedSlideId: "sr2",
  },
  {
    id: "lb4",
    lectureNumber: 4,
    title: "Conditional Logic",
    weekNumber: 3,
    summary: "Decision making with if/elif/else. Nested conditions. Ternary expressions. Common patterns and pitfalls.",
    keyTopics: ["if/elif/else", "Conditions", "Boolean logic", "Ternary"],
    linkedSlideId: "sr3",
  },
  {
    id: "lb5",
    lectureNumber: 5,
    title: "Loops — Part 1",
    weekNumber: 4,
    summary: "For loops with range(). While loops. break and continue. Loop patterns: counting, accumulating, searching.",
    keyTopics: ["for loop", "while loop", "range()", "break", "continue"],
  },
  {
    id: "lb6",
    lectureNumber: 6,
    title: "Loops — Part 2 (Nested and Advanced)",
    weekNumber: 4,
    summary: "Nested loops for 2D patterns. Loop-else construct. enumerate() and zip(). Performance considerations.",
    keyTopics: ["Nested loops", "enumerate", "zip", "Loop-else"],
  },
  {
    id: "lb7",
    lectureNumber: 7,
    title: "Functions",
    weekNumber: 5,
    summary: "Defining and calling functions. Parameters and arguments. Return values. Scope and lifetime. Default and keyword arguments.",
    keyTopics: ["def", "Parameters", "Return", "Scope", "Arguments"],
    linkedSlideId: "sr4",
  },
  {
    id: "lb8",
    lectureNumber: 8,
    title: "Recursion",
    weekNumber: 6,
    summary: "Recursive thinking. Base cases and recursive cases. Factorial and Fibonacci. Stack frames and memory. When to use recursion vs iteration.",
    keyTopics: ["Recursion", "Base case", "Stack frames", "Fibonacci"],
  },
  {
    id: "lb9",
    lectureNumber: 9,
    title: "Lists and Tuples",
    weekNumber: 6,
    summary: "Creating and manipulating lists. List methods. Tuple immutability. List comprehensions. Slicing and indexing.",
    keyTopics: ["Lists", "Tuples", "Slicing", "Comprehensions", "Methods"],
  },
  {
    id: "lb10",
    lectureNumber: 10,
    title: "Dictionaries and Sets",
    weekNumber: 7,
    summary: "Key-value data storage. Dictionary methods. Set operations: union, intersection, difference. Choosing the right data structure.",
    keyTopics: ["dict", "set", "Key-value", "Set operations"],
  },
  {
    id: "lb11",
    lectureNumber: 11,
    title: "File Handling",
    weekNumber: 9,
    summary: "Reading and writing text files. Context managers (with statement). CSV file processing. Error handling during file operations.",
    keyTopics: ["open()", "read/write", "with", "CSV", "Context managers"],
  },
  {
    id: "lb12",
    lectureNumber: 12,
    title: "OOP — Classes and Objects",
    weekNumber: 11,
    summary: "Object-oriented paradigm. Class definition. __init__ constructor. Instance variables and methods. self keyword.",
    keyTopics: ["class", "__init__", "self", "Methods", "Objects"],
    linkedSlideId: "sr5",
  },
  {
    id: "lb13",
    lectureNumber: 13,
    title: "OOP — Inheritance and Polymorphism",
    weekNumber: 12,
    summary: "Class inheritance. Method overriding. super(). Polymorphism through duck typing. Abstract base classes.",
    keyTopics: ["Inheritance", "super()", "Polymorphism", "Override", "ABC"],
  },
  {
    id: "lb14",
    lectureNumber: 14,
    title: "Review and Exam Preparation",
    weekNumber: 14,
    summary: "Comprehensive course review. Past paper walkthrough. Common exam mistakes. Tips for time management during the exam.",
    keyTopics: ["Review", "Past papers", "Exam tips", "Common mistakes"],
  },
];

// ═══════════════════════════════════════════════════
// Slides & Resources (for CS 161)
// ═══════════════════════════════════════════════════

export const slideResources: SlideResource[] = [
  {
    id: "sr1",
    title: "Week 2 — Variables and Data Types",
    description: "Core Python data types, variable assignment, and type conversion.",
    fileUrl: "/slides/cs161-week2.pdf",
    fileType: "pdf",
    priority: null,
    weekNumber: 2,
  },
  {
    id: "sr2",
    title: "Week 2 — Input, Output, and Operators",
    description: "User input handling, formatted output, and Python operators.",
    fileUrl: "/slides/cs161-week2b.pdf",
    fileType: "pdf",
    priority: null,
    weekNumber: 2,
  },
  {
    id: "sr3",
    title: "Week 3 — Conditional Logic",
    description: "Decision making with if/elif/else and boolean expressions.",
    fileUrl: "/slides/cs161-week3.pdf",
    fileType: "pdf",
    priority: "MEDIUM",
    weekNumber: 3,
  },
  {
    id: "sr4",
    title: "Week 5 — Functions Deep Dive",
    description: "Function definitions, scope, closures, and decorators.",
    fileUrl: "/slides/cs161-week5.pdf",
    fileType: "pdf",
    priority: "HIGH",
    weekNumber: 5,
  },
  {
    id: "sr5",
    title: "Week 11 — OOP Fundamentals",
    description: "Classes, objects, constructors, and the self keyword.",
    fileUrl: "/slides/cs161-week11.pdf",
    fileType: "pdf",
    priority: "HIGH",
    weekNumber: 11,
  },
  {
    id: "sr6",
    title: "Python Cheat Sheet",
    description: "Quick reference for Python syntax, built-in functions, and common patterns.",
    fileUrl: "/slides/python-cheatsheet.pdf",
    fileType: "pdf",
    priority: "HIGH",
  },
  {
    id: "sr7",
    title: "OOP Class Diagram Reference",
    description: "Visual reference for class relationships and UML notation.",
    fileUrl: "/slides/oop-diagrams.pdf",
    fileType: "image",
    priority: "MEDIUM",
    weekNumber: 11,
  },
];

// ═══════════════════════════════════════════════════
// Cross-Program Discovery
// ═══════════════════════════════════════════════════

export const disciplinePrograms: DisciplineProgram[] = [
  {
    school: schools[0],
    program: programs[0],
    courseCount: courses.filter((c) => c.programId === "p1").length,
    passcoCount: 35,
    questionCount: 87,
  },
  {
    school: schools[1],
    program: programs[1],
    courseCount: 4,
    passcoCount: 28,
    questionCount: 64,
  },
  {
    school: schools[2],
    program: programs[3],
    courseCount: 3,
    passcoCount: 15,
    questionCount: 32,
  },
];

// ═══════════════════════════════════════════════════
// Lookup helpers
// ═══════════════════════════════════════════════════

export function getSchoolBySlug(slug: string): School | undefined {
  return schools.find((s) => s.slug === slug);
}

export function getProgramsBySchool(schoolId: string): Program[] {
  return programs.filter((p) => p.schoolId === schoolId);
}

export function getYearsByProgram(programId: string): AcademicYear[] {
  return academicYears.filter((y) => y.programId === programId);
}

export function getCoursesByYear(yearId: string): Course[] {
  return courses.filter((c) => c.academicYearId === yearId);
}

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

/** Group courses by year level (1-4), each with semesters */
export function getCoursesByYearLevel(): { yearLevel: number; sem1: Course[]; sem2: Course[] }[] {
  const levels = [1, 2, 3, 4];
  return levels.map((yearLevel) => ({
    yearLevel,
    sem1: courses.filter((c) => c.yearLevel === yearLevel && c.semester === 1),
    sem2: courses.filter((c) => c.yearLevel === yearLevel && c.semester === 2),
  }));
}

export function getAssignmentById(id: string): Assignment | undefined {
  return assignments.find((a) => a.id === id);
}

export function getPasscoPaperById(id: string): PasscoPaper | undefined {
  return passcoPapers.find((p) => p.id === id);
}

export function getVerifiedQuestionById(id: string): VerifiedQuestion | undefined {
  return verifiedQuestions.find((q) => q.id === id);
}

export function getPracticeQuestionById(id: string): PracticeQuestion | undefined {
  return practiceQuestions.find((q) => q.id === id);
}

