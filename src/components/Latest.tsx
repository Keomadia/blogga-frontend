import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { fetchBlogDataFromAPI } from '../data/fetchBlogDataFromAPI'; 
import { useNavigate } from 'react-router';
import { useState } from 'react';


const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const TitleTypography = styled(Typography)(() => ({
  position: 'relative',
  textDecoration: 'none',
  '&:hover': { cursor: 'pointer' },
  '& .arrow': {
    visibility: 'hidden',
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
  },
  '&:hover .arrow': {
    visibility: 'visible',
    opacity: 0.7,
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '3px',
    borderRadius: '8px',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    width: 0,
    height: '1px',
    bottom: 0,
    left: 0,
    backgroundColor: "#4dabdf",
    opacity: 0.3,
    transition: 'width 0.3s ease, opacity 0.3s ease',
  },
  '&:hover::before': {
    width: '100%',
  },
}));


export default function Latest() {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(
    null,
  );
  const [blogData, setBlogData] = useState<any>(null);
  const navigate = useNavigate();
  const handleFocus = (index: number) => {
    setFocusedCardIndex(index);
  };
  const handleBlur = () => {
    setFocusedCardIndex(null);
  };
  const SyledGrid = styled(Grid)(() => ({
    border: '2px solid rgba(0, 0, 0, 0.1)',
    '&:hover': {
      cursor: 'pointer',
      boxShadow: '20px 20px 60px rgba(214, 168, 168, 0.1)',
      transition: 'all 0.3s ease-in-out',
      transform : 'scale(1.01)',
    },
    '&:focus-visible': {
      outline: '1px solid',
      outlineColor: 'hsla(209, 35.60%, 29.20%, 0.50)',
      outlineOffset: '2px',
    },
  }));
    React.useEffect(() => {
      const fetchData = async () => {
        const data = await fetchBlogDataFromAPI();
        setBlogData(data);
      };
      fetchData();
    }, []);

  const articles = blogData.slice(0, 7);

  return (
    <div>
      <Typography variant="h2" gutterBottom>
        Recommended
      </Typography>
      <Grid container spacing={8} columns={12} sx={{ my: 4 }}>
        {articles.map((article:any, index:number) => (
          <SyledGrid key={index} size={{ xs: 12, sm: 6 }} onClick={() => navigate(`/blog/${article.id}`)}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 1,
                height: '100%',
                boxShadow: '20px 20px 60px rgba(0, 0, 0, 0.1)',
                padding: '10px',
              }}
            >
              <Typography gutterBottom variant="caption" component="div">
                {article.tag}
              </Typography>
                <TitleTypography
                gutterBottom
                variant="h6"
                onClick={() => navigate('/blog')}
                onFocus={() => handleFocus(index)}
                onBlur={handleBlur}
                tabIndex={0}
                className={focusedCardIndex === index ? 'Mui-focused' : ''}
                >
                {article.title}
                <NavigateNextRoundedIcon
                  className="arrow"
                  sx={{ fontSize: '1rem' }}
                />
                </TitleTypography>
              <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                {article.description}
              </StyledTypography>

              <Box sx={{ display: 'flex',flexDirection: 'row',gap: 2,alignItems: 'center',justifyContent: 'space-between',padding: '16px', }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                <Avatar sx={{ width: 24, height: 24 }}>{article.authors.charAt(0).toUpperCase()}</Avatar>
                <Typography variant="caption">{article.authors}</Typography>
              </Box>
              <Typography variant="caption">{article.date}</Typography>
            </Box>
            </Box>
          </SyledGrid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4 }}>
      </Box>
    </div>
  );
}
