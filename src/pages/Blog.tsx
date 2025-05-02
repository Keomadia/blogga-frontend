import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Button,
  Chip,
  Pagination,
  IconButton,
  FormControl,
  Typography,
  InputAdornment,
  OutlinedInput
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';
import Masonry from '@mui/lab/Masonry';
import { useNavigate } from 'react-router-dom';

import BlogCard from '../components/BlogCard';
import DefaultLayout from '../layouts/default';
import { fetchBlogDataFromAPI } from '../data/fetchBlogDataFromAPI'; 
import { siteConfig } from '../config/site';
import { NewsletterPopup } from '../components/Newsletter';
import { LoadingSkeleton } from '../components/LoadingSkeleton';

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
  const [blogs, setBlogs] = useState<any[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All categories');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBlogDataFromAPI();
      setBlogs(data);
    };
    fetchData();
    setTimeout(() => {
      setLoading(false);
    }, 4000);
    
  }, []);

  useEffect(() => {
    let filtered = blogs;

    if (selectedCategory !== 'All categories') {
      filtered = filtered.filter(blog => blog.tag === selectedCategory);
    }

    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBlogs(filtered);
    setPage(1);
  }, [blogs, selectedCategory, searchTerm]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const triggerPoint = document.body.scrollHeight * 0.8;
      if (scrollPosition >= triggerPoint) {
        setShowNewsletterPopup(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const paginatedPosts = filteredBlogs.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  );

  
  return (
    <DefaultLayout>
      {showNewsletterPopup && <NewsletterPopup />}

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column-reverse', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'start', md: 'center' }, gap: 4, py: 6 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Chip label="All categories" variant={selectedCategory === 'All categories' ? 'filled' : 'outlined'} onClick={() => setSelectedCategory('All categories')} />
          {siteConfig.categories.map((category) => (
            <Chip key={category} label={category} variant={selectedCategory === category ? 'filled' : 'outlined'} onClick={() => setSelectedCategory(category)} />
          ))}
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Search onSearch={setSearchTerm} />
          <IconButton aria-label="RSS feed"><RssFeedRoundedIcon /></IconButton>
        </Box>
      </Box>
      { loading ? <LoadingSkeleton skeletonType='default'/>
      : filteredBlogs.length === 0 ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, height: '20vh' }}>
          <Typography variant="h5">No blogs found for {selectedCategory}</Typography>
          <Button variant="outlined" onClick={() => setSelectedCategory('All categories')}>Blog</Button>
        </Box>
      ) : (
        <Container sx={{ py: 6 }}>
          <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={3}>
            {paginatedPosts.map((post, index) => (
              <div key={index}>
                <BlogCard {...post} />
              </div>
            ))}
          </Masonry>
          <Pagination
            count={Math.ceil(filteredBlogs.length / POSTS_PER_PAGE)}
            page={page}
            onChange={(_, value) => setPage(value)}
            sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}
          />
        </Container>
      )}
    </DefaultLayout>
  );
}
