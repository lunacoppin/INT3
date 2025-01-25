import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

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

// const animateHeader = () => {
//     const $heroTitle = document.querySelector(".hero__title");
//     const fullTitle = $heroTitle.innerText;

//     gsap.fromTo($heroTitle,
//         {
//             textContent: "",
//             opacity: 0
//         },
//         {
//             duration: 2,
//             opacity: "100%",
//             textContent: fullTitle, onUpdate: function () {
//                 fullTitle.innerHTML = fullTitle.slice(0, Math.ceil(this.progress() * fullTitle.length));
//             }
//         });
// }

const animateHeader = () => {
    // const $heroTitleTop = document.querySelector(".hero__title--top");
    // const fullTitleTop = $heroTitleTop.innerText;
    // const $heroTitleBottom = document.querySelector(".hero__title--bottom");
    // const fullTitleBottom = $heroTitleBottom.innerText;

    // var tlHeader = gsap.timeline();


    // tlHeader.fromTo(
    //     $heroTitleTop,
    //     {
    //         text: "", // Start with empty text

    //     },
    //     {
    //         duration: 1,
    //         text: fullTitleTop, // Animate to the full title
    //     }
    // )
    //     .fromTo(
    //         $heroTitleBottom,
    //         {
    //             text: "", // Start with empty text

    //         },
    //         {
    //             duration: 1,
    //             text: fullTitleBottom, // Animate to the full title
    //         }
    //     );

    const timeline = gsap.timeline({ defaults: { duration: 1, ease: "power3.out" } });

    // Graphic Element
    timeline
        .fromTo(
            ".graphic__img",
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1 },
            "<0.5"
        )
        .fromTo(
            ".graphic__svg",
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.5 },
            "<0.3"
        )
        .fromTo(
            ".hero__title--top",
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1 },
            "<0.6"
        )
        .fromTo(
            ".hero__title--bottom",
            { y: 100,  opacity: 0 },
            { y: 0, opacity: 1 },
            "<0.4" // Slight overlap with the top title animation
        )
        .fromTo(
            ".hero__subtitle",
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1 },
            "<0.6"
        )
        .fromTo(
            ".hero__note",
            { x: 50, opacity: 0 },
            { x: 0, opacity: 1 },
            "<0.6"
        )
        .fromTo(".draw-header-path",
            {
                opacity: 0
            },
            {
                opacity: 1,
                duration: 5,
            },
            "<1"
        );

    // const $headerPath = document.querySelector(".draw-header-path");
    // const headerPathLength = $headerPath.getTotalLength();

    // // Set initial strokeDasharray and strokeDashoffset
    // $headerPath.style.strokeDasharray = "30, 20";
    // $headerPath.style.strokeDashoffset = headerPathLength;

    // // GSAP ScrollTrigger animation
    // timeline.fromTo($headerPath,
    //     {
    //         opacity: 0
    //     },
    //     {
    //         opacity: 1,
    //         duration: 2,
    //     });

    // timeline.to($headerPath, 
    //     {
    //     strokeDashoffset: 0, // Animate the strokeDashoffset from full length to 0
    //     duration: 15,         // Duration of the animation
    //     ease: , // Smooth easing
    //     repeat: -1,          // Loop infinitely
    // });
};


const changeYear = () => {
    const tlYear = gsap.timeline({
        scrollTrigger: {
            trigger: ".intro__year",
            start: "top center",
            end: "bottom center-=10%",
            scrub: 1,
            markers: false,
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
        {
            height: '0'
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
    animateHeader();
};

animate();

