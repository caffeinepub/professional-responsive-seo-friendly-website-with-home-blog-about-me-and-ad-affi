import { HeroSection } from '../components/home/HeroSection';
import { WelcomeSection } from '../components/home/WelcomeSection';
import { Seo } from '../components/seo/Seo';

export default function HomePage() {
  return (
    <>
      <Seo
        title="Home"
        description="Welcome to MHS Habibur Blog - Discover insights on online income strategies, digital marketing tactics, and expertise to help you succeed in the digital economy."
        path="/"
      />
      <HeroSection />
      <WelcomeSection />
    </>
  );
}
