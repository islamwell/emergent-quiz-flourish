import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Subjects from "../components/Subjects";
import FeaturedCourses from "../components/FeaturedCourses";
import Stats from "../components/Stats";
import Approach from "../components/Approach";
import Testimonials from "../components/Testimonials";
import Resources from "../components/Resources";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <About />
        <Subjects />
        <FeaturedCourses />
        <Stats />
        <Approach />
        <Testimonials />
        <Resources />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
