import React from "react";
import { useSpring, animated } from "@react-spring/web";

const BlobBackground = () => {
  const blob1 = useSpring({
    from: { transform: "translate(0%, 0%)" },
    to: { transform: "translate(20%, 10%)" },
    config: { duration: 8000 },
    loop: { reverse: true },
  });

  const blob2 = useSpring({
    from: { transform: "translate(0%, 0%)" },
    to: { transform: "translate(-15%, -10%)" },
    config: { duration: 10000 },
    loop: { reverse: true },
  });
  
  const blob3 = useSpring({
    from: { transform: "translate(0%, 0%)" },
    to: { transform: "translate(15%, 5%)" },
    config: { duration: 12000 },
    loop: { reverse: true },
  });

  return (
    <>
      {/* Blob 1 */}
      <animated.div
        style={{
          ...blob1,
          position: "fixed",
          top: "5%",
          left: "50%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #5e35b1 0%, transparent 70%)",
          opacity: 0.7,
          zIndex: -2,
          filter: "blur(80px)",
        }}
      />

      {/* Blob 2 */}
      <animated.div
        style={{
          ...blob2,
          position: "fixed",
          top: "76%",
          left: "30%",
          width: "750px",
          height: "550px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #ff6f00 0%, transparent 70%)",
          opacity: 0.6,
          zIndex: -1,
          filter: "blur(80px)",
        }}
      />

           {/* Blob 3 */}
           <animated.div
        style={{
          ...blob3,
          position: "fixed",
          top: "0%",
          left: "-10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle,rgb(61, 202, 160) 0%, transparent 70%)",
          opacity: 0.6,
          zIndex: -1,
          filter: "blur(80px)",
        }}
      />
    </>
  );
};

export default BlobBackground;


