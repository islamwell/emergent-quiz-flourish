import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Subjects from "../components/Subjects";
import FeaturedCourses from "../components/FeaturedCourses";
import Stats from "../components/Stats";
import Approach from "../components/Approach";
import Testimonials from "../components/Testimonials";
import Resources from "../components/Resources";
import CTA from "../components/CTA";

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Subjects />
      <FeaturedCourses />
      <Stats />
      <Approach />
      <Testimonials />
      <Resources />
      <CTA />
    </>
  );
};

export default Home;
