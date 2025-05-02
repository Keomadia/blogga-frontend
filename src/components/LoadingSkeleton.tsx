import { CardContent, Skeleton } from '@mui/material';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import Card from '@mui/material/Card';

interface LoadingSkeletonProps {
    skeletonType: string;
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


export const LoadingSkeleton = ({ skeletonType }: LoadingSkeletonProps) => {
    return (<>
        {skeletonType === 'main' && (
                <>
                <Box sx={{ display: 'inline-flex', flexDirection: 'row', gap: 3, overflow: 'auto' }}>
                        {Array.from({ length: 5 }).map((_, idx) => (
                        <Skeleton key={idx} variant="rectangular" width={80} height={32} />
                        ))}
                </Box>
            
                <Box sx={{display: { xs: 'none', sm: 'flex' },flexDirection: 'row',gap: 1,width: { xs: '100%', md: 'fit-content' },overflow: 'auto',}}>
                        <Skeleton variant="rectangular" width={200} height={40} />
                        <Skeleton variant="circular" width={40} height={40} />
                </Box>
                
            
                <Grid container spacing={2} columns={12} sx={{ display: 'flex' ,padding: 0 }} size={{ xs: 12, md: 4 }}>
                    {Array.from({ length: 2 }).map((_, idx) => (
                        <Grid key={idx} sx={{ display: 'flex' ,padding: 0 }} size={{ sm: 12, md: 6 }}>
                        <SyledCard variant="outlined" sx={{ width: '100%' }}>
                            <Skeleton variant="rectangular" height={240}  />
                            <Box sx={{ padding: 2 }}>
                            <Skeleton width="100%" />
                            <Skeleton width="80%" />
                            <Skeleton width="90%" />
                            </Box>
                            <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 2,
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '16px',
                            }}
                            >
                            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                                <Skeleton variant="circular" width={24} height={24} />
                                <Skeleton width={60} />
                            </Box>
                            <Skeleton width={40} />
                            </Box>
                        </SyledCard>
                        </Grid>
                    ))}
                    {Array.from({ length: 3 }).map((_, idx) => (
                        <Grid key={idx} sx={{ display: 'flex' ,padding: 0 }} size={{ sm: 12, md: 4 }}>
                        <SyledCard variant="outlined" sx={{ width: '100%' }}>
                            <Skeleton variant="rectangular" height={240}  />
                            <Box sx={{ padding: 2 }}>
                            <Skeleton width="100%" />
                            <Skeleton width="80%" />
                            <Skeleton width="90%" />
                            </Box>
                            <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 2,
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '16px',
                            }}
                            >
                            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                                <Skeleton variant="circular" width={24} height={24} />
                                <Skeleton width={60} />
                            </Box>
                            <Skeleton width={40} />
                            </Box>
                        </SyledCard>
                        </Grid>
                    ))}
                </Grid>
                </>
            
    
            )}
        {skeletonType === 'latest' && (
            Array.from({ length: 6 }).map((_, index) => (
                <SyledGrid key={index} sx={{ display: 'flex' ,padding: 0 }} size={{ xs: 12, md: 6 }}>
                <Box
                    sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: 1,
                    height: '100%',
                    width: '100%',
                    boxShadow: '20px 20px 60px rgba(0, 0, 0, 0.1)',
                    padding: '10px',
                    }}
                >
                    <Skeleton variant="text" width="40%" />
                    <Skeleton variant="text" width="80%" height={30} />
                    <Skeleton variant="text" width="90%" />
                    <Skeleton variant="text" width="90%" />
                    <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 2,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px',
                    }}
                    >
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                        <Skeleton variant="circular" width={24} height={24} />
                        <Skeleton width={60} />
                    </Box>
                    <Skeleton width={40} />
                    </Box>
                </Box>
                </SyledGrid>
            ))
                          
                        
        )}
        {skeletonType === 'default' && (
        <Grid container spacing={8} columns={12} sx={{ my: 1 }}>
            {Array.from({ length: 9 }).map((_, idx) => (
                <Grid sx={{ display: 'flex' ,padding: 0 }} size={{ xs: 12, md: 4 }} key={idx}>
                <SyledCard variant="outlined" sx={{width:"100%"}}>
                    <Skeleton variant="rectangular" height={140} />
                    <CardContent>
                        <Skeleton width="60%" />
                        <Skeleton width="80%" />
                        <Skeleton width="90%" />
                    </CardContent>
                    <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 2,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px',
                    }}
                    >
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                        <Skeleton variant="circular" width={24} height={24} />
                        <Skeleton width={60} />
                    </Box>
                    <Skeleton width={40} />
                    </Box>
                </SyledCard>
                </Grid>
            ))}
            </Grid>

        )}
        </>
    );
};