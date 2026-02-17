import { HeroSection } from '../components/home/HeroSection';
import { WelcomeSection } from '../components/home/WelcomeSection';
import { Seo } from '../components/seo/Seo';

export default function HomePage() {
  return (
    <>
      <Seo path="/" />
      <HeroSection />
      <WelcomeSection />
    </>
  );
}
