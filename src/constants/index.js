import {
  benefitImage2,
  discordBlack,
  facebook,
  file02,
  homeSmile,
  instagram,
  notification2,
  notification3,
  notification4,
  plusSquare,
  roadmap2,
  roadmap3,
  searchMd,
  telegram,
  twitter,
  meerutCollege,
} from "../assets";

import { 
  faStickyNote,
  faPaperPlane, 
  faCompass, 
  faComments, 
  faSchool, 
  faVideo, 
  faImage, 
  faFileAlt 
} from '@fortawesome/free-solid-svg-icons';

export const navigation = [
  {
    id: "0",
    title: "Explore",
    url: "#explore",
  },
  {
    id: "1",
    title: "Notes",
    url: "#notes",
  },
  {
    id: "2",
    title: "colleges",
    url: "#colleges",
  },
  {
    id: "3",
    title: "How to use (FAQ)",
    url: "#how-to-use",
  },
  {
    id: "4",
    title: "New account",
    url: "/signup",
    onlyMobile: true,
  },
  {
    id: "5",
    title: "Log in",
    url: "/login",
    onlyMobile: true,
  },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];

export const featureIcons = [
  { icon: faStickyNote, label: "Upload and Download Notes" },
  { icon: faPaperPlane, label: "Post Your Vibe" },
  { icon: faCompass, label: "Explore Possibilities" },
  { icon: faComments, label: "Chat with Friends" }, 
  { icon: faSchool, label: "Find Colleges" }
];



export const clgvibeServices = [
  "Post Photos and Video",
  "Upload and Download Notes",
  "Study Together",
];

export const clgvibeServicesIcons = [
  faVideo,
  faImage,
  faComments,
  faFileAlt,
  faStickyNote,
];

export const roadmap = [
  {
    id: "0",
    title: " Chatting and Sharing",
    text: "Enable users to chat and share videos and photos seamlessly within the app.",
    date: "Aug 2025",
    status: "done",
    imageUrl: roadmap3,
    colorful: true,
  },
  {
    id: "1",
    title: "Studying and Playing Together",
    text: "Create virtual study/play rooms where users can collaborate, learn and play together.",
    date: "Aug 2025",
    status: "progress",
    imageUrl: roadmap2,
  },
  {
    id: "2",
    title: "Login with Other Platforms",
    text: "Enable users to log in using various social media and educational platforms for easier access.",
    date: "Aug 2025",
    status: "done",
    imageUrl: roadmap3,
  },
  {
    id: "3",
    title: "Chatbot Integration",
    text: "Introduce a chatbot to assist users with their questions and enhance their experience.",
    date: "Aug 2025",
    status: "progress",
    imageUrl: roadmap2,
  },
];


export const collabText =
  "Chat easily with friends from different colleges! Our smart features and strong security make it simple to collaborate and stay connected, no matter where you are.";


export const collabContent = [
  {
    id: "0",
    title: "Effortless Communication",
    text: collabText,
  },
  {
    id: "1",
    title: "Intelligent Features",
  },
  {
    id: "2",
    title: "Robust Protection",
  },
];
  

export const collabApps = [
  {
    id: "0",
    title: "Meerut College",
    icon: meerutCollege,
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "Meerut College",
    icon: meerutCollege,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "Meerut College",
    icon: meerutCollege,
    width: 36,
    height: 28,
  },
  {
    id: "3",
    title: "Meerut College",
    icon: meerutCollege,
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "Meerut College",
    icon: meerutCollege,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "Meerut College",
    icon: meerutCollege,
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "Meerut College",
    icon: meerutCollege,
    width: 26,
    height: 34,
  },
  {
    id: "7",
    title: "Meerut College",
    icon: meerutCollege,
    width: 38,
    height: 32,
  },
];

export const benefits = [
  {
    id: "0",
    title: "Upload and Download Notes",
    text: "Easily share and manage notes with peers, ensuring everyone stays informed.",
    backgroundUrl: "./src/assets/benefits/card-2.svg",
    iconUrl: faStickyNote,
    imageUrl: benefitImage2,
  },
  {
    id: "1",
    title: "Post Photos and Videos",
    text: "Share your experiences through photos and videos, creating a vibrant community.",
    backgroundUrl: "./src/assets/benefits/card-2.svg",
    iconUrl: faPaperPlane,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "2",
    title: "Explore Possibilities",
    text: "Discover new opportunities and resources available in your college and beyond.",
    backgroundUrl: "./src/assets/benefits/card-3.svg",
    iconUrl: faCompass,
    imageUrl: benefitImage2,
  },
  {
    id: "3",
    title: "Chat with Friends",
    text: "Stay connected with friends through real-time chat, enhancing your college experience.",
    backgroundUrl: "./src/assets/benefits/card-4.svg",
    iconUrl: faComments,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "4",
    title: "Find Colleges",
    text: "Search and discover colleges that fit your needs and aspirations.",
    backgroundUrl: "./src/assets/benefits/card-5.svg",
    iconUrl: faSchool,
    imageUrl: benefitImage2,
  },
  {
    id: "5",
    title: "Connect Everywhere",
    text: "Access resources and support from anywhere, making your educational journey seamless.",
    backgroundUrl: "./src/assets/benefits/card-6.svg",
    iconUrl: faPaperPlane,
    imageUrl: benefitImage2,
  },
];

export const socials = [
  {
    id: "0",
    title: "Discord",
    iconUrl: discordBlack,
    url: "#",
  },
  {
    id: "1",
    title: "Twitter",
    iconUrl: twitter,
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "#",
  },
  {
    id: "3",
    title: "Telegram",
    iconUrl: telegram,
    url: "#",
  },
  {
    id: "4",
    title: "Facebook",
    iconUrl: facebook,
    url: "#",
  },
];

// Login Carousel Data
export const LoginCarouselData = [
  {
    image: roadmap2,
    text: "Post image, text and videos",
  },
  {
    image: roadmap3,
    text: "Chat with friends",
  },
  {
    image: roadmap2,
    text: "Download and upload 'Notes'",
  }
];

export const getRandomDarkGradientColors = (numColors = 2) => {
  const colors = [];

  for (let i = 0; i < numColors; i++) {
    const r = Math.floor(Math.random() * 128); // 0-127
    const g = Math.floor(Math.random() * 128); // 0-127
    const b = Math.floor(Math.random() * 128); // 0-127
    colors.push(`rgb(${r}, ${g}, ${b})`);
  }

  return `linear-gradient(to bottom right, ${colors.join(', ')})`;
};
