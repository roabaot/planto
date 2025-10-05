import Footer from "@/components/Core/Footer";
import CustomerReview from "@/components/Sections/CustomerReview";
import Hero from "@/components/Sections/Hero";
import TopSelling from "@/components/Sections/TopSelling";

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <TopSelling />
        <CustomerReview />
      </main>
      <Footer />
    </>
  );
}
