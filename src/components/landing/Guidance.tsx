import { Badge } from "../ui/badge";
import Image from "next/image";

function Guidance() {
  return (
    <section className="w-full mt-10 flex flex-col items-center gap-8">
      <Badge className="p-3">Simple Process</Badge>
      <h2 className="text-lg sm:text-4xl text-center">
        Three Steps to <br />
        <span className="text-secondary font-bold">better dental health</span>
      </h2>
      <p className="text-base text-center mb-7">
        Our streamlined process makes dental care accessible, <br /> convenient, and stress-free for
        everyone
      </p>

      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-7">
        <div className="relative flex flex-col items-center gap-4 mb-6 md:mb-0 text-center">
          <span className="absolute left-0 -top-6 border px-2 rounded-full bg-boldtext">1</span>
          <Image src="/audio.png" alt="mic" width={30} height={30} className="bg-card rounded" />
          <h3 className="font-bold">Ask Questions</h3>
          <p className="max-w-70">
            Chat with our AI assistant about any dental concerns. Get instant answers about
            symptoms, treatments, and oral health tips.
          </p>
          <div className="flex items-center gap-2">
            <Badge> 24/7 Available</Badge>
            <Badge>Instant Response</Badge>
          </div>
        </div>

        <div className="relative flex flex-col items-center gap-4  text-center">
          <span className="absolute left-0 -top-6 border px-2 rounded-full bg-boldtext">2</span>
          <Image src="/brain.png" alt="brain" width={30} height={30} className="bg-card rounded" />
          <h3 className="font-bold">Get Expert Advice</h3>
          <p className="max-w-70">
            Receive personalized recommendations based on thousands of dental cases. Our AI
            provides professional-grade insights.
          </p>
          <div className="flex items-center gap-2">
            <Badge>AI-Powered</Badge>
            <Badge>Personalized</Badge>
          </div>
        </div>

        <div className="relative flex flex-col items-center gap-4  text-center">
          <span className="absolute left-0 -top-6 border px-2 rounded-full bg-boldtext">3</span>
          <Image src="/calendar.png" alt="calendar" width={30} height={30} className="bg-card rounded" />
          <h3 className="font-bold">Book & Get Care</h3>
          <p className="max-w-70">
            Schedule with verified dentists and receive comprehensive follow-up care. Track your
            progress seamlessly.
          </p>
          <div className="flex items-center gap-2">
            <Badge>Verified Doctors</Badge>
            <Badge>Follow-up Care</Badge>
          </div>
        </div>
      </div>
    </section >
  );
}

export default Guidance;
