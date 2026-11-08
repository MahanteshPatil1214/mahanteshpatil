import Footer from "./Footer";
import Hero from "./Hero";
import MotionDirector from "./MotionDirector";
import ScrollProgress from "./ScrollProgress";
import Stack from "./Stack";
import Statement from "./Statement";
import Ticker from "./Ticker";
import Work from "./Work";

export default function Portfolio() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollProgress />
      <MotionDirector />
      <main id="main">
        <Hero />
        <Statement />
        <Work />
        <Ticker />
        <Stack />
      </main>
      <Footer />
    </>
  );
}
