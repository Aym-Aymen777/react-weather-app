import { useEffect } from "react";
import { gsap } from "gsap";
import { TimelineMax, Back } from "gsap"; 


export const AnimateClouds=(bgClass)=>{
    useEffect(() => {
        if (bgClass === "cloud") {
          const timeline = new TimelineMax();
      
          // First animation sequence
          timeline
            .to(".cloud1", 12, { ease: Back.easeOut.config(1), left: "70%" })
            .to(".cloud2", 12, { ease: Back.easeOut.config(0.5), left: "30%" }, 1)
            .to(".cloud3", 13, { ease: Back.easeOut.config(0.3), left: "2%" }, 1.5)
            .eventCallback("onComplete", () => {
              gsap.delayedCall(2, () => {
              gsap.to(".cloud1", {
                duration: 1.5,
                x: 10, // Move slightly to the right
                yoyo: true,
                repeat: -1, // Infinite repeat
                ease: "power1.inOut",
              });
      
              gsap.to(".cloud2", {
                duration: 1.7,
                x: 15, // Move slightly to the right
                yoyo: true,
                repeat: -1, // Infinite repeat
                ease: "power1.inOut",
              });
      
              gsap.to(".cloud3", {
                duration: 2,
                x: 8, // Move slightly to the right
                yoyo: true,
                repeat: -1, // Infinite repeat
                ease: "power1.inOut",
              });
            })
            });
        }
      }, [bgClass]);
}