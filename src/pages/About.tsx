import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import ownerPortrait from "@/assets/emmamendez.jpg";


const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8 text-center">
            About Us
          </h1>
                    
          <div className="flex justify-center mb-12">
            <img 
              src={ownerPortrait} 
              alt="Owner of Sovereign Wellness Lounge" 
              className="w-80 h-auto rounded-2xl shadow-lg"
            />
          </div>
          
          <div className="prose prose-lg max-w-none text-foreground/80 space-y-6">
            <p className="text-xl leading-relaxed">
              With over six years' experience in weight management, skin tightening, and holistic wellbeing, opening a space that truly reflects this journey has been a genuine labour of love.
            </p>
            
            <p className="leading-relaxed">
              My story began personally. At my heaviest, weighing 16 stone 7 lbs, I made the courageous decision to transform my health naturally. Over the course of a decade, I lost weight, tightened my skin, and rebuilt my confidence — without shortcuts. Today, I bring what truly worked for me into a space that is focused on visible, lasting results.
            </p>
            
            <p className="leading-relaxed">
              As a Level 3 qualified Beauty Therapist, I deliver regulated, professional, and carefully curated signature therapeutic treatments. Each experience is designed to provide a true escape — promoting stress relief, detoxification, and body contouring through advanced massage techniques and specialised devices, all with exceptional results at the heart of every treatment.
            </p>
            
            <p className="leading-relaxed">
              What truly sets Sovereign Wellness Lounge apart is the personal touch. As the owner, I include small complimentary treatments with every booking to create a meaningful, elevated experience. Because at Sovereign, wellbeing is not an add-on — it is paramount to the Sovereign Experience.
            </p>

            <p className="leading-relaxed">
              Sovereign Wellness Lounge is proudly part of Sovereign Studios. To discover more about the venue and its full offering, please visit{" "}
              <a
                href="https://sovereignstudios.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline hover:opacity-80 transition"
              >
                www.sovereignstudios.co.uk
              </a>.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;