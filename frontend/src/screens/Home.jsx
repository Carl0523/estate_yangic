import Hero from "../components/homepage/Hero";
import RecentHomes from "../components/homepage/RecentHomes";
import About from "../components/homepage/About";
import Footer from "../components/homepage/Footer";

export default function Home() {
  return (
    <div>
      <Hero />
      <RecentHomes />
      <About/>
      <Footer/>
    </div>
  );
}
