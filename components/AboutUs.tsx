import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  Trophy,
  Target,
  Users,
  Heart,
  BookOpen,
  Video,
  Brain,
  Calendar,
  Award,
  Star,
  Globe,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function AboutUs() {
  const features = [
    {
      icon: Video,
      title: "Video Pelajaran Ahli",
      description:
        "Belajar dari grandmaster dan pelatih internasional melalui konten video berkualitas tinggi",
      color: "text-blue-600 bg-blue-50",
    },
    {
      icon: BookOpen,
      title: "E-Book Interaktif",
      description:
        "Belajar dengan e-book komprehensif kami yang dilengkapi puzzle, kuis, dan penjelasan detail",
      color: "text-purple-600 bg-purple-50",
    },
    {
      icon: Calendar,
      title: "Kelas Virtual",
      description:
        "Pesan sesi one-on-one dengan pelatih profesional yang disesuaikan dengan level keahlian Anda",
      color: "text-green-600 bg-green-50",
    },
    {
      icon: Brain,
      title: "Pelatihan Berbasis AI",
      description:
        "Berlatih dengan pelatih AI cerdas kami yang menganalisis permainan dan menyarankan perbaikan",
      color: "text-pink-600 bg-pink-50",
    },
    {
      icon: Target,
      title: "Puzzle Catur",
      description:
        "Selesaikan puzzle taktis yang terintegrasi dalam kursus kami untuk mengasah keterampilan Anda",
      color: "text-orange-600 bg-orange-50",
    },
    {
      icon: Award,
      title: "Pelacakan Kemajuan",
      description:
        "Pantau peningkatan Anda dengan kuis, lencana penyelesaian, dan analisis performa",
      color: "text-indigo-600 bg-indigo-50",
    },
  ];

  const team = [
    {
      name: "Grandmaster Daniel Wijaya",
      role: "Founder & Head Coach",
      rating: "FIDE 2650",
      bio: "International Grandmaster with 20+ years of coaching experience",
      initial: "DW",
    },
    {
      name: "Dipta Pariandika",
      role: "Youth Program Lead",
      rating: "-",
      bio: "International Master specializing in opening theory and tactics",
      initial: "WDP",
    },
    {
      name: "Muhamad Arsyah Albasam",
      role: "Youth Program Lead",
      rating: "-",
      bio: 'FIDE Master and author of "Mastering Chess Endgames"',
      initial: "MA",
    },
    {
      name: "Jason Nicholas Winata",
      role: "Youth Program Lead",
      rating: "-",
      bio: "Specialized in teaching chess to children and beginners",
      initial: "JN",
    },
    {
      name: "Angelina Salim",
      role: "Youth Program Lead",
      rating: "-",
      bio: "Specialized in teaching chess to children and beginners",
      initial: "AS",
    },
  ];

  const testimonials = [
    {
      name: "Emma Wilson",
      age: 12,
      rating: "1400 → 1800",
      text: "LesCatur luar biasa! Puzzle-nya menyenangkan dan pelatih AI membantu saya memahami kesalahan saya. Rating saya meningkat 400 poin dalam 6 bulan!",
      stars: 5,
    },
    {
      name: "Lucas Brown",
      age: 15,
      rating: "1800 → 2100",
      text: "Kelas virtual-nya sangat membantu. Pelatih saya sabar dan menjelaskan semuanya dengan jelas. Sangat direkomendasikan!",
      stars: 5,
    },
    {
      name: "Sofia Martinez",
      age: 10,
      rating: "Pemula → 1200",
      text: "Saya suka e-book interaktifnya! Kuis-nya membuat belajar jadi menyenangkan dan saya bisa berlatih sesuai kecepatan saya sendiri.",
      stars: 5,
    },
  ];

  const stats = [
    { icon: Users, value: "10,000+", label: "Siswa Aktif" },
    { icon: Trophy, value: "500+", label: "Juara Turnamen" },
    { icon: BookOpen, value: "100+", label: "Kursus & E-Book" },
    { icon: Globe, value: "50+", label: "Negara" },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-8 md:p-12 border-2 border-blue-200">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="inline-block">
              <Badge className="bg-blue-600 text-white px-4 py-2 text-sm">
                Tentang Kami
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Selamat Datang di{" "}
              <span className="text-blue-600">LesCatur</span>
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              Kami memiliki misi untuk membuat pendidikan catur
              dapat diakses, menarik, dan efektif untuk pelajar
              dari segala usia. Dari pemula yang baru mulai
              hingga pemain tingkat lanjut yang mengejar
              penguasaan, kami menyediakan alat dan bimbingan
              yang Anda butuhkan untuk sukses.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <Heart className="w-5 h-5 text-red-500" />
                <span className="font-semibold">
                  Didirikan tahun 2023
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold">
                  Rating 4.9/5
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1529699211952-734e80c4d42b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
              alt="Chess pieces"
              className="rounded-2xl shadow-2xl max-w-md w-full"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="text-center hover:shadow-lg transition-shadow"
          >
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">
                {stat.label}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mission Section */}
      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl">
              Misi Kami
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Di LesCatur, kami percaya bahwa catur lebih dari
            sekedar permainan—ini adalah alat untuk
            mengembangkan pemikiran kritis, perencanaan
            strategis, dan keterampilan pemecahan masalah yang
            bermanfaat untuk semua aspek kehidupan. Misi kami
            adalah menciptakan lingkungan belajar yang mendukung
            dan menarik dimana siswa dapat:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-gray-700">
                Membangun kepercayaan diri melalui pembelajaran
                terstruktur dan kemajuan yang terukur
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-gray-700">
                Belajar dari instruktur kelas dunia dan
                pelatihan berbasis AI
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-gray-700">
                Berlatih dengan puzzle interaktif dan umpan
                balik real-time
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-gray-700">
                Terhubung dengan komunitas penggemar catur
                global
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* What We Offer */}
      <div>
        <h2 className="text-3xl font-bold mb-6 text-center">
          Apa yang Kami Tawarkan
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <CardHeader>
                <div
                  className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-3`}
                >
                  <feature.icon
                    className={`w-7 h-7 ${feature.color.split(" ")[0]}`}
                  />
                </div>
                <CardTitle className="text-lg">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Meet Our Team */}
      <div>
        <h2 className="text-3xl font-bold mb-2 text-center">
          Kenali Tim Ahli Kami
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Belajar dari profesional catur berpengalaman yang
          berdedikasi untuk kesuksesan Anda
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-xl transition-shadow"
            >
              <CardHeader>
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                    {member.initial}
                  </div>
                  <AvatarFallback>
                    {member.initial}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg">
                  {member.name}
                </CardTitle>
                <div className="space-y-1 mt-2">
                  <CardDescription className="text-purple-600 font-semibold">
                    {member.role}
                  </CardDescription>
                  <Badge
                    variant="outline"
                    className="bg-yellow-50 text-yellow-700 border-yellow-300"
                  >
                    {member.rating}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  {member.bio}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 border-2 border-blue-200">
        <h2 className="text-3xl font-bold mb-2 text-center">
          Kisah Sukses Siswa
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Dengarkan cerita dari siswa kami yang telah mengubah
          permainan catur mereka
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-12 h-12">
                    <div className="w-full h-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <AvatarFallback>
                      {testimonial.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      Usia {testimonial.age}
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 mb-2">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-300"
                >
                  Rating: {testimonial.rating}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 italic">
                  "{testimonial.text}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <Card className="border-2 border-blue-200">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            Get in Touch
          </CardTitle>
          <CardDescription>
            Have questions? We'd love to hear from you!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center gap-3 p-4 rounded-lg bg-blue-50">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-semibold mb-1">
                  Email Us
                </div>
                <a
                  href="mailto:lescaturindonesia@gmail.com"
                  className="text-blue-600 hover:underline text-sm"
                >
                  lescaturindonesia@gmail.com
                </a>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-3 p-4 rounded-lg bg-purple-50">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-semibold mb-1">
                  Call Us
                </div>
                <a
                  href="tel:+62 813-3888-3274"
                  className="text-purple-600 hover:underline text-sm"
                >
                  +62 813-3888-3274
                </a>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-3 p-4 rounded-lg bg-green-50">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-semibold mb-1">
                  Visit Us
                </div>
                <p className="text-gray-600 text-sm">
                  Rumah Talenta BCA
                  <br />
                  Sentul city, Bogor
                  <br />
                  Indonesia
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Values */}
      <div className="text-center bg-gradient-to-r from-purple-50 to-blue-50 rounded-3xl p-8 border-2 border-purple-200">
        <h2 className="text-3xl font-bold mb-6">
          Our Core Values
        </h2>
        <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="space-y-2">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold">Excellence</h3>
            <p className="text-sm text-gray-600">
              Striving for the highest standards in education
            </p>
          </div>
          <div className="space-y-2">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold">Passion</h3>
            <p className="text-sm text-gray-600">
              Loving the game and inspiring others
            </p>
          </div>
          <div className="space-y-2">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold">Community</h3>
            <p className="text-sm text-gray-600">
              Building connections and supporting growth
            </p>
          </div>
          <div className="space-y-2">
            <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold">Innovation</h3>
            <p className="text-sm text-gray-600">
              Embracing new teaching methods and technology
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}