"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Clock,
    Users,
    Award,
    Coffee,
    MapPin,
    Phone,
    Mail,
    CheckCircle,
    ArrowRight,
    BookOpen,
    Zap,
    Heart,
    CalendarDays,
    DollarSign,
} from "lucide-react"
import { AnimateOnScroll } from "@/components/animate-on-scroll"

export default function TrainingPage() {
    const course = {
        id: "professional-barista-training",
        title: "21-Day Professional Barista Training",
        tagline: "Nepal’s Most Practical & Career-Focused Coffee Program",
        description:
            "Designed for aspiring baristas, cafe entrepreneurs, and hospitality professionals, this course will take you from foundational knowledge to hands-on cafe-level skills with a guaranteed internship placement at the end of the course. Learn. Practice. Serve. Get job-ready for Nepal’s rapidly expanding specialty coffee scene.",
        image: "https://i.ibb.co/vvgp0D4J/Untitled-design-5.png",
        price: "NPR. 18,000",
        courseFeeDetails: "Includes all materials, equipment use, and internship facilitation",
        duration: "21 Days",
        timePerDay: "2 hours/day",
        internshipDuration: "1–2 weeks after training",
        whoShouldJoin: [
            "Individuals aiming to become professional baristas",
            "Entrepreneurs starting or managing cafes",
            "Hotel & restaurant staff seeking upskilling",
            "Students and coffee enthusiasts exploring career options",
            "Anyone serious about mastering coffee preparation and service",
        ],
        learnWeeks: [
            {
                week: "Week 1",
                title: "Fundamentals of Coffee & Espresso Skills",
                topics: [
                    "Coffee history, origin & global varieties",
                    "Coffee processing and quality grading",
                    "Introduction to cafe equipment and espresso machines",
                    "Grinder calibration and espresso extraction techniques",
                    "Understanding dose, yield, brew ratio and taste balance",
                ],
            },
            {
                week: "Week 2",
                title: "Brewing Methods & Milk Texturing",
                topics: [
                    "Steaming milk for cappuccino, latte & flat white",
                    "Microfoam techniques and beginner latte art",
                    "Manual brewing: V60, French Press, Chemex, AeroPress",
                    "Coffee tasting (cupping) and sensory evaluation",
                    "Daily practice with structured feedback",
                ],
            },
            {
                week: "Week 3",
                title: "Bar Workflow, Cafe Readiness & Professionalism",
                topics: [
                    "Real-time cafe workflow training",
                    "Hygiene, station setup and time management",
                    "Customer interaction, order flow & communication",
                    "Menu development basics, recipe consistency",
                    "Mock cafe simulation & final evaluation",
                ],
            },
        ],
        internshipOpportunity: {
            description:
                "After completion of the course, all participants will be placed in a 1 to 2-week internship at a partner cafe to experience the pace and pressure of a real service environment.",
            benefits: [
                "Real cafe experience under supervision",
                "Confidence working with customers",
                "Professional discipline and speed",
            ],
            note: "Internship partners are selected based on performance and cafe availability.",
        },
        certification: {
            title: "Professional Barista Certificate",
            details:
                "Includes performance assessment, written test, and practical skill evaluation recognized by cafes across Nepal.",
        },
        whyTrainWithUs: [
            "International-standard equipment & updated curriculum",
            "Experienced trainers with real cafe background",
            "Internship placement for practical exposure",
            "Career guidance for cafe jobs & entrepreneurship",
            "Supportive learning with focus on discipline, not theory alone",
        ],
    }

    const instructors = [
        {
            name: "Maria Rodriguez",
            title: "Head Coffee Trainer",
            experience: "15+ years",
            certifications: ["SCA Certified", "Q Grader", "Barista Champion"],
            image: "/placeholder.svg?height=128&width=128",
            specialties: ["Espresso", "Latte Art", "Training"],
        },
        {
            name: "James Chen",
            title: "Roasting Specialist",
            experience: "12+ years",
            certifications: ["Master Roaster", "SCA Roasting Professional"],
            image: "/placeholder.svg?height=128&width=128",
            specialties: ["Roasting", "Cupping", "Quality Control"],
        },
        {
            name: "Sarah Johnson",
            title: "Brewing Expert",
            experience: "10+ years",
            certifications: ["SCA Brewing Professional", "Coffee Sommelier"],
            image: "/placeholder.svg?height=128&width=128",
            specialties: ["Pour-over", "Cold Brew", "Coffee Science"],
        },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative py-24 lg:py-32 overflow-hidden  text-white">
                <div className="absolute inset-0">
                    <Image
                        src="https://i.ibb.co/vvgp0D4J/Untitled-design-5.png"
                        alt="Coffee training background"
                        fill
                        className="object-cover "
                    />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl">
                    
                    <h1 className="text-5xl lg:text-7xl font-extrabold mb-4 leading-tight tracking-tight">☕ PROFESSIONAL COFFEE TRAINING</h1>
                    
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/contact">
                            <Button
                                size="lg"
                                className="bg-white text-amber-900 hover:bg-amber-50 font-semibold px-10 py-4 text-lg rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                            >
                                <Phone className="mr-2 h-5 w-5" />
                                Contact for Enrollment
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-2 border-white text-white hover:bg-white hover:text-amber-900 font-semibold px-10 py-4 text-lg bg-transparent rounded-full transition-all duration-300"
                            onClick={() => document.getElementById("course-details")?.scrollIntoView({ behavior: "smooth" })}
                        >
                            <BookOpen className="mr-2 h-5 w-5" />
                            View Course Details
                        </Button>
                    </div>
                </div>
            </section>
            <AnimateOnScroll animationType="fade-up">
            {/* Key Highlights Section */}
            <section className="py-16 bg-white shadow-inner">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        <div className="flex flex-col items-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                            <Clock className="w-10 h-10 text-amber-600 mb-3" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">Duration</h3>
                            <p className="text-gray-600 text-lg">{course.duration}</p>
                        </div>
                        <div className="flex flex-col items-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                            <CalendarDays className="w-10 h-10 text-blue-600 mb-3" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">Daily Time</h3>
                            <p className="text-gray-600 text-lg">{course.timePerDay}</p>
                        </div>
                        <div className="flex flex-col items-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                            <Users className="w-10 h-10 text-green-600 mb-3" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">Internship</h3>
                            <p className="text-gray-600 text-lg">{course.internshipDuration}</p>
                        </div>
                        <div className="flex flex-col items-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                            <DollarSign className="w-10 h-10 text-purple-600 mb-3" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">Course Fee</h3>
                            <p className="text-gray-600 text-lg">{course.price}</p>
                        </div>
                    </div>
                </div>
            </section>
            </AnimateOnScroll>
            {/* Who Should Join Section */}
            <AnimateOnScroll animationType="fade-up">
            <section className="py-24 bg-white" id="who-should-join">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <Badge className="mb-6 bg-blue-500 text-white hover:bg-blue-600 text-lg px-6 py-3 rounded-full shadow-md">
                            🎯 WHO SHOULD JOIN?
                        </Badge>
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Is This Program Right For You?</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            This comprehensive training is ideal for a diverse range of individuals passionate about coffee.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {course.whoShouldJoin.map((item, index) => (
                            <Card
                                key={index}
                                className="p-6 flex items-start gap-4 bg-gray-50 border-l-4 border-blue-500 shadow-sm hover:shadow-md transition-shadow duration-300"
                            >
                                <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                                <p className="text-lg text-gray-700 font-medium">{item}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </AnimateOnScroll>
            {/* What You'll Learn Section */}
            <AnimateOnScroll animationType="fade-up">
            <section className="py-24 bg-gray-100" id="what-youll-learn">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <Badge className="mb-6 bg-green-500 text-white hover:bg-green-600 text-lg px-6 py-3 rounded-full shadow-md">
                            📚 WHAT YOU'LL LEARN
                        </Badge>
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Comprehensive Curriculum</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Our 21-day program is structured into three intensive weeks, building your skills from foundational to
                            advanced.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {course.learnWeeks.map((weekData, weekIndex) => (
                            <Card
                                key={weekIndex}
                                className="p-8 bg-white shadow-lg border-t-4 border-amber-500 hover:shadow-xl transition-shadow duration-300"
                            >
                                <CardHeader className="p-0 mb-6">
                                    <Badge className="bg-amber-100 text-amber-800 text-sm px-4 py-2 rounded-full mb-3">
                                        {weekData.week}
                                    </Badge>
                                    <CardTitle className="text-2xl font-bold text-gray-900">{weekData.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <ul className="list-none p-0 space-y-3">
                                        {weekData.topics.map((topic, topicIndex) => (
                                            <li key={topicIndex} className="flex items-start gap-3 text-base text-gray-700">
                                                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                                                <span>{topic}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
            </AnimateOnScroll>
            {/* Internship & Certification Section */}
            <AnimateOnScroll animationType="fade-up">
            <section className="py-24 bg-white" id="internship-certification">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Internship */}
                        <div>
                            <Badge className="mb-6 bg-purple-500 text-white hover:bg-purple-600 text-lg px-6 py-3 rounded-full shadow-md">
                                🚀 INTERNSHIP OPPORTUNITY
                            </Badge>
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Gain Real-World Experience</h2>
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">{course.internshipOpportunity.description}</p>
                            <ul className="list-none p-0 space-y-4 mb-8">
                                {course.internshipOpportunity.benefits.map((benefit, index) => (
                                    <li key={index} className="flex items-start gap-4 text-lg text-gray-700">
                                        <CheckCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-base text-gray-500 italic">{course.internshipOpportunity.note}</p>
                        </div>

                        {/* Certification */}
                        <div>
                            <Badge className="mb-6 bg-red-500 text-white hover:bg-red-600 text-lg px-6 py-3 rounded-full shadow-md">
                                🏆 CERTIFICATION
                            </Badge>
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Professional Recognition</h2>
                            <Card className="p-8 bg-gray-50 shadow-lg border-l-4 border-red-500">
                                <CardTitle className="text-2xl font-bold text-gray-900 mb-3">{course.certification.title}</CardTitle>
                                <CardDescription className="text-lg text-gray-700 leading-relaxed">
                                    {course.certification.details}
                                </CardDescription>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
            </AnimateOnScroll>
            {/* Why Train With Us Section */}
            <AnimateOnScroll animationType="fade-up">
            <section className="py-24 bg-gray-100" id="why-train-with-us">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <Badge className="mb-6 bg-orange-500 text-white hover:bg-orange-600 text-lg px-6 py-3 rounded-full shadow-md">
                            🌟 WHY CHOOSE KKS GROUP?
                        </Badge>
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Unmatched Training Experience</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            We are committed to providing the highest quality coffee education in Nepal.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {course.whyTrainWithUs.map((reason, index) => (
                            <Card
                                key={index}
                                className="p-6 flex items-start gap-4 bg-white border-l-4 border-orange-500 shadow-sm hover:shadow-md transition-shadow duration-300"
                            >
                                <CheckCircle className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
                                <p className="text-lg text-gray-700 font-medium">{reason}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
            </AnimateOnScroll>
            {/* Instructors Section */}
            <AnimateOnScroll animationType="fade-up">
            <section className="py-24 bg-white" id="instructors">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <Badge className="mb-6 bg-blue-500 text-white hover:bg-blue-600 text-lg px-6 py-3 rounded-full shadow-md">
                            👨‍🏫 EXPERT INSTRUCTORS
                        </Badge>
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Meet Our Expert Instructors</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Learn from industry professionals with years of experience and internationally recognized certifications.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {instructors.map((instructor, index) => (
                            <Card
                                key={index}
                                className="group text-center hover:shadow-xl transition-all duration-300 bg-white border border-gray-100 rounded-xl overflow-hidden"
                            >
                                <CardContent className="p-8">
                                    <div className="relative mb-8">
                                        <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-amber-200 group-hover:border-amber-400 transition-colors duration-300">
                                            <Image
                                                src={instructor.image || "/placeholder.svg"}
                                                alt={instructor.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 px-4 py-2 shadow-lg text-sm">
                                            {instructor.experience}
                                        </Badge>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{instructor.name}</h3>
                                    <p className="text-amber-600 font-semibold mb-6 text-lg">{instructor.title}</p>
                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center justify-center gap-2">
                                                <Award className="h-4 w-4 text-amber-600" />
                                                Certifications:
                                            </h4>
                                            <div className="flex flex-wrap gap-2 justify-center">
                                                {instructor.certifications.map((cert, certIndex) => (
                                                    <Badge
                                                        key={certIndex}
                                                        variant="outline"
                                                        className="text-xs border-amber-200 text-amber-700 hover:bg-amber-50 transition-colors duration-300"
                                                    >
                                                        {cert}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center justify-center gap-2">
                                                <Coffee className="h-4 w-4 text-blue-600" />
                                                Specialties:
                                            </h4>
                                            <div className="flex flex-wrap gap-2 justify-center">
                                                {instructor.specialties.map((specialty, specIndex) => (
                                                    <Badge
                                                        key={specIndex}
                                                        className="bg-blue-100 text-blue-800 border-blue-200 text-xs hover:bg-blue-200 transition-colors duration-300"
                                                    >
                                                        {specialty}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
            </AnimateOnScroll>
            {/* Training Center Info */}
            <AnimateOnScroll animationType="fade-up">
            <section className="py-24 bg-gradient-to-br from-gray-50 to-white" id="facility">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <Badge className="mb-6 bg-green-500 text-white hover:bg-green-600 text-lg px-6 py-3 rounded-full shadow-md">
                                🏢 TRAINING FACILITY
                            </Badge>
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                                State-of-the-Art
                                <span className="block text-green-600">Training Facility</span>
                            </h2>
                            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                                Our modern training center is equipped with professional-grade coffee equipment and comfortable learning
                                spaces designed to provide the best educational experience.
                            </p>
                            <div className="space-y-8">
                                <div className="flex items-start gap-6 p-6 bg-white rounded-2xl shadow-lg border-l-4 border-amber-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                    <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                                        <Zap className="h-8 w-8 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Equipment</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            Train on the same equipment used in top coffee shops worldwide, including commercial espresso
                                            machines and precision grinders.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-6 p-6 bg-white rounded-2xl shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                                        <Users className="h-8 w-8 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Small Class Sizes</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            Limited class sizes ensure personalized attention and hands-on practice for every student.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-6 p-6 bg-white rounded-2xl shadow-lg border-l-4 border-green-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                                        <Award className="h-8 w-8 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Industry Certification</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            Receive industry-recognized certificates upon successful completion of our training programs.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl blur-lg opacity-20"></div>
                                <Image
                                    src="https://i.ibb.co/spJZrFQg/gregory-hayes-Jmc0-PORTQ-A-unsplash.jpg"
                                    alt="Training Center"
                                    width={700}
                                    height={500}
                                    className="rounded-3xl shadow-2xl w-full object-cover relative z-10 transition-transform duration-500 hover:scale-105"
                                />
                                <div className="absolute bottom-8 left-8 bg-white p-6 rounded-xl shadow-lg z-20">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="font-semibold text-gray-900">Live Training Sessions</span>
                                    </div>
                                    <p className="text-gray-600">Professional Equipment Available</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </AnimateOnScroll>
            
        </div>
    )
}
