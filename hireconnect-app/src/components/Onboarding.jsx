import React from 'react';
import photo from '../assets/photo.png'; 
import { useNavigate } from 'react-router-dom';   
// import { motion } from 'framer-motion';

const Onboarding = () => {
  const navigate = useNavigate();                

  return (
    <section
      className="
        relative mx-auto my-0 flex flex-col-reverse items-center overflow-hidden
        bg-[#f9f7fb]
        lg:flex-row lg:h-[40rem] lg:w-full
      "
    >
      <img
        src={photo}
        alt="Freelancer at work"
        className="
          block w-full object-cover
          sm:h-96
          lg:absolute lg:left-[60px] lg:top-[20px] lg:h-[640px] lg:w-[500px] lg:rounded-3xl
        "
      />

      <div
        className="
          z-10 flex w-full flex-col gap-8 px-6 py-8
          sm:max-w-md sm:py-16 mt-36
          lg:ml-auto lg:mr-10 lg:max-w-[549px] lg:gap-10 lg:py-8
        "
      >
        <h3
          className="
            text-2xl font-bold leading-tight text-[#4d0892]
            sm:text-3xl lg:text-4xl
           "
          >
          Hire Top Talents or Find<br className="hidden sm:block" />
          Your Gig<br className="hidden sm:block" />
        </h3>

        <div className="mt-[-20px]">
          <h4>
            Post projects, discover skilled freelancers, and manage<br className="hidden sm:block" />
            your work in one place<br className="hidden sm:block" />
          </h4>
        </div>

        <div className="flex flex-col gap-6">
          <button
            className="
              h-14 rounded-lg bg-[#4d0892] font-roboto text-base font-medium text-white
              transition-colors hover:bg-[#4d0892]/20
              px-[92px] py-4 cursor-pointer 
            "
            onClick={() => navigate('/signup')}      
          >
            Continue as a freelancer
          </button>

          <button
            className="
              h-14 rounded-lg bg-gray-300 font-roboto text-base font-medium text-[#4d0892]/25
              transition-colors hover:bg-gray-200
              px-[92px] py-4 cursor-pointer
            "
            onClick={() => navigate('/signup')}      
          >
            Continue as a client
          </button>
        </div>

        {/* ----------Blur section--------- */}
        <div className="relative w-full lg:w-[564px] lg:shrink-2">
          <div
            className="
              absolute left-1/2 bottom-[-1rem] hidden h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2
              rounded-full bg-gradient-to-br from-[#17022c]/50 to-[#4d0892]/10
              opacity-30 blur-3xl shadow-2xl
              lg:block
            "
          />
        </div>
      </div>
    </section>
  );
};

export default Onboarding;

