import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';
import LogoText from '../components/LogoText';
import {siteConfig} from '../config/site';
import { fetchBlogDataFromAPI } from '../data/fetchBlogDataFromAPI'; 
import { useNavigate } from 'react-router';

function getRandomBlogs(blogData: any[], count: number): any[] {
  const shuffled = [...blogData].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}


const SyledCard = styled(Card)(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  backgroundColor: "#fff",
  '&:hover': {
    backgroundColor: 'transparent',
    cursor: 'pointer',
    boxShadow: '10px 40px 80px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.6s ease-in-out',
    transform : 'scale(1.01)',
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(209, 35.60%, 29.20%, 0.50)',
    outlineOffset: '2px',
  },
}));

const SyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 16,
  flexGrow: 1,
  '&:last-child': {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});


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


export default function MainContent() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All categories');
  const [blogData, setBlogData] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBlogDataFromAPI();
      setBlogData(data);
    };
    fetchData();
  }, []);


  const [randomBlogs, setRandomBlogs] = React.useState(getRandomBlogs(blogData, 6));
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredBlogs, setFilteredBlogs] = React.useState(blogData);
  const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(null,);

  const navigate = useNavigate();

  React.useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim() === '') {
        setFilteredBlogs(blogData);
        setRandomBlogs(getRandomBlogs(blogData, 6));
      } else {
        const filtered = blogData.filter((blog:any) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBlogs(filtered);
        setRandomBlogs(getRandomBlogs(filteredBlogs, 6));
      }
    }, 500); 
  
    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);
  

  

  const handleFocus = (index: number) => {setFocusedCardIndex(index);};
  const handleBlur = () => {setFocusedCardIndex(null);};
  const handleClick = (category: string) => {
    setSelectedCategory(category);
    const filteredBlogs = category === 'All categories'
      ? blogData
      : blogData.filter((blog:any) => blog.tag === category);
    setRandomBlogs(getRandomBlogs(filteredBlogs, 6));
  };
  

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4  }}>
      <div>
        <LogoText varian='h1' />
      </div>
       <Box sx={{ display: { xs: 'flex', sm: 'none' },flexDirection: 'row',gap: 1,width: { xs: '100%', md: 'fit-content' },overflow: 'auto',}}>
       <Search onSearch={setSearchTerm} />
        <IconButton size="small" aria-label="RSS feed">
        </IconButton>
      </Box>
      <Box sx={{display: 'flex',flexDirection: { xs: 'column-reverse', md: 'row' },width: '100%',justifyContent: 'space-between',alignItems: { xs: 'start', md: 'center' },gap: 4,overflow: 'auto',}}>
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
      <Grid container spacing={2} columns={12}>
        {randomBlogs.length === 0 && <Grid size={{ xs: 12, md: 12 }}>
          <Typography gutterBottom variant="h3" component="div">No Matching Blogs found</Typography>
          <Button variant='outlined' onClick={() => navigate('/blog')}>Blog</Button>
        </Grid>}
        
        {randomBlogs.length > 0 && <Grid size={{ xs: 12, md: 6 }}>
          <SyledCard variant="outlined" onClick={() => navigate(`/blog/${randomBlogs[0].id}`)} onFocus={() => handleFocus(0)} onBlur={handleBlur} tabIndex={0} className={focusedCardIndex === 0 ? 'Mui-focused' : ''}>
            <CardMedia component="img" alt={randomBlogs[0].title} image={randomBlogs[0].media}sx={{aspectRatio: '16 / 9',borderBottom: '1px solid',borderColor: 'divider',}}/>
            <SyledCardContent>
              <Typography gutterBottom variant="caption" component="div">{randomBlogs[0].tag}</Typography>
              <Typography gutterBottom variant="h6" component="div">{randomBlogs[0].title}</Typography>
              <StyledTypography variant="body2" color="text.secondary" gutterBottom>{randomBlogs[0].description}</StyledTypography>
            </SyledCardContent>
            <Box sx={{ display: 'flex',flexDirection: 'row',gap: 2,alignItems: 'center',justifyContent: 'space-between',padding: '16px', }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                <Avatar sx={{ width: 24, height: 24 }}>{randomBlogs[0].authors.charAt(0).toUpperCase()}</Avatar>
                <Typography variant="caption">{randomBlogs[0].authors}</Typography>
              </Box>
              <Typography variant="caption">{randomBlogs[0].date}</Typography>
            </Box>
          </SyledCard>
        </Grid>}
        {randomBlogs.length > 1 && <Grid size={{ xs: 12, md: 6 }}>
          <SyledCard variant="outlined" onClick={() => navigate(`/blog/${randomBlogs[1].id}`)} onFocus={() => handleFocus(1)} onBlur={handleBlur} tabIndex={0} className={focusedCardIndex === 1 ? 'Mui-focused' : ''}>
            <CardMedia component="img" alt={randomBlogs[1].title} image={randomBlogs[1].media} aspect-ratio="16 / 9"sx={{ borderBottom: '1px solid',borderColor: 'divider',}}/>
            <SyledCardContent>
              <Typography gutterBottom variant="caption" component="div">{randomBlogs[1].tag}</Typography>
              <Typography gutterBottom variant="h6" component="div">{randomBlogs[1].title}</Typography>
              <StyledTypography variant="body2" color="text.secondary" gutterBottom>{randomBlogs[1].description}</StyledTypography>
            </SyledCardContent>
            <Box sx={{ display: 'flex',flexDirection: 'row',gap: 2,alignItems: 'center',justifyContent: 'space-between',padding: '16px', }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                <Avatar sx={{ width: 24, height: 24 }}>{randomBlogs[1].authors.charAt(0).toUpperCase()}</Avatar>
                <Typography variant="caption">{randomBlogs[1].authors}</Typography>
              </Box>
              <Typography variant="caption">{randomBlogs[1].date}</Typography>
            </Box>
          </SyledCard>
        </Grid>}
        {randomBlogs.length > 2 && <Grid size={{ xs: 12, md: 4 }}>
          <SyledCard variant="outlined" onClick={() => navigate(`/blog/${randomBlogs[2].id}`)} onFocus={() => handleFocus(2)} onBlur={handleBlur} tabIndex={0} className={focusedCardIndex === 2 ? 'Mui-focused' : ''} sx={{ height: '100%' }} >
            <CardMedia component="img" alt={randomBlogs[2].title} image={randomBlogs[2].media} sx={{ height: { sm: 'auto', md: '50%' },aspectRatio: { sm: '16 / 9', md: '' },}} />
            <SyledCardContent>
              <Typography gutterBottom variant="caption" component="div">{randomBlogs[2].tag}</Typography>
              <Typography gutterBottom variant="h6" component="div">{randomBlogs[2].title}</Typography>
              <StyledTypography variant="body2" color="text.secondary" gutterBottom>{randomBlogs[2].description}</StyledTypography>
            </SyledCardContent>
            <Box sx={{ display: 'flex',flexDirection: 'row',gap: 2,alignItems: 'center',justifyContent: 'space-between',padding: '16px', }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                <Avatar sx={{ width: 24, height: 24 }}>{randomBlogs[2].authors.charAt(0).toUpperCase()}</Avatar>
                <Typography variant="caption">{randomBlogs[2].authors}</Typography>
              </Box>
              <Typography variant="caption">{randomBlogs[2].date}</Typography>
            </Box>
          </SyledCard>
        </Grid>}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}> 
            {randomBlogs.length > 3 && <SyledCard variant="outlined" onClick={() => navigate(`/blog/${randomBlogs[3].id}`)} onFocus={() => handleFocus(3)} onBlur={handleBlur} tabIndex={0} className={focusedCardIndex === 3 ? 'Mui-focused' : ''} sx={{ height: '100%' }}>
              <SyledCardContent sx={{ display: 'flex', flexDirection: 'column',justifyContent: 'space-between',height: '100%',}}>
                <div>
                  <Typography gutterBottom variant="caption" component="div">{randomBlogs[3].tag}</Typography>
                  <Typography gutterBottom variant="h6" component="div">{randomBlogs[3].title}</Typography>
                  <StyledTypography variant="body2" color="text.secondary" gutterBottom>{randomBlogs[3].description}</StyledTypography>
                </div>
              </SyledCardContent>
              <Box sx={{ display: 'flex',flexDirection: 'row',gap: 2,alignItems: 'center',justifyContent: 'space-between',padding: '16px', }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                <Avatar sx={{ width: 24, height: 24 }}>{randomBlogs[3].authors.charAt(0).toUpperCase()}</Avatar>
                <Typography variant="caption">{randomBlogs[3].authors}</Typography>
              </Box>
              <Typography variant="caption">{randomBlogs[3].date}</Typography>
            </Box>
            </SyledCard>}
            { randomBlogs.length > 4 &&<SyledCard variant="outlined" onClick={() => navigate(`/blog/${randomBlogs[4].id}`)} onFocus={() => handleFocus(4)} onBlur={handleBlur} tabIndex={0} className={focusedCardIndex === 4 ? 'Mui-focused' : ''}sx={{ height: '100%' }}>
              <SyledCardContent sx={{display: 'flex', flexDirection: 'column',justifyContent: 'space-between',height: '100%', }}>
                <div>
                  <Typography gutterBottom variant="caption" component="div"> {randomBlogs[4].tag}</Typography>
                  <Typography gutterBottom variant="h6" component="div">{randomBlogs[4].title}</Typography>
                  <StyledTypography variant="body2" color="text.secondary" gutterBottom >{randomBlogs[4].description}</StyledTypography>
                </div>
              </SyledCardContent>
              <Box sx={{ display: 'flex',flexDirection: 'row',gap: 2,alignItems: 'center',justifyContent: 'space-between',padding: '16px', }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                <Avatar sx={{ width: 24, height: 24 }}>{randomBlogs[4].authors.charAt(0).toUpperCase()}</Avatar>
                <Typography variant="caption">{randomBlogs[4].authors}</Typography>
              </Box>
              <Typography variant="caption">{randomBlogs[4].date}</Typography>
            </Box>
            </SyledCard>}
          </Box>
        </Grid>
        {randomBlogs.length > 5 && <Grid size={{ xs: 12, md: 4 }}>
          <SyledCard variant="outlined" onClick={() => navigate(`/blog/${randomBlogs[5].id}`)} onFocus={() => handleFocus(5)} onBlur={handleBlur} tabIndex={0}className={focusedCardIndex === 5 ? 'Mui-focused' : ''}sx={{ height: '100%' }} >
            <CardMedia component="img" alt={randomBlogs[5].title} image={randomBlogs[5].media} sx={{ height: { sm: 'auto', md: '50%' },aspectRatio: { sm: '16 / 9', md: '' },}}/>
            <SyledCardContent>
              <Typography gutterBottom variant="caption" component="div">{randomBlogs[5].tag}</Typography>
              <Typography gutterBottom variant="h6" component="div">{randomBlogs[5].title}</Typography>
              <StyledTypography variant="body2" color="text.secondary" gutterBottom>{randomBlogs[5].description}</StyledTypography>
            </SyledCardContent>
            <Box sx={{ display: 'flex',flexDirection: 'row',gap: 2,alignItems: 'center',justifyContent: 'space-between',padding: '16px', }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                <Avatar sx={{ width: 24, height: 24 }}>{randomBlogs[5].authors.charAt(0).toUpperCase()}</Avatar>
                <Typography variant="caption">{randomBlogs[5].authors}</Typography>
              </Box>
              <Typography variant="caption">{randomBlogs[5].date}</Typography>
            </Box>
          </SyledCard>
        </Grid>}
      </Grid>
    </Box>
  );
}
