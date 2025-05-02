import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ShareButton from './ShareButton';

import { useNavigate } from 'react-router';

interface BlogCardProps {
  title: string;
  description: string;
  media: string;
  tag: string;
  id: number;
}


const BlogCard: React.FC<BlogCardProps> = ({ title, description, id, tag,media=null }) => {
  const navigate = useNavigate();
  const handleLearnMore = () => navigate(`/blog/${id}`);
  return (
        <Card sx={{ width: '100%', borderRadius: 2, boxShadow: 3 }}>
        {media && (
            <CardMedia
            component="img"
            image={media}
            alt={title}
            sx={{ width: '100%', borderRadius: 1 }}
            />
        )}
        <CardContent>
            <Typography
            gutterBottom
            variant="overline"
            sx={{ color: 'text.secondary' }}
            >
            {tag}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
            {title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {description}
            </Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <ShareButton description={description} id={id} title={title}/>
            <Button size="small" variant='outlined' onClick={handleLearnMore}>Learn More</Button>
        </CardActions>
        </Card>

  );
};

export default BlogCard;
