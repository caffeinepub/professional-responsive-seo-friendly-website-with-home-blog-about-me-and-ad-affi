import { Seo } from '../components/seo/Seo';
import { Button } from '../components/ui/button';
import { ExternalLink } from 'lucide-react';

export default function PaymentProofPage() {
  const proofImages = [
    {
      src: '/assets/generated/payment-proof-1.dim_1200x900.png',
      alt: 'Payment proof screenshot 1 - successful transaction',
    },
    {
      src: '/assets/generated/payment-proof-2.dim_1200x900.png',
      alt: 'Payment proof screenshot 2 - successful transaction',
    },
    {
      src: '/assets/generated/payment-proof-3.dim_1200x900.png',
      alt: 'Payment proof screenshot 3 - successful transaction',
    },
    {
      src: '/assets/generated/payment-proof-4.dim_1200x900.png',
      alt: 'Payment proof screenshot 4 - successful transaction',
    },
  ];

  return (
    <>
      <Seo
        title="Payment Proof"
        description="View payment proof from our successful members at H★S Online Earn Platform."
        path="/payment-proof"
      />
      
      <div className="container py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="neon-heading mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
              আমাদের পেমেন্ট প্রুফ সমূহ
            </h1>
            <p className="bengali-text text-lg text-white/80 md:text-xl">
              মেম্বারদের সফলতার কিছু চিত্র।
            </p>
          </div>

          {/* Upload Button */}
          <div className="mb-8 flex justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg hover:from-cyan-600 hover:to-blue-600"
            >
              <a
                href="https://forms.gle/F5GD1zuaqDWMo7n98"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Upload New Proof
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {proofImages.map((image, index) => (
              <div
                key={index}
                className="group overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20"
              >
                <div className="aspect-[4/3] overflow-hidden bg-white/5">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
