import { useState,useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Pagination from '@mui/material/Pagination';
import IconButton from '@mui/material/IconButton';
import Masonry from '@mui/lab/Masonry';
import BlogCard from '../components/BlogCard';
import DefaultLayout from '../layouts/default';
import { blogData } from '../data/blogData';
import { siteConfig } from '../config/site';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';
import { NewsletterPopup } from '../components/Newsletter';
import { useNavigate } from 'react-router-dom';

const POSTS_PER_PAGE = 6;

export function Search({ onSearch }: { onSearch: (value: string) => void }) {
  return (
    <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
      <OutlinedInput
        size="small"
        placeholder="Search…"
        onChange={(e) => onSearch(e.target.value)}
        startAdornment={
          <InputAdornment position="start">
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
      />
    </FormControl>
  );
}



export default function Blog() {

  const [selectedCategory, setSelectedCategory] = useState<string>('All categories');
  const [blogs, setBlogs] = useState(blogData); 
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  
  const navigate = useNavigate();
  useEffect(() => {
    let filtered = blogData;
  
    if (selectedCategory !== 'All categories') {
      filtered = filtered.filter((blog:any) => blog.tag === selectedCategory);
    }
  
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter((blog:any) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  
    setPage(1); // Reset to page 1 when filters change
    setBlogs(filtered);
  }, [searchTerm, selectedCategory]);
  
  
    
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const triggerPoint = document.body.scrollHeight * 0.6;
      if (scrollPosition >= triggerPoint) {
        setShowNewsletterPopup(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false);


    const handleClick = (category: string) => {
      setSelectedCategory(category);
      const filteredBlogs = category === 'All categories'
        ? blogData
        : blogData.filter((blog:any) => blog.tag === category);
      setBlogs(filteredBlogs);
    };


  

  const handleChange = (_: any, value: number) => {
    setPage(value);
  };

  const paginatedPosts = blogs.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  );
  
  console.log('paginatedPosts', paginatedPosts);

  return (

    <DefaultLayout>
      {showNewsletterPopup && <NewsletterPopup />}
      
    <Box sx={{display: 'flex',flexDirection: { xs: 'column-reverse', md: 'row' },width: '100%',justifyContent: 'space-between',alignItems: { xs: 'start', md: 'center' },gap: 4,overflow: 'auto',py: 6 ,}}>
          <Box sx={{display: 'inline-flex',flexDirection: 'row',gap: 3,overflow: 'auto',}}>
          <Chip onClick={() => handleClick('All categories')} size="medium" label="All categories" variant={selectedCategory === 'All categories' ? 'filled' : 'outlined'} />
            {siteConfig.categories.map((category, index) => (<Chip key={`${category}-${index}`} onClick={() => handleClick(category)} size="medium" label={category} variant={selectedCategory === category ? 'filled' : 'outlined'}/> ))}
  
          
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'flex' },flexDirection: 'row',gap: 1,width: { xs: '100%', md: 'fit-content' },overflow: 'auto',}}>
          <Search onSearch={setSearchTerm} />
            <IconButton size="small" aria-label="RSS feed">
              <RssFeedRoundedIcon />
            </IconButton>
          </Box>
    </Box>

    { blogs.length === 0 && (
        <Box sx={{ display: 'flex',flexDirection:'column', alignItems: 'center', gap: '30px', height: '10vh' }}>
          <Typography variant='h3'>No blogs found</Typography>
          <Button variant='outlined' onClick={() => {navigate('/blog')}}>Blog</Button>
        </Box>
      )}

      
      <Container sx={{ py: 6 }}>
        <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={3}>
          {paginatedPosts.map((post:any, index:number) => (
            <div key={index}>
              <BlogCard {...post}  />
            </div>
          ))}
        </Masonry>
        <Pagination
          count={Math.ceil(blogs.length / POSTS_PER_PAGE)}
          page={page}
          onChange={handleChange}
          sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}
        />

      </Container>
    </DefaultLayout>
  );
}
      
    
 
