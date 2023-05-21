import Navbar from "@/app/components/home/Navbar";
import Hero from "@/app/components/home/Hero";
import Footer from "@/app/components/home/Footer";
import Features from "@/app/components/home/Features";
import CallToAction from "@/app/components/home/CallToAction";

const Home = () => {
  return (
    <div className="flex flex-col justify-center">
      <Navbar />
      <Hero />
      <Features />
      <CallToAction />
      <Footer />
    </div>
  )
}
export default Home;
