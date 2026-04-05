import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button"
import { CalculatorIcon, MicIcon, StarIcon } from "lucide-react";
import { SignUpButton } from "@clerk/nextjs";
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden px-4 sm:px-8 md:-30">
      {/* Background frame for the landing page */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/5 to-primary/5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20"></div>
      </div>

      <div className="absolute top-20 left-1/4 w-72 h-72 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-r from-primary/15 to-primary/5 rounded-full blur-3xl" />
      {/* ------------------------------ */}
      <div className="w-full relative z-10 grid grid-cols-[minmax(0,1fr)_auto] lg:grid-cols-2 items-start sm:items-center pt-22 lg:pt-30 gap-6">
        <div className="flex flex-col gap-6 lg:ml-10">
          <Badge className="py-5">
            <Image src="/calendar.png" alt="Calendar" width={30} height={30} />
            <span className="text-s sm:text-base">AI based dental guidance</span>
          </Badge>
          <p className="text-4xl max-w-70">
            Your Dental <span className="text-boldtext font-bold">questions</span> answered instantly
          </p>
          <p className="text-lg max-w-90">
            Chat with our AI dental assistant for instant advice, book smart appointments, and
            get personalized care recommendations. Available 24/7. no waiting required.
          </p>          <div className="flex gap-4">
            <SignUpButton mode="modal">
              <Button className="p-4" >
                Try voice chat
              </Button>
            </SignUpButton>

            <SignUpButton mode="modal">
              <Button className="p-4" >
                Book appointment
              </Button>
            </SignUpButton>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center -space-x-3">
              <Image
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
                alt="Jessica Davis"
                width={28}
                height={28}
                className="w-12 h-12 rounded-full object-cover ring-4 ring-background"
              />
              <Image
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face"
                alt="Sam Miller"
                width={28}
                height={28}
                className="w-12 h-12 rounded-full object-cover ring-4 ring-background"
              />
              <Image
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face"
                alt="Anna Lopez"
                width={28}
                height={28}
                className="w-12 h-12 rounded-full object-cover ring-4 ring-background"
              />
              <Image
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop&crop=face"
                alt="Mike Rodriguez"
                width={28}
                height={28}
                className="w-12 h-12 rounded-full object-cover ring-4 ring-background"
              />
              <Image
                src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=100&h=100&fit=crop&crop=face"
                alt="Katie Lee"
                width={28}
                height={28}
                className="w-12 h-12 rounded-full object-cover ring-4 ring-background"
              />
            </div>
            <div className="flex flex-col items-start ">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(n => (
                  <StarIcon key={n} className="fill-amber-400 w-4" />
                ))}
                <span className="ml-2">4.7/5</span>
              </div>
              <div className="text-muted-foreground">Trusted by <span className="text-foreground">1000+ customers</span> </div>
            </div>
          </div>
        </div>

        <Image src="/hero.png" alt="Dentwise mascot" width={300} height={300} className="h-auto w-34 sm:w-42 md:w-54 lg:w-80" />

      </div>
    </section>
  );
}

export default Hero;
