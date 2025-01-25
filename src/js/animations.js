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

const animateBackgroundPaths = () => {
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
}

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

const animateHeader = () => {
    const timelineHeader = gsap.timeline({ defaults: { duration: 1, ease: "power3.out" } });

    timelineHeader
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
            { y: 100, opacity: 0 },
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

const animateIntro = () => {
    // Map
    gsap.fromTo(
        ".intro__map",
        { x: "-130%" },
        {
            x: "0%",
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".intro__map",
                start: "top center",
                end: "+=1",
                markers: false,
            }
        }
    );

    const introMapTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".intro__map",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            markers: false,
        },
    });

    introMapTl
        .fromTo(
            ".map__svg",
            { y: "10%" },
            { y: "30%", ease: "none", duration: 1 },
            "<"
        )
        .fromTo(
            ".map__img",
            { y: "30%" },
            { y: "10%", ease: "none", duration: 1 },
            "<"
        );

    // Splash
    gsap.fromTo(".intro__splash",
        {
            y: "15%"
        },
        {
            y: "-15%",
            ease: "none",
            scrollTrigger: {
                trigger: ".intro__splash",
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
            },
        });

    // Bell
    gsap.fromTo(
        ".intro__bell",
        { x: "130%" },
        {
            x: "0%",
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".intro__bell",
                start: "bottom bottom",
                end: "+=1",
                markers: false,
            }
        }
    );

    const introBellTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".intro__bell",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            markers: false,
        },
    });

    introBellTl
        .fromTo(
            ".bell__svg",
            { y: "-10%" },
            { y: "10%", ease: "none", duration: 1 },
            "<"
        )
        .fromTo(
            ".bell__img",
            { y: "10%" },
            { y: "-10%", ease: "none", duration: 1 },
            "<"
        );

}

const animateProfile = () => {
    const tlProfile = gsap.timeline({
        scrollTrigger: {
            trigger: ".profile",
            scrub: 0.5,
            markers: false,
        },
    });

    tlProfile.fromTo(
        ".profile",
        {
            y: "15%",
        },
        {
            y: '-5%',
        }
    )

    const $profileName = document.querySelector(".profile__name");
    const fullName = $profileName.innerText;

    gsap.fromTo($profileName,
        { text: "" },
        {
            duration: 3,
            text: fullName,
            scrollTrigger: {
                trigger: ".profile",
                start: "top center",
                end: "+=1",
                markers: false,
            }
        }
    )
}
animateProfile();

const animateHumanists = () => {

    //Img
    gsap.fromTo(
        ".humanists__graphic",
        { x: "130%" },
        {
            x: "0%",
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".humanists__graphic",
                start: "center bottom",
                end: "+=1",
                markers: false,
            }
        }
    );

    const humanistsImgTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".humanists__graphic",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            markers: false,
        },
    });

    humanistsImgTl
        .fromTo(
            ".humanists__svg",
            { y: "-15%" },
            { y: "5%", ease: "none", duration: 1 },
            "<"
        )
        .fromTo(
            ".humanists__imgs",
            { y: "15%" },
            { y: "-5%", ease: "none", duration: 1 },
            "<"
        );
};
animateHumanists();

const animateReformation = () => {

    // Circle
    // const tlReformation = gsap.timeline({
    //     scrollTrigger: {
    //         trigger: ".reformation",
    //         scrub: 0.5,
    //         markers: true,
    //     },
    // });

    // tlReformation.fromTo(
    //     ".reformation",
    //     {
    //         marginBlockStart: "5%",
    //     },
    //     {
    //         marginBlockStart: '-70%',

    //     }
    // )

    //Img
    gsap.fromTo(
        ".reformation__graphic",
        { x: "-150%" },
        {
            x: "0%",
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".reformation__graphic",
                start: "center bottom",
                end: "+=1",
                markers: true,
            }
        }
    );

    const reformationImgTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".reformation__graphic",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            markers: false,
        },
    });

    reformationImgTl
        .fromTo(
            ".reformation__svg",
            { y: "-10%" },
            { y: "10%", ease: "none", duration: 1 },
            "<"
        )
        .fromTo(
            ".reformation__imgs",
            { y: "10%" },
            { y: "-10%", ease: "none", duration: 1 },
            "<"
        );

}
animateReformation();

const animateStrategy = () => {
    const tlStrategy = gsap.timeline({
        scrollTrigger: {
            trigger: ".strategy",
            start: "center bottom",
            markers: false,
            duration: 2,
        },
    });

    document.querySelectorAll(".card").forEach((card) => {
        tlStrategy.fromTo(
            card,
            {
                opacity: 0,
                scale: 0.5,
            },
            {
                opacity: 1,
                scale: 1,
                ease: "power2.out",
            }
        );
    });
}

const animatePrinting = () => {
    //Img
    gsap.fromTo(
        ".printing__graphic",
        { x: "150%" },
        {
            x: "0%",
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".printing__graphic",
                start: "center bottom",
                end: "+=1",
                markers: false,
            }
        }
    );

    const printingImgTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".printing__graphic",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            markers: true,
        },
    });

    printingImgTl
        .fromTo(
            ".printing__svg",
            { y: "-10%" },
            { y: "10%", ease: "none", duration: 1 },
            "<"
        )
        .fromTo(
            ".printing__img",
            { y: "10%" },
            { y: "-10%", ease: "none", duration: 1 },
            "<"
        );
}

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

const animateHeretics = () => {
    //Img
    gsap.fromTo(
        ".heretics__graphic",
        { x: "-150%" },
        {
            x: "0%",
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".heretics__graphic",
                start: "center bottom",
                end: "+=1",
                markers: true,
            }
        }
    );

    const hereticsImgTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".heretics__graphic",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            markers: false,
        },
    });

    hereticsImgTl
        .fromTo(
            ".heretics__svg",
            { y: "-10%" },
            { y: "10%", ease: "none", duration: 1 },
            "<"
        )
        .fromTo(
            ".heretics__img",
            { y: "10%" },
            { y: "-10%", ease: "none", duration: 1 },
            "<"
        );
}

const animateChoiceSection = () => {
    // Img
    gsap.fromTo(
        ".choice__graphic",
        { opacity: "0", scale: "0.5" },
        {
            opacity: 1,
            scale: 1,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".choice__graphic",
                start: "center bottom",
                end: "+=1",
                markers: true,
            }
        }
    );

    const choiceImgTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".choice__graphic",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            markers: false,
        },
    });

    choiceImgTl
        .fromTo(
            ".choice__svg",
            { y: "-10%" },
            { y: "10%", ease: "none", duration: 1 },
            "<"
        )
        .fromTo(
            ".choice__img",
            { y: "10%" },
            { y: "-10%", ease: "none", duration: 1 },
            "<"
        );

    // Options
    const tlChoice = gsap.timeline({
        scrollTrigger: {
            trigger: ".choice__list",
            start: "center bottom",
            markers: false,
            duration: 2,
        },
    });

    document.querySelectorAll(".choice__option").forEach((option) => {
        tlChoice.fromTo(
            option,
            {
                opacity: 0,
                scale: 0.5,
            },
            {
                opacity: 1,
                scale: 1,
                ease: "power2.out",
            }
        );
    });
}

const animateHidingSection = () => {

    // Background
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

    // Img 
    gsap.fromTo(
        ".hiding__graphic",
        { x: "150%" },
        {
            x: "0%",
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".hiding__graphic",
                start: "center bottom",
                end: "+=1",
                markers: false,
            }
        }
    );

    const hidingImgTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".hiding__graphic",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            markers: true,
        },
    });

    hidingImgTl
        .fromTo(
            ".hiding__svg",
            { y: "-10%" },
            { y: "10%", ease: "none", duration: 1 },
            "<"
        )
        .fromTo(
            ".hiding__imgs",
            { y: "10%" },
            { y: "-10%", ease: "none", duration: 1 },
            "<"
        );
}

const animateEndingSection = () => {
    //Img
    gsap.fromTo(
        ".ending__graphic",
        { x: "-150%" },
        {
            x: "0%",
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".ending__graphic",
                start: "center bottom",
                end: "+=1",
                markers: true,
            }
        }
    );

    const endingImgTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".ending__graphic",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            markers: false,
        },
    });

    endingImgTl
        .fromTo(
            ".ending__svg",
            { y: "-10%" },
            { y: "10%", ease: "none", duration: 1 },
            "<"
        )
        .fromTo(
            ".ending__img",
            { y: "10%" },
            { y: "-10%", ease: "none", duration: 1 },
            "<"
        );
}


const animate = () => {
    animateBackgroundPaths();
    animateHeader();
    animateIntro();
    animateStrategy();
    animatePrinting();
    animateHeretics();
    animateChoiceSection();
    animateEndingSection();
    animateProgress();
    animateIntro();
    horizontalTextAnimation();
    animateHidingSection();
    changeYear();
    // animateProfile();
    // animateHumanists();
    // animateReformation();
};

animate();

