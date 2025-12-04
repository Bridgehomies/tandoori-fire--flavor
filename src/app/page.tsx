"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Clock,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Flame,
  UtensilsCrossed,
  Calendar,
  Users,
  ShoppingBag,
  Quote,
} from "lucide-react";
import { FlamesCursor } from "@/components/interactive/FlamesCursor";
import { SpiceMeter } from "@/components/interactive/SpiceMeter";
import { MagneticButton } from "@/components/interactive/MagneticButton";
import { InteractiveEmbers } from "@/components/interactive/InteractiveEmbers";
import { TiltCard } from "@/components/interactive/TiltCard";

// Image URLs
const IMAGES = {
  hero: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ddde9e97-4b67-48c0-bf0c-054f428569ad/generated_images/mouth-watering-tandoori-chicken-fresh-fr-772b6a58-20251204122927.jpg",
  chef: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ddde9e97-4b67-48c0-bf0c-054f428569ad/generated_images/professional-indian-chef-in-white-unifor-750e27c7-20251204122928.jpg",
  ambiance: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ddde9e97-4b67-48c0-bf0c-054f428569ad/generated_images/luxurious-indian-restaurant-interior-war-a2908407-20251204122928.jpg",
  platter: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ddde9e97-4b67-48c0-bf0c-054f428569ad/generated_images/assorted-tandoori-dishes-platter-featuri-f28b4125-20251204122927.jpg",
  lambChops: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ddde9e97-4b67-48c0-bf0c-054f428569ad/generated_images/sizzling-tandoori-lamb-chops-on-cast-iro-725243c0-20251204122927.jpg",
};

// Menu items data
const menuItems = [
  {
    id: 1,
    name: "Tandoori Chicken",
    description: "Classic marinated chicken roasted in clay oven with aromatic spices",
    price: 18.99,
    image: IMAGES.hero,
    category: "Signature",
    spiceLevel: 2,
  },
  {
    id: 2,
    name: "Lamb Seekh Kebab",
    description: "Minced lamb skewers with fresh herbs and traditional spices",
    price: 22.99,
    image: IMAGES.lambChops,
    category: "Kebabs",
    spiceLevel: 3,
  },
  {
    id: 3,
    name: "Paneer Tikka",
    description: "Cottage cheese cubes marinated in spiced yogurt, char-grilled",
    price: 16.99,
    image: IMAGES.platter,
    category: "Vegetarian",
    spiceLevel: 1,
  },
  {
    id: 4,
    name: "Mixed Grill Platter",
    description: "Chef's selection of tandoori chicken, lamb, and prawns",
    price: 34.99,
    image: IMAGES.platter,
    category: "Signature",
    spiceLevel: 2,
  },
];

// Reviews data
const reviews = [
  {
    id: 1,
    name: "Sarah Mitchell",
    rating: 5,
    comment: "The most authentic tandoori I've had outside of India. The flavors are incredible and the ambiance is perfect for a special dinner.",
    date: "2 weeks ago",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    name: "James Chen",
    rating: 5,
    comment: "Outstanding experience! The lamb chops were cooked to perfection. Will definitely be coming back.",
    date: "1 month ago",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    name: "Priya Sharma",
    rating: 5,
    comment: "Finally found a place that reminds me of home. The spices are perfectly balanced and the naan is heavenly.",
    date: "3 weeks ago",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  },
  {
    id: 4,
    name: "Michael Roberts",
    rating: 5,
    comment: "A culinary journey through the best of Indian cuisine. The chef's special menu is a must-try!",
    date: "1 week ago",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  },
];

// Ambiance gallery
const ambianceImages = [
  { id: 1, src: IMAGES.ambiance, alt: "Restaurant Interior" },
  { id: 2, src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop", alt: "Dining Area" },
  { id: 3, src: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=600&fit=crop", alt: "Bar Area" },
  { id: 4, src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop", alt: "Private Dining" },
];

// Navigation Component
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#menu", label: "Menu" },
    { href: "#chef", label: "Our Chef" },
    { href: "#ambiance", label: "Ambiance" },
    { href: "#reservations", label: "Reservations" },
    { href: "#reviews", label: "Reviews" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#1a1412]/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <Flame className="w-8 h-8 text-[#c44536]" />
            <span className="text-2xl font-bold font-serif text-[#faf5f0]">
              Tandoor <span className="text-[#d4a574]">Flames</span>
            </span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                whileHover={{ y: -2 }}
                className="text-[#faf5f0] hover:text-[#d4a574] transition-colors font-medium"
              >
                {link.label}
              </motion.a>
            ))}
            <Button className="bg-[#c44536] hover:bg-[#e85d04] text-white">
              Order Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#faf5f0] p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`h-0.5 bg-current transform transition-all ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`h-0.5 bg-current transition-opacity ${isMobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 bg-current transform transition-all ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#1a1412]/95 backdrop-blur-md"
            >
              <div className="px-4 py-6 space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block text-[#faf5f0] hover:text-[#d4a574] py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <Button className="w-full bg-[#c44536] hover:bg-[#e85d04] text-white">
                  Order Now
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={IMAGES.hero}
          alt="Tandoori Chicken"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1412]/90 via-[#1a1412]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1412] via-transparent to-[#1a1412]/30" />
      </div>

      {/* Interactive Embers - replaces static floating particles */}
      <InteractiveEmbers />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 text-[#d4a574] text-lg mb-4 font-medium">
              <Flame className="w-5 h-5" />
              Authentic Clay Oven Cooking
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold font-serif text-[#faf5f0] leading-tight mb-6"
          >
            Where Fire Meets{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c44536] to-[#e85d04]">
              Flavor
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-[#a89890] mb-8 max-w-xl"
          >
            Experience the ancient art of tandoori cooking. Our master chefs craft each dish with passion, bringing you the smoky, aromatic flavors of India&apos;s finest cuisine.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <MagneticButton
              className="bg-[#c44536] hover:bg-[#e85d04] text-white px-8 py-4 text-lg rounded-lg font-medium flex items-center justify-center gap-2 group transition-colors"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Order Online
            </MagneticButton>
            <MagneticButton
              className="border-2 border-[#d4a574] text-[#d4a574] hover:bg-[#d4a574] hover:text-[#1a1412] px-8 py-4 text-lg rounded-lg font-medium flex items-center justify-center gap-2 group transition-colors"
            >
              <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Reserve a Table
            </MagneticButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-[#3d322c]"
          >
            {[
              { value: "25+", label: "Years Experience" },
              { value: "50+", label: "Signature Dishes" },
              { value: "10K+", label: "Happy Customers" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-[#d4a574] font-serif">{stat.value}</div>
                <div className="text-[#a89890] text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-[#d4a574] rounded-full flex justify-center pt-2"
        >
          <motion.div className="w-1 h-2 bg-[#d4a574] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// About Section
function AboutSection() {
  return (
    <section className="py-24 bg-[#1a1412]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#c44536] text-sm font-semibold tracking-wider uppercase">
              Our Story
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-[#faf5f0] mt-2 mb-6">
              A Legacy of <span className="text-[#d4a574]">Flavor</span>
            </h2>
            <p className="text-[#a89890] text-lg mb-6 leading-relaxed">
              For over two decades, Tandoor Flames has been the heart of authentic Indian cuisine in the city. Our journey began with a simple clay oven and a passion for bringing the rich, smoky flavors of traditional tandoori cooking to discerning palates.
            </p>
            <p className="text-[#a89890] text-lg mb-8 leading-relaxed">
              Every dish tells a story — of carefully selected spices, time-honored recipes passed down through generations, and the mesmerizing dance of flames in our tandoor ovens.
            </p>
            <div className="flex flex-wrap gap-6">
              {[
                { icon: UtensilsCrossed, text: "Authentic Recipes" },
                { icon: Flame, text: "Clay Oven Cooking" },
                { icon: Star, text: "Premium Ingredients" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-[#faf5f0]">
                  <item.icon className="w-5 h-5 text-[#c44536]" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-[500px] rounded-2xl overflow-hidden">
              <Image
                src={IMAGES.platter}
                alt="Tandoori Platter"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1412]/50 to-transparent" />
            </div>
            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-8 -left-8 bg-[#231c18] p-6 rounded-xl border border-[#3d322c] shadow-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#c44536]/20 rounded-full flex items-center justify-center">
                  <Flame className="w-8 h-8 text-[#c44536]" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#d4a574] font-serif">800°F</div>
                  <div className="text-[#a89890] text-sm">Tandoor Temperature</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Menu Section - Updated with TiltCard
function MenuSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Signature", "Kebabs", "Vegetarian"];

  const filteredItems = activeCategory === "All" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-24 bg-[#231c18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#c44536] text-sm font-semibold tracking-wider uppercase">
            Our Menu
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-[#faf5f0] mt-2 mb-4">
            Signature <span className="text-[#d4a574]">Dishes</span>
          </h2>
          <p className="text-[#a89890] text-lg max-w-2xl mx-auto">
            Each dish is crafted with passion, featuring the finest ingredients and time-honored techniques
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeCategory === category
                  ? "bg-[#c44536] text-white"
                  : "bg-[#2d2420] text-[#a89890] hover:text-[#faf5f0]"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Menu Grid with TiltCard */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="wait">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <TiltCard className="h-full">
                  <Card className="bg-[#2d2420] border-[#3d322c] overflow-hidden group hover:border-[#c44536]/50 transition-all duration-300 h-full">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2d2420] to-transparent opacity-60" />
                      <div className="absolute top-4 right-4">
                        <span className="bg-[#c44536] text-white text-xs px-3 py-1 rounded-full">
                          {item.category}
                        </span>
                      </div>
                      {/* Spice Level */}
                      <div className="absolute bottom-4 left-4 flex gap-1">
                        {[...Array(3)].map((_, i) => (
                          <Flame
                            key={i}
                            className={`w-4 h-4 ${
                              i < item.spiceLevel ? "text-[#e85d04]" : "text-[#3d322c]"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-[#faf5f0] font-serif">{item.name}</h3>
                        <span className="text-[#d4a574] font-bold">${item.price}</span>
                      </div>
                      <p className="text-[#a89890] text-sm mb-4">{item.description}</p>
                      <Button
                        size="sm"
                        className="w-full bg-transparent border border-[#c44536] text-[#c44536] hover:bg-[#c44536] hover:text-white transition-all"
                      >
                        Add to Order
                      </Button>
                    </CardContent>
                  </Card>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <MagneticButton
            className="bg-[#c44536] hover:bg-[#e85d04] text-white px-8 py-4 rounded-lg font-medium transition-colors"
          >
            View Full Menu
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

// Chef Section
function ChefSection() {
  return (
    <section id="chef" className="py-24 bg-[#1a1412]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative h-[600px] rounded-2xl overflow-hidden">
              <Image
                src={IMAGES.chef}
                alt="Chef Rajan"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1412] via-transparent to-transparent" />
            </div>
            {/* Award Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -top-4 -right-4 bg-[#d4a574] p-4 rounded-full"
            >
              <Star className="w-8 h-8 text-[#1a1412]" fill="#1a1412" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <span className="text-[#c44536] text-sm font-semibold tracking-wider uppercase">
              Meet Our Chef
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-[#faf5f0] mt-2 mb-6">
              Chef <span className="text-[#d4a574]">Rajan Kumar</span>
            </h2>
            <p className="text-[#a89890] text-lg mb-6 leading-relaxed">
              With over 30 years of culinary mastery, Chef Rajan brings the authentic flavors of North India to every dish. Trained in the royal kitchens of Lucknow, he has perfected the art of tandoori cooking, earning recognition from culinary critics worldwide.
            </p>
            <p className="text-[#a89890] text-lg mb-8 leading-relaxed">
              &ldquo;Cooking is not just about food — it&apos;s about creating memories. Every dish I create carries the warmth of tradition and the fire of passion.&rdquo;
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              {[
                { value: "30+", label: "Years Experience" },
                { value: "15", label: "Awards Won" },
                { value: "5", label: "Michelin Stars" },
                { value: "100+", label: "Original Recipes" },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#231c18] p-4 rounded-xl border border-[#3d322c]">
                  <div className="text-2xl font-bold text-[#d4a574] font-serif">{stat.value}</div>
                  <div className="text-[#a89890] text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            <Button
              size="lg"
              className="bg-[#c44536] hover:bg-[#e85d04] text-white"
            >
              Book a Chef&apos;s Table Experience
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Ambiance Section
function AmbianceSection() {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <section id="ambiance" className="py-24 bg-[#231c18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#c44536] text-sm font-semibold tracking-wider uppercase">
            Our Space
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-[#faf5f0] mt-2 mb-4">
            The <span className="text-[#d4a574]">Ambiance</span>
          </h2>
          <p className="text-[#a89890] text-lg max-w-2xl mx-auto">
            Step into a world where traditional elegance meets modern comfort
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={ambianceImages[activeImage].src}
                  alt={ambianceImages[activeImage].alt}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1412]/60 to-transparent" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <h3 className="text-2xl font-serif text-[#faf5f0]">{ambianceImages[activeImage].alt}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveImage(prev => prev === 0 ? ambianceImages.length - 1 : prev - 1)}
                  className="w-10 h-10 bg-[#1a1412]/80 rounded-full flex items-center justify-center text-[#faf5f0] hover:bg-[#c44536] transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveImage(prev => prev === ambianceImages.length - 1 ? 0 : prev + 1)}
                  className="w-10 h-10 bg-[#1a1412]/80 rounded-full flex items-center justify-center text-[#faf5f0] hover:bg-[#c44536] transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Thumbnails */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            {ambianceImages.slice(0, 3).map((image, index) => (
              <motion.button
                key={image.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveImage(index)}
                className={`relative h-32 lg:h-[150px] rounded-xl overflow-hidden ${
                  activeImage === index ? "ring-2 ring-[#c44536]" : ""
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 transition-opacity ${
                  activeImage === index ? "bg-transparent" : "bg-[#1a1412]/40"
                }`} />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
        >
          {[
            { icon: UtensilsCrossed, title: "Fine Dining", desc: "Elegant table settings" },
            { icon: Users, title: "Private Events", desc: "Up to 100 guests" },
            { icon: Flame, title: "Live Kitchen", desc: "Watch the magic unfold" },
            { icon: Star, title: "VIP Lounge", desc: "Exclusive experience" },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#2d2420] p-6 rounded-xl border border-[#3d322c] hover:border-[#c44536]/50 transition-all group"
            >
              <feature.icon className="w-8 h-8 text-[#c44536] mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="text-lg font-semibold text-[#faf5f0] mb-1">{feature.title}</h4>
              <p className="text-[#a89890] text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// NEW: Spice Experience Section
function SpiceExperienceSection() {
  return (
    <section className="py-24 bg-[#1a1412] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#c44536] text-sm font-semibold tracking-wider uppercase">
              Interactive Experience
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-[#faf5f0] mt-2 mb-6">
              Find Your <span className="text-[#d4a574]">Heat Level</span>
            </h2>
            <p className="text-[#a89890] text-lg mb-6 leading-relaxed">
              Not sure how spicy you like it? Use our interactive spice meter to discover your perfect heat preference. From mild warmth to fiery inferno, we customize every dish to your taste.
            </p>
            <p className="text-[#a89890] text-lg leading-relaxed">
              Our chefs are masters at balancing flavors — whether you prefer gentle spices or crave the full tandoori heat experience, we&apos;ve got you covered.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <SpiceMeter />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Reservation Section
function ReservationSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    specialRequests: "",
  });

  const [orderType, setOrderType] = useState<"reservation" | "order">("reservation");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section id="reservations" className="py-24 bg-[#1a1412] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a574' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#c44536] text-sm font-semibold tracking-wider uppercase">
              Book Your Experience
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-[#faf5f0] mt-2 mb-6">
              Reserve Your <span className="text-[#d4a574]">Table</span>
            </h2>
            <p className="text-[#a89890] text-lg mb-8">
              Whether you&apos;re celebrating a special occasion or simply craving exceptional cuisine, we&apos;re here to make your experience memorable.
            </p>

            {/* Contact Info */}
            <div className="space-y-6 mb-8">
              {[
                { icon: MapPin, label: "Location", value: "123 Spice Avenue, Culinary District" },
                { icon: Clock, label: "Hours", value: "Mon-Sun: 11:00 AM - 11:00 PM" },
                { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
                { icon: Mail, label: "Email", value: "reservations@tandoorflames.com" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#231c18] rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-[#c44536]" />
                  </div>
                  <div>
                    <div className="text-[#a89890] text-sm">{item.label}</div>
                    <div className="text-[#faf5f0]">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-12 h-12 bg-[#231c18] rounded-lg flex items-center justify-center text-[#a89890] hover:text-[#c44536] hover:bg-[#2d2420] transition-all"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-[#231c18] border-[#3d322c]">
              <CardContent className="p-6 md:p-8">
                {/* Toggle */}
                <div className="flex gap-2 mb-8 p-1 bg-[#2d2420] rounded-lg">
                  <button
                    onClick={() => setOrderType("reservation")}
                    className={`flex-1 py-3 rounded-md font-medium transition-all ${
                      orderType === "reservation"
                        ? "bg-[#c44536] text-white"
                        : "text-[#a89890] hover:text-[#faf5f0]"
                    }`}
                  >
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Reservation
                  </button>
                  <button
                    onClick={() => setOrderType("order")}
                    className={`flex-1 py-3 rounded-md font-medium transition-all ${
                      orderType === "order"
                        ? "bg-[#c44536] text-white"
                        : "text-[#a89890] hover:text-[#faf5f0]"
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4 inline mr-2" />
                    Order Online
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[#a89890] text-sm mb-2 block">Full Name</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="bg-[#2d2420] border-[#3d322c] text-[#faf5f0] placeholder:text-[#5c524c] focus:border-[#c44536]"
                      />
                    </div>
                    <div>
                      <label className="text-[#a89890] text-sm mb-2 block">Email</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="bg-[#2d2420] border-[#3d322c] text-[#faf5f0] placeholder:text-[#5c524c] focus:border-[#c44536]"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[#a89890] text-sm mb-2 block">Phone</label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="bg-[#2d2420] border-[#3d322c] text-[#faf5f0] placeholder:text-[#5c524c] focus:border-[#c44536]"
                      />
                    </div>
                    <div>
                      <label className="text-[#a89890] text-sm mb-2 block">Number of Guests</label>
                      <Select onValueChange={(value) => setFormData({ ...formData, guests: value })}>
                        <SelectTrigger className="bg-[#2d2420] border-[#3d322c] text-[#faf5f0]">
                          <SelectValue placeholder="Select guests" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#231c18] border-[#3d322c]">
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                            <SelectItem key={num} value={num.toString()} className="text-[#faf5f0] focus:bg-[#2d2420]">
                              {num} {num === 1 ? "Guest" : "Guests"}
                            </SelectItem>
                          ))}
                          <SelectItem value="large-party" className="text-[#faf5f0] focus:bg-[#2d2420]">
                            Large Party (9+)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {orderType === "reservation" && (
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[#a89890] text-sm mb-2 block">Date</label>
                        <Input
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="bg-[#2d2420] border-[#3d322c] text-[#faf5f0] focus:border-[#c44536]"
                        />
                      </div>
                      <div>
                        <label className="text-[#a89890] text-sm mb-2 block">Time</label>
                        <Select onValueChange={(value) => setFormData({ ...formData, time: value })}>
                          <SelectTrigger className="bg-[#2d2420] border-[#3d322c] text-[#faf5f0]">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#231c18] border-[#3d322c]">
                            {["11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"].map((time) => (
                              <SelectItem key={time} value={time} className="text-[#faf5f0] focus:bg-[#2d2420]">
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="text-[#a89890] text-sm mb-2 block">Special Requests</label>
                    <Textarea
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                      placeholder="Any dietary restrictions, allergies, or special occasions..."
                      rows={3}
                      className="bg-[#2d2420] border-[#3d322c] text-[#faf5f0] placeholder:text-[#5c524c] focus:border-[#c44536] resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-[#c44536] hover:bg-[#e85d04] text-white py-6 text-lg"
                  >
                    {orderType === "reservation" ? "Confirm Reservation" : "Proceed to Order"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Reviews Section
function ReviewsSection() {
  const [currentReview, setCurrentReview] = useState(0);

  const nextReview = () => setCurrentReview((prev) => (prev + 1) % reviews.length);
  const prevReview = () => setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);

  useEffect(() => {
    const interval = setInterval(nextReview, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="reviews" className="py-24 bg-[#231c18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#c44536] text-sm font-semibold tracking-wider uppercase">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-[#faf5f0] mt-2 mb-4">
            What Our <span className="text-[#d4a574]">Guests Say</span>
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Quote Icon */}
          <Quote className="absolute -top-4 left-0 w-16 h-16 text-[#c44536]/20" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentReview}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center px-8 md:px-16"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(reviews[currentReview].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-[#d4a574]" fill="#d4a574" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-xl md:text-2xl text-[#faf5f0] mb-8 font-serif italic leading-relaxed">
                &ldquo;{reviews[currentReview].comment}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden">
                  <Image
                    src={reviews[currentReview].avatar}
                    alt={reviews[currentReview].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <div className="text-[#faf5f0] font-semibold">{reviews[currentReview].name}</div>
                  <div className="text-[#a89890] text-sm">{reviews[currentReview].date}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevReview}
              className="w-12 h-12 bg-[#2d2420] rounded-full flex items-center justify-center text-[#faf5f0] hover:bg-[#c44536] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentReview === index ? "w-8 bg-[#c44536]" : "bg-[#3d322c]"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextReview}
              className="w-12 h-12 bg-[#2d2420] rounded-full flex items-center justify-center text-[#faf5f0] hover:bg-[#c44536] transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-[#1a1412] py-16 border-t border-[#3d322c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-8 h-8 text-[#c44536]" />
              <span className="text-2xl font-bold font-serif text-[#faf5f0]">
                Tandoor <span className="text-[#d4a574]">Flames</span>
              </span>
            </div>
            <p className="text-[#a89890] mb-6">
              Authentic tandoori cuisine crafted with passion and tradition since 1998.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-[#231c18] rounded-lg flex items-center justify-center text-[#a89890] hover:text-[#c44536] hover:bg-[#2d2420] transition-all"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#faf5f0] font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {["Menu", "Reservations", "Private Events", "Gift Cards", "Careers"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-[#a89890] hover:text-[#d4a574] transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-[#faf5f0] font-semibold mb-4">Hours</h4>
            <ul className="space-y-3 text-[#a89890]">
              <li>Monday - Thursday: 11am - 10pm</li>
              <li>Friday - Saturday: 11am - 11pm</li>
              <li>Sunday: 12pm - 9pm</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#faf5f0] font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-[#a89890]">
              <li>123 Spice Avenue</li>
              <li>Culinary District, CD 12345</li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> info@tandoorflames.com
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#3d322c] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#a89890] text-sm">
            © 2024 Tandoor Flames. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-[#a89890] hover:text-[#d4a574]">Privacy Policy</a>
            <a href="#" className="text-[#a89890] hover:text-[#d4a574]">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main Page Component
export default function Home() {
  return (
    <main className="min-h-screen bg-[#1a1412]">
      {/* Flame Cursor Effect */}
      <FlamesCursor />
      
      <Navigation />
      <HeroSection />
      <AboutSection />
      <MenuSection />
      <SpiceExperienceSection />
      <ChefSection />
      <AmbianceSection />
      <ReservationSection />
      <ReviewsSection />
      <Footer />
    </main>
  );
}