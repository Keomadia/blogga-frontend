import { useState, memo ,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
// import {  IconButton } from '@mui/material';
// import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
// import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { fetchBlogDataFromAPI } from '../data/fetchBlogDataFromAPI'; 
import DefaultLayout from '../layouts/default';
import ShareButton from '../components/ShareButton';
import { Loader } from '../components/Loader';
import { ErrorPage } from '../components/ErrorPage';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import Container from '@mui/material/Container';	

    
const VideoFrame = memo(({ video, title }: { video: string; title: string }) => {
    return (
    <Box sx={{ position: 'relative', pt: '56.25%', width: '100%', borderRadius: 2, mb: 2 }}>
        <CardMedia
        component="iframe"
        src={video}
        title={title}
        allowFullScreen
        sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 0,
            borderRadius: 2,
        }}
        />
    </Box>
    );
});


export default function BlogDetail() {
    const { id } = useParams<{ id: string }>();
    const API_URL = 'https://blogga-flask-app.onrender.com';
    
    const [_, setLoading] = useState(true);
    const [, setBlogData] = useState([]);
    const [blog, setBlog] = useState<any>(null);
    const [showError, setShowError] = useState(false);
    const [views, setViews] = useState(0);

    const [openImage, setOpenImage] = useState<string | null>(null);
    const [isMaximized, setIsMaximized] = useState(false);
    useEffect(() => {
        const loadBlogs = async () => {
            const data = await fetchBlogDataFromAPI();
            setBlogData(data);
            const foundBlog = data.find((b: any) => b.id === parseInt(id || '', 10));
            setBlog(foundBlog);
            if (foundBlog) setViews(foundBlog.views);
            setLoading(false);
        };
        loadBlogs();
    }, [id]);

    useEffect(() => {
        const incrementViews = async () => {
            if (!blog) return;
            try {
                const updatedViews = views + 1;
                await fetch(`${API_URL}/api/blog/update/${blog.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ views: updatedViews }),
                });
                setViews(updatedViews);
            } catch (error) {
                console.error('Error updating views:', error);
            }
        };
    
        incrementViews();
    }, [blog]);


    useEffect(() => {
        if (blog?.title) {
            document.title = blog.title;
        }
    }, [blog]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!blog) {
                setShowError(true);
            }
        }, 15000); 


        if (blog) {
            clearTimeout(timer);
        }

        return () => clearTimeout(timer);
    }, [blog]);

    if (showError && !blog) {
        return <ErrorPage />;
    }

    if (!blog) {
        return <Loader />;
    }





    // const [likes, setLikes] = useState(blog.likes);
    // const [dislikes, setDislikes] = useState(blog.dislikes);

    // const updateBlogData = async (updatedData: { likes?: number; dislikes?: number }) => {
    //     try {
    //         await fetch(``${API_URL}/api/blog/update/${blog.id}`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(updatedData),
    //         });
    //     } catch (error) {
    //         console.error('Error updating blog data:', error);
    //     }
    // };

    // const handleLike = async (e: React.MouseEvent) => {
    //     e.preventDefault();
    
    //     const alreadyLiked = likes > blog.likes;
    //     const alreadyDisliked = dislikes > blog.dislikes;
    
    //     const newLikes = alreadyLiked ? likes - 1 : likes + 1;
    //     const newDislikes = alreadyDisliked && !alreadyLiked ? dislikes - 1 : dislikes;
    
    //     setLikes(newLikes);
    //     if (alreadyDisliked && !alreadyLiked) setDislikes(newDislikes);
    
    //     await updateBlogData({ likes: newLikes, dislikes: newDislikes });
    // };
    
    // const handleDislike = async (e: React.MouseEvent) => {
    //     e.preventDefault();
    
    //     const alreadyDisliked = dislikes > blog.dislikes;
    //     const alreadyLiked = likes > blog.likes;
    
    //     const newDislikes = alreadyDisliked ? dislikes - 1 : dislikes + 1;
    //     const newLikes = alreadyLiked && !alreadyDisliked ? likes - 1 : likes;
    
    //     setDislikes(newDislikes);
    //     if (alreadyLiked && !alreadyDisliked) setLikes(newLikes);
    
    //     await updateBlogData({ dislikes: newDislikes, likes: newLikes });
    // };
    


    
    
    
    return (
        <DefaultLayout>
            <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 900, mx: 'auto' }}>
              <Typography
                variant="h2"
                fontWeight="bold"
                gutterBottom
                sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, lineHeight: 1.2 }}
            >
                {blog.title}
            </Typography>


            <Typography
                variant="subtitle2"
                gutterBottom
                sx={{
                fontSize: { xs: '0.9rem', md: '1rem' },
                color: 'text.secondary',
                marginLeft: 'auto',
                mb: 4,
                }}
            >
                Written by <strong>{blog.authors}</strong> • {blog.date}
            </Typography>

            
            
            <CardMedia
                component="img"
                image={blog.media}
                alt={blog.title}
                sx={{
                borderRadius: 3,
                mb: 3,
                width: '100%',
                maxHeight: 450,
                objectFit: 'cover',
                boxShadow: 2,
                }}
            />

            {/* Blog Sections */}
            {blog.sections.map((section: any, index: number) => (
                <Box key={index} sx={{ mt: 6 }}>
                {section.title && (
                    <Typography
                    variant="h4"
                    fontWeight={600}
                    gutterBottom
                    sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}
                    >
                    {section.title}
                    </Typography>
                )}

                {section.image && (
                <Box sx={{ position: 'relative', mb: 2 }}>
                    <CardMedia
                    component="img"
                    image={section.image}
                    title={`${section.title} image`}
                    alt={`${section.title} image`}
                    onClick={() => setOpenImage(section.image)}
                    sx={{
                        borderRadius: 2,
                        width: '100%',
                        maxHeight: 300,
                        objectFit: 'cover',
                        position: 'relative',
                        zIndex: 2,
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                        transform: 'scale(1.02)',
                        },
                    }}
                    />
                    <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${section.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(10px)',
                        zIndex: 1,
                        borderRadius: 2,
                    }}
                    />
                </Box>
                )}


                {section.content &&( <Typography
                    variant="body1"
                    sx={{
                    fontSize: { xs: '1.1rem', md: '1.25rem' },
                    lineHeight: 1.8,
                    mb: 3,
                    }}
                >
                    {section.content}
                </Typography>
                )}

{section.list && (
                            <>
                                {section.list.map((item:any, idx:number) => (
                                    <Box key={idx} component="section" sx={{ mt: 1 }}>
                                        {Object.entries(item).map(([key, value]) => {
                                            const stringValue = String(value); 
                                            return (
                                                <Container key={key}>
                                                    {stringValue.length > 60 ? (
                                                        <>
                                                            <Typography
                                                                variant="h6"
                                                                sx={{ fontWeight: 600, fontSize: { xs: '1.1rem', md: '1.3rem' } }}
                                                            >
                                                                {key}
                                                            </Typography>
                                                            <Typography
                                                                variant="body1"
                                                                sx={{ mb: 2, fontSize: { xs: '1rem', md: '1.1rem' } }}
                                                            >
                                                                {stringValue}
                                                            </Typography>
                                                        </>
                                                    ) : (
                                                        <Box sx={{ display: 'inline' }}>
                                                            <Typography
                                                                variant="h6"
                                                                sx={{
                                                                    display: 'inline',
                                                                    fontSize: { xs: '1rem', md: '1.3rem' },
                                                                    fontWeight: 600,
                                                                }}
                                                            >
                                                                {key}
                                                            </Typography>
                                                            <Typography
                                                                variant="body1"
                                                                sx={{
                                                                    display: 'inline',
                                                                    mb: 2,
                                                                    fontSize: { xs: '0.9rem', md: '1.2rem' },
                                                                }}
                                                            >
                                                                : {stringValue}
                                                            </Typography>
                                                        </Box>
                                                    )}
                                                </Container>
                                            );
                                        })}

                                    </Box>
                                ))}
                            </>
                        )}
                </Box>
            ))}

            {/* Optional Video */}
            {blog.video && (
                <Box sx={{ mt: 6 }}>
                <VideoFrame video={blog.video} title={blog.title} />
                </Box>
            )}

            
            <Box
                sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mt: 6,
                pt: 2,
                borderTop: '1px solid #eee',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <VisibilityIcon fontSize="small" />
                <Typography variant="body2">{views}</Typography>
                </Box>

                <ShareButton description={blog.description} id={blog.id} title={blog.title} />
            </Box>
            </Box>
            <Dialog
                open={Boolean(openImage)}
                onClose={() => {
                    setOpenImage(null);
                    setIsMaximized(false);
                }}
                maxWidth={false}
                fullScreen={isMaximized}
                PaperProps={{
                    sx: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    },
                }}
                >
                <Box
                    sx={{
                    position: 'relative',
                    width: isMaximized ? '100%' : { xs: '90vw', md: '70vw' },
                    maxHeight: isMaximized ? '100vh' : '90vh',
                    margin: 'auto',
                    backgroundColor: 'background.paper',
                    borderRadius: 2,
                    overflow: 'hidden',
                    }}
                >
                    <IconButton
                    onClick={() => setOpenImage(null)}
                    sx={{ position: 'absolute', top: 8, right: 8, zIndex: 2, color: 'white',backgroundColor: 'rgba(0, 0, 0, 0.5)', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' } }}
                    >
                    <CloseIcon />
                    </IconButton>
                    <IconButton
                    onClick={() => setIsMaximized(!isMaximized)}
                    sx={{ position: 'absolute', top: 8, right: 48,mr:3, zIndex: 2, color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.5)', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' } }}
                    >
                    {isMaximized ? <FullscreenExitIcon /> : <FullscreenIcon />}
                    </IconButton>
                    <CardMedia
                    component="img"
                    image={openImage!}
                    alt="Full view"
                    sx={{
                        width: '100%',
                        height: isMaximized ? '100vh' : 'auto',
                        objectFit: 'contain',
                    }}
                    />
                </Box>
                </Dialog>

        </DefaultLayout>
    );
}

