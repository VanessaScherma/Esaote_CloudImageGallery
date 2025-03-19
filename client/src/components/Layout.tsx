import * as React from 'react';
import { AppBar, Toolbar, Typography, Container, CssBaseline, Box } from '@mui/material';
import ImageGrid from './ImageGrid';

const Layout: React.FC = () => {
    return (
        <>
            <CssBaseline />
            <AppBar position="static" color="primary" enableColorOnDark>
                <Toolbar>
                    <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600 }}>
                        Cloud Image Gallery
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container sx={{ mt: 4, mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box textAlign="center" sx={{ mb: 3 }}>
                    <Typography variant="h4" fontWeight="bold">
                        Welcome to Cloud Image Gallery
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 1, maxWidth: "600px" }}>
                        Browse and manage your image collection seamlessly. 
                        Like, feature, or delete images effortlessly with a schema-driven UI.
                    </Typography>
                </Box>

                <Box sx={{ width: '100%', maxWidth: '1200px', mt: 2 }}>
                    <ImageGrid />
                </Box>
            </Container>
        </>
    );
};

export default Layout;
