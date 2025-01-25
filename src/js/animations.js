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

// const changeYear = () => {
//     tlYear = gsap.timeline({
//         scrollTrigger: {
//             trigger: ".intro__year",
//             start: "top center",
//             end: "bottom center",
//             scrub: true,
//             markers: true,
//         },
//     });

//     tlYear.fromTo(
//         ".year__p--after",
//         {
//             opacity: 0,
//             y: '-100%',
//         },
//         {
//             opacity: 1,
//             y: 0,
//         }
//     );

// }

const changeYear = () => {
    const tlYear = gsap.timeline({
        scrollTrigger: {
            trigger: ".intro__year",
            start: "top center",
            end: "bottom center+=20%",
            scrub: 1,
            markers: true, // Debug markers (optional)
        },
    });

    // Animate each digit individually
    const digitsBefore = document.querySelectorAll(".year__p--before .digit");
    const digitsAfter = document.querySelectorAll(".year__p--after .digit");

    digitsBefore.forEach((digit, index) => {
        tlYear.fromTo(
            digit,
            {
                y: '-100%', // Move up
                 // Fade out
                duration: 0.3,
                ease: "power2.out",
            },
            {
                y: '-230%', // Move to center
                // Fade in
                duration: 0.3,
                ease: "power2.out",
            }, index * 0.1
        );
    });

    digitsAfter.forEach((digit, index) => {
        tlYear.fromTo(
            digit,
            {
                y: '100%', // Start below
                 // Invisible
            },
            {
                y: '0%', // Move to center
                 // Fade in
                duration: 0.3,
                ease: "power2.out",
            },
            index * 0.1 // Stagger animations
        );
    });
};


const animateProgress = () => {
    const progressBar = document.querySelector(".progress--fg");
    gsap.to(progressBar, {
        width: "100%",
        ease: "none",
        scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            markers: false,

        },
    });
};

const horizontalTextAnimation = () => {
    const $warning = document.querySelector(".warning__p");
    const warningWidth = $warning.offsetWidth; 

    gsap.fromTo(
        $warning,
        { x: "101vw" },
        {
            x: `-${warningWidth}px`,
            ease: "none", 
            scrollTrigger: {
                trigger: ".heretics",
                scrub: 0.5, 
                markers: false, 
                start: "top center+=40%", 
                end: "bottom+=20% top", 
            },
        }
    );
};

const animateHidingSection = () => {
    const $hidingSection = document.querySelector(".hiding");
    const sectionHeight = Math.max($hidingSection.scrollHeight, $hidingSection.offsetHeight) + "px";

    gsap.fromTo(".black-background", 
        { height: '0' 
         }, 
        {
            height: sectionHeight,
            scrollTrigger: {
                trigger: $hidingSection,
                start: "top-=50% center",
                end: "center-=10% center",
                scrub: 0.5,
                markers: false,
            }
         });

    gsap.fromTo(".black-background",
        {
            height: sectionHeight
        },
        {
            height: 0,
            scrollTrigger: {
                trigger: $hidingSection,
                start: "center+=10% center",
                end: "bottom+=50% top",
                scrub: 0.5,
                markers: false,
            }
        });
}


const animate = () => {
    animateProgress();
    horizontalTextAnimation();
    animateHidingSection();
    changeYear();
};

animate();

