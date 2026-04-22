// src/data/constants.js

// Work experience history
export const MY_EXPERIENCE = [
  {
    id: "exp-1",
    company: "Strativ AB",
    role: "Software Engineer (Frontend)",
    period: "Dec 2024 - Present",
  },
  {
    id: "exp-2",
    company: "Epikcoders",
    role: "Frontend Developer",
    period: "Oct 2023 - Nov 2024",
  },
  {
    id: "exp-3",
    company: "Anchorblock Technology",
    role: "Frontend Engineer",
    period: "Oct 2022 - Sep 2023",
  },
  {
    id: "exp-4",
    company: "Branex IT",
    role: "Frontend Developer (Part-time)",
    period: "Jan 2022 - Oct 2022",
  },
];

// Skills organized by type
export const STACK = [
  {
    category: "Frameworks",
    items: [
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
      { name: "Sass", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg" },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "GSAP", icon: "https://cdn.worldvectorlogo.com/logos/gsap-greensock.svg" }, 
      { name: "Framer Motion", icon: "https://pagepro.co/blog/wp-content/uploads/2020/03/framer-motion.png" },
    ],
  },
];

// Career highlights
export const CAREER_STATS = [
  { value: "1+", label: "Year of Experience" },
  { value: "5+", label: "Projects" },
  { value: "5K+", label: "Hours" },
];

// Featured projects
export const SELECTED_PROJECTS = [
  {
    id: "01.",
    title: "Travel Advisor",
    stack: ["React", "Tailwind CSS", "shadcn/ui"],
    link: "https://travel-advisor-ebon.vercel.app/",
    image: "src/assets/Project_images/travel-advisor.webp"
  },
  {
    id: "02.",
    title: "EatEasy",
    stack: ["React", "Tailwind CSS"],
    link: "https://eat-easy-psi.vercel.app/",
    image: "src/assets/Project_images/eat-easy.webp"
  },
  {
    id: "03.",
    title: "2048 Game",
    stack: ["HTML", "JavaScript", "Tailwind CSS"],
    link: "https://2048-eight-indol.vercel.app/",
    image: "src/assets/Project_images/2048.webp"
  },
  {
    id: "04.",
    title: "Guess Game",
    stack: ["React", "Tailwind CSS"],
    link: "https://react-work-theta.vercel.app/",
    image: "src/assets/Project_images/guessgame.webp"
  },
  {
    id: "05.",
    title: "Tic-Tac-Toe",
    stack: ["HTML", "JavaScript", "Tailwind CSS"],
    link: "https://xo-one-zeta.vercel.app/",
    image: "src/assets/Project_images/xo.webp"
  }
];

// Social and contact links
export const LINKS = {
  github: "https://github.com/Divine-Adeyemi",
  linkedin: "https://www.linkedin.com/in/divine-adeyemi-6b92952b7",
  email: "mailto:divineadevemi2006@gmail.com",
};
