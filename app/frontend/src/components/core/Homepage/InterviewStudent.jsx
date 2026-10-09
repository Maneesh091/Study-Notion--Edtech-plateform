// import { useEffect, useState } from "react";

// const texts = [
//   "Interview Preparation?",
//   "Career Guidance?",
//   "Resume Building?",
//   "Mock Interviews?",
// ];

// const AnimatedText = () => {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % texts.length);
//     }, 2500);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="h-[1.2em] overflow-hidden">
//       <span
//         key={index}
//         className="block animate-slideUp text-green-700"
//       >
//         {texts[index]}
//       </span>
//     </div>
//   );
// };

// export default AnimatedText; 

import { Users, Layers3, WalletCards, Share2 } from "lucide-react";
// import Professional from "./InterviewImages/professional"

const InterviewStudent = () => {
  return (
   <section className="w-full bg-[#020914] px-4 py-8 md:px-8">
  <div className="relative mx-auto max-w-[1300px] overflow-hidden rounded-[22px] border border-white/10 bg-[#020914]">

    {/* HERO */}
    <div className="grid min-h-[440px] grid-cols-1 lg:grid-cols-2">

      {/* LEFT */}
      <div className="flex flex-col justify-center px-8 py-14 md:px-12 lg:px-10 xl:px-12">

        <h1 className="max-w-[600px] text-[42px] font-semibold leading-[1.15] tracking-[-1.5px] text-[#F5F7FA] md:text-[52px] lg:text-[54px]">

          <span className="block">
            Need help with
          </span>

          {/* Animated text — we'll add it later */}
          <span className="mt-1 block text-[#00A878]">
            Interview Preparation?
          </span>

        </h1>

        <p className="mt-7 max-w-[580px] text-[17px] leading-8 text-[#94A3B8] md:text-[18px]">
          Connect with trusted experts, anytime. Get real answers,
          real guidance, in real time.
        </p>

        <div className="mt-8">
          <button
            className="
              rounded-xl
              bg-[#00A878]
              px-11
              py-4
              text-[16px]
              font-semibold
              text-white
              transition-all
              duration-300
              hover:bg-[#00B884]
              hover:shadow-[0_0_25px_rgba(0,168,120,0.25)]
            "
          >
            Explore Now
          </button>
        </div>

      </div>


      {/* RIGHT VISUAL */}
      <div className="relative hidden overflow-hidden lg:block">

        {/* Dotted background */}
        <div
          className="
            absolute
            right-[8%]
            top-[15%]
            h-[280px]
            w-[390px]
            opacity-40
          "
          style={{
            backgroundImage:
              "radial-gradient(#64748b 1.3px, transparent 1.3px)",
            backgroundSize: "18px 18px",
          }}
        />

        {/* TOP AVATAR */}
        <div className="absolute right-[27%] top-[14%]">

          {/* Bubble */}
          <div
            className="
              absolute
              -left-[220px]
              -top-[35px]
              w-[250px]
              rounded-2xl
              border
              border-white/10
              bg-[#0A1422]
              px-4
              py-3
              text-[13px]
              leading-6
              text-[#94A3B8]
              shadow-[0_10px_35px_rgba(0,0,0,0.35)]
            "
          >
            “Hi Everyone, hope you all are doing great.
            Here is a thought for the day!”
          </div>

          {/* Avatar */}
          <div className="h-[130px] w-[130px] rounded-full border-[5px] border-[#F28BBF]/30 bg-[#F28BBF]/10 p-1">
            <img
              src="your img here"
              alt="Expert"
              className="h-full w-full rounded-full object-cover"
            />
          </div>

        </div>


        {/* MIDDLE AVATAR */}
        <div className="absolute left-[18%] top-[48%]">

          <div
            className="
              absolute
              -bottom-[48px]
              -left-[130px]
              w-[170px]
              rounded-2xl
              border
              border-white/10
              bg-[#0A1422]
              px-3
              py-3
              text-[13px]
              leading-5
              text-[#94A3B8]
              shadow-[0_10px_35px_rgba(0,0,0,0.35)]
            "
          >
            “On-campus Interview
            Experience for SDE”
          </div>

          <div className="h-[100px] w-[100px] rounded-full border-[5px] border-[#08A8E0]/30 bg-[#08A8E0]/10 p-1">
            <img
              src="YOUR_IMAGE"
              alt="Expert"
              className="h-full w-full rounded-full object-cover"
            />
          </div>

        </div>


        {/* BOTTOM RIGHT AVATAR */}
        <div className="absolute right-[22%] top-[55%]">

          <div
            className="
              absolute
              -right-[210px]
              -top-[20px]
              w-[220px]
              rounded-2xl
              border
              border-white/10
              bg-[#0A1422]
              px-4
              py-3
              text-[13px]
              leading-5
              text-[#94A3B8]
              shadow-[0_10px_35px_rgba(0,0,0,0.35)]
            "
          >
            “Web3 is trending because it's
            changing the internet as we ...”
          </div>

          <div className="h-[130px] w-[130px] rounded-full border-[5px] border-[#FF8500]/30 bg-[#FF8500]/10 p-1">
            <img
              src="YOUR_IMAGE"
              alt="Expert"
              className="h-full w-full rounded-full object-cover"
            />
          </div>

        </div>

      </div>
    </div>


    {/* FEATURES */}
    <div className="border-t border-white/10 px-6 py-6 md:px-10">

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {/* Feature */}
        <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-[#07111F] px-4 py-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#8B5CF6]/10 text-[#A78BFA]">
            <Users size={23} />
          </div>

          <span className="text-[15px] font-medium text-[#F5F7FA]">
            Explore variety of courses
          </span>
        </div>


        {/* Feature */}
        <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-[#07111F] px-4 py-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F28BBF]/10 text-[#F28BBF]">
            <Layers3 size={23} />
          </div>

          <span className="text-[15px] font-medium text-[#F5F7FA]">
            Track your progress
          </span>
        </div>


        {/* Feature */}
        <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-[#07111F] px-4 py-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#08A8E0]/10 text-[#08A8E0]">
            <WalletCards size={23} />
          </div>

          <span className="text-[15px] font-medium text-[#F5F7FA]">
            Flexible & Affordable
          </span>
        </div>


        {/* Feature */}
        <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-[#07111F] px-4 py-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FF8500]/10 text-[#FF8500]">
            <Share2 size={23} />
          </div>

          <span className="whitespace-nowrap text-[15px] font-medium text-[#F5F7FA]">
            Build Your Network
          </span>
        </div>

      </div>
    </div>

  </div>
</section>
  );
};

export default InterviewStudent;