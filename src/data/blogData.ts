import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// const sampleTitles = [
//   'Revolutionizing Remote Work',
//   'Designing for the Future',
//   'The Power of AI Tools',
//   'Building Scalable Applications',
//   'Unlocking Creativity with Code',
//   'Startup Lessons Learned',
//   'The Future of Tech Education',
//   'How We Built Our MVP in 2 Weeks',
//   'The Hidden Costs of Innovation',
//   'Why UI/UX Matters More Than Ever',
// ];

// const sampleDescriptions = [
//   'Explore the latest strategies and stories behind our success.',
//   'Learn how to apply emerging tech in everyday life.',
//   'Insights into how design thinking shapes our product.',
//   'From idea to launch, this is how we did it.',
//   'Discover lessons from building real-world applications.',
//   'Get inspired by innovation from around the world.',
//   'Our team shares what worked—and what didn’t.',
//   'Behind the scenes of our most challenging projects.',
//   'Tips for staying productive and creative at the same time.',
//   'Interviews, insights, and innovation all in one post.',
// ];


// async function fetchBlogData() {
  
//   return Array.from({ length: 23 }).map((_, i) => {
//     const title = sampleTitles[Math.floor(Math.random() * sampleTitles.length)];
//     const description =
//       sampleDescriptions[Math.floor(Math.random() * sampleDescriptions.length)] +
//       ' ' +
//       sampleDescriptions[Math.floor(Math.random() * sampleDescriptions.length)];

//     return {
//       title,
//       description,
//       media: `https://picsum.photos/800/${300 + Math.floor(Math.random() * 150)}?random=${i}`,
//       video: "https://www.youtube.com/embed/9XrGxYMu9P8",
//       tag: ['Tech', 'Creativity', 'Life', 'Startup'][i % 4],
//       authors: [
//         {
//           name: ['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Prince'][Math.floor(Math.random() * 4)],
//           avatar: `/static/images/avatar/${Math.floor(Math.random() * 4) + 1}.jpg`,
//         },
//       ],
//       date: new Date(
//         Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365)
//       )
//         .toISOString()
//         .split('T')[0],
//       sections: [
//         {
//           title: "Getting Started",
//           content: "VS Code is a text editor that can be used for:",
//           image: null,
//           list: [{"Why choose Flask?": "Flask is easy to learn and use, making it ideal for beginners."},
//             {"Flask's simplicity and power": "Flask provides a minimalistic approach, allowing developers to build applications quickly."},
//             {"Key features of Flask: routing, templates, and extensions": "Flask supports URL routing, Jinja2 templating, and a wide range of extensions for added functionality."},
//             {"Use cases for Flask: small projects, APIs, and microservices": "Flask is suitable for small projects, RESTful APIs, and microservices."}],
//         },
//         {
//           title: "Second Section",
//           content: "This is more about VS Code extensions.",
//           image: `https://picsum.photos/800/${300 + Math.floor(Math.random() * 150)}?random=${i * 3}`,
//           list: null,
//         },
//       ],
//       views: 10,
//       likes: 23,
//       dislikes: 3,
//       id: i,
//     };
//   }).sort((a, b) => a.title.localeCompare(b.title));
// }


// export const blogData = await fetchBlogData();


async function fetchBlogDataFromAPI() {
  try {
    const response = await axios.get(`${API_URL}/api/blog/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return [];
  }
}

export const blogData = await fetchBlogDataFromAPI();