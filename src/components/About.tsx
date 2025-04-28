import React from 'react';
import { 
  Lightbulb, 
  Target, 
  Users, 
  Globe, 
  Award, 
  BookOpen,
  ArrowRight,
  Download,
  Play,
  Briefcase,
  GraduationCap,
  Clock,
  Building,
  Heart
} from 'lucide-react';

export function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] bg-gray-900">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80"
            alt="Diverse group of Black students engaged in collaborative learning in a modern tech environment"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              About FolioTech Institute
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              Empowering Nigeria's Next Generation of Tech Professionals
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-3 space-y-12">
            {/* Introduction */}
            <section className="prose lg:prose-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Shaping the Future of Tech Education</h2>
              <p className="text-gray-600 leading-relaxed">
                We are a leading-edge educational institution dedicated to empowering the next generation of 
                technical professionals. As a higher-level vocational training center, we usher in a new era 
                of functional education designed for individuals looking to transition or re-orient themselves 
                into technology.
              </p>
            </section>

            {/* Mission Statement */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <div className="bg-blue-50 rounded-lg p-6 space-y-4">
                <ul className="space-y-3">
                  {[
                    'Assist young Nigerians in developing practical technical and vocational skills for ready employment in the industrial sector.',
                    'Provide opportunities for unemployed graduates to re-tool their technical skills or transition into new careers.',
                    'Offer learning paths for employed individuals seeking a career change.',
                    'Upgrade the competence of technicians to perform at higher levels, including supervisory roles in various industrial applications.'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center mt-1">
                        <span className="text-white text-sm">{index + 1}</span>
                      </div>
                      <p className="ml-4 text-gray-800">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* What Sets Us Apart */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What Sets Us Apart</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: Users,
                    title: "Industry-Expert Instructors",
                    description: "Learn from professionals with real-world experience"
                  },
                  {
                    icon: BookOpen,
                    title: "Cutting-Edge Curriculum",
                    description: "Stay ahead with programs that evolve alongside technology trends"
                  },
                  {
                    icon: Briefcase,
                    title: "Hands-On Projects",
                    description: "Gain practical experience through immersive projects and internships"
                  },
                  {
                    icon: Clock,
                    title: "Flexible Learning Options",
                    description: "Choose from online, in-person, or hybrid models to suit your schedule"
                  },
                  {
                    icon: Building,
                    title: "Strong Industry Partnerships",
                    description: "Benefit from job placement opportunities with leading technology companies"
                  }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={index}
                      className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <Icon className="h-8 w-8 text-blue-600 mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Core Values */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Values</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { icon: Lightbulb, value: "Innovation", description: "Embracing emerging technologies and teaching methodologies" },
                  { icon: Heart, value: "Inclusivity", description: "Ensuring equal opportunities for all learners" },
                  { icon: Award, value: "Excellence", description: "Committing to the highest standards in education" },
                  { icon: Users, value: "Collaboration", description: "Building a supportive learning community" },
                  { icon: Target, value: "Integrity", description: "Upholding ethical practices in all interactions" }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={index}
                      className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <Icon className="h-8 w-8 text-blue-600 mb-3" />
                      <span className="font-semibold text-gray-900 mb-2">{item.value}</span>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-2 space-y-8">
            {/* Virtual Tour */}
            <div className="bg-gray-900 rounded-lg p-6 text-white text-center">
              <h3 className="text-xl font-semibold mb-4">Take a Virtual Tour</h3>
              <div className="relative rounded-lg overflow-hidden mb-4">
                <img
                  src="https://images.unsplash.com/photo-1612831455359-970e23a1e4e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                  alt="Black students engaged in a tech workshop session"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Play className="h-12 w-12 text-white" />
                </div>
              </div>
              <button className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-3 transition-colors">
                <Play className="h-5 w-5 mr-2" />
                Start Tour
              </button>
            </div>

            {/* CTA Card */}
            <div className="bg-blue-50 rounded-lg p-6 sticky top-24">
              <div className="mb-6">
                <img
                  src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                  alt="Black tech professional in a modern office environment"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Start Your Journey</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-3 transition-colors flex items-center justify-center"
                >
                  Start Your Tech Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <a
                  href="#programs"
                  className="block text-center text-blue-600 hover:text-blue-700 font-medium mt-4"
                >
                  <GraduationCap className="inline-block h-4 w-4 mr-1" />
                  Explore Our Programs
                </a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}