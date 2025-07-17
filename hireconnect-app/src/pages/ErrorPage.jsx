// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import logo from '../assets/kconnect.png';

// const ErrorPage = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const timer = setTimeout(() => navigate('/'), 10000);
//     return () => clearTimeout(timer);
//   }, [navigate]);

//   return (
//     <motion.div
//       className="min-h-screen bg-blue-200 flex flex-col items-center justify-center text-[#302B63] px-6"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.6 }}
//     >
//       {/* Logo */}
//       <motion.img
//         src={logo}
//         alt="KConnect Logo"
//         className="w-24 mb-4 cursor-pointer"
//         whileHover={{ scale: 1.1 }}
//         onClick={() => navigate('/')}
//       />

//       {/* SVG Illustration */}
//       <motion.div
//         className="w-full max-w-sm sm:max-w-md md:max-w-lg mb-6"
//         initial={{ scale: 0.9 }}
//         animate={{ scale: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <svg
//           viewBox="0 0 500 500"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//           className="w-full h-auto"
//         >
//           <path
//             d="M250,60C180,60,120,120,120,190c0,70,60,130,130,130s130-60,130-130C380,120,320,60,250,60z"
//             fill="#302B63"
//             opacity="0.1"
//           />
//           <circle cx="250" cy="190" r="100" fill="#302B63" opacity="0.2" />
//           <text
//             x="50%"
//             y="50%"
//             textAnchor="middle"
//             fill="#302B63"
//             fontSize="48"
//             fontWeight="bold"
//             dy=".3em"
//           >
//             404
//           </text>
//         </svg>
//       </motion.div>

//       {/* Text Content */}
//       <motion.h1
//         className="text-4xl sm:text-5xl font-bold text-center mb-2"
//         initial={{ y: -30 }}
//         animate={{ y: 0 }}
//         transition={{ type: 'spring', stiffness: 100 }}
//       >
//         Page Not Found
//       </motion.h1>

//       <motion.p
//         className="text-center text-gray-700 mb-6 max-w-md"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.3 }}
//       >
//         The page you’re looking for doesn’t exist or has been moved. You’ll be redirected
//         to the homepage shortly.
//       </motion.p>

//       {/* Button */}
//       <motion.button
//         onClick={() => navigate('/')}
//         className="bg-[#302B63] text-white px-6 py-2 rounded-md font-semibold hover:scale-105 transition-transform"
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//       >
//         Go Home Now
//       </motion.button>
//     </motion.div>
//   );
// };

// export default ErrorPage;
