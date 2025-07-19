import React from 'react'

const AnimatedLogo = () => {
  return (
    <div className=" flex items-center justify-center group">
      {/* Logo with floating animation */}
      <div className=" z-10 transform transition-all duration-500 group-hover:scale-105">
        <img
          src="https://www.mbdesign-tn.com/wp-content/uploads/2022/01/logo-Asteroidea.jpg"
          alt="Asteroidea"
          className="h-32 w-auto object-contain drop-shadow-lg rounded-lg"
        />

        {/* Animated highlight overlay */}
      </div>

      {/* Animated rings around logo */}
    </div>
  );
};

const Logo = () => {
  return (
    <div className=" ">
          <AnimatedLogo />
        </div>
  )
}

export default Logo
