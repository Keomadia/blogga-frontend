export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "My Blog",
  description: "Read Exciting blog posts about lifestyle and Tech.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navItemsSec: [
    {
      label: "Sign in",
      href: "/login",
    },
    {
      label: "Sign up",
      href: "/register",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/keomadia",
    youtube: "https://youtube.com",
    linkedin: "https://www.linkedin.com/in/keomadi-anyankah-1723a5306/",
    discord: "https://discord.gg/",
  },
  categories: [
    'Tech',
    'Lifestyle',
    'Health',
    'Education',
    'Travel',
    'Finance',
    'Food',
    'Entertainment',
    'Sports',
    'Culture',
  ],
};
