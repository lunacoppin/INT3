import { DotLottie } from '@lottiefiles/dotlottie-web';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// const player = new DotLottie({
//     canvas: document.querySelector(".animation"),
//     src: "/lottie/dashes-square.json",
// });

// gsap.to(player.canvas, {
//     scrollTrigger: {
//         trigger: player.canvas,
//         start: 'top top',
//         end: '+=1000',
//         pin: true,
//         scrub: true,
//         onUpdate: (self) => {
//             player.setFrame(self.progress * (player.totalFrames - 1));
//         }
//     },
// });

const paths = document.querySelectorAll(".draw-path");

paths.forEach((path) => {
    // Get the length of the path
    const pathLength = path.getTotalLength();

    // Set initial strokeDasharray and strokeDashoffset
    path.style.strokeDasharray = "30, 20";
    path.style.strokeDashoffset = pathLength;

    // GSAP ScrollTrigger animation
    gsap.to(path, {
        strokeDashoffset: 0, // Animate to a strokeDashoffset of 0
        scrollTrigger: {
            trigger: path,          // Trigger the animation when the path comes into view
            start: "top bottom",       // When the top of the path reaches 80% of the viewport height
            end: "bottom top-=5000",      // When the bottom of the path reaches 20% of the viewport height
            scrub: true,            // Smoothly animate as you scroll
            markers: false,           // Show the start and end markers for debugging
        }
    });
});

const animateProgress = () => {
    const progressBar = document.querySelector(".progress--fg");
    gsap.to(progressBar, {
        width: "100%",
        scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            markers: false,
        },
    });
};

// const horizontalTextAnimation = () => {
//     const $warning = document.querySelector(".heretics__p");
//     gsap.from($warning, {
//         x: "100vw",
//         scrollTrigger: {
//             trigger: ".heretics",
//             scrub: 0.5,
//             markers: false,
//             start: "top bottom",
//             end: "top top"
//         }
//     });
// };

const horizontalTextAnimation = () => {
    const $warning = document.querySelector(".heretics__p");
    const warningWidth = $warning.offsetWidth; 

    gsap.fromTo(
        $warning,
        { x: "105vw" },
        {
            x: `-${warningWidth}px`,
            ease: "none", 
            scrollTrigger: {
                trigger: ".heretics",
                scrub: 0.5, 
                markers: true, 
                start: "top center+=20%", 
                end: "bottom+=300% top", 
            },
        }
    );
};


const animate = () => {
    animateProgress();
    horizontalTextAnimation();
};

animate();

