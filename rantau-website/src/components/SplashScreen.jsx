import { useEffect, useState } from "react";

export default function SplashScreen({ onFinish }) {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    // Logo appears
    setTimeout(() => setAnimationStep(1), 300);

    // Text appears
    setTimeout(() => setAnimationStep(2), 1000);

    // Fade out and finish
    setTimeout(() => setAnimationStep(3), 2500);
    setTimeout(() => onFinish(), 3200);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-forest-dark via-forest-main to-forest-light transition-opacity duration-700 ${
        animationStep === 3 ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="text-center">
        {/* Logo Animation */}
        <div
          className={`mb-8 transform transition-all duration-1000 ${
            animationStep >= 1
              ? "opacity-100 scale-100 rotate-0"
              : "opacity-0 scale-50 rotate-180"
          }`}
        >
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto">
            {/* Animated circles behind logo */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gold to-gold-light animate-ping opacity-75"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gold to-gold-light opacity-90"></div>

            {/* Your Logo */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <img
                src="/logo rantau baru-nobg.png"
                alt="RANTAU Logo"
                className="w-200 h-200 object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* RANTAU Text Animation */}
        <div
          className={`transform transition-all duration-1000 delay-500 ${
            animationStep >= 2
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold mb-2">
            {["R", "A", "N", "T", "A", "U"].map((letter, index) => (
              <span
                key={index}
                className="inline-block bg-gradient-to-r from-gold via-gold-light to-white bg-clip-text text-transparent"
                style={{
                  animation: `bounce 0.6s ease-in-out both`,
                  animationDelay: `${0.8 + index * 0.1}s`,
                }}
              >
                {letter}
              </span>
            ))}
          </h1>
          <p
            className="text-white/80 text-base sm:text-lg md:text-xl font-medium tracking-wider"
            style={{
              animation: `fadeIn 0.8s ease-in 1.5s both`,
            }}
          >
            Ruang Temu Anak Perantau
          </p>
        </div>

        {/* Loading dots */}
        <div
          className={`flex items-center justify-center gap-2 mt-8 transition-opacity duration-500 ${
            animationStep >= 2 ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="w-2 h-2 bg-white rounded-full animate-bounce"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="w-2 h-2 bg-white rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-2 h-2 bg-white rounded-full animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
