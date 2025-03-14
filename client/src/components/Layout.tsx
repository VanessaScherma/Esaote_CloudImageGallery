import * as React from 'react';
import { Container } from '@mui/material';
import ImageGrid from './ImageGrid';


const Layout: React.FC = () => {
    return (
        <Container>
            <header>
                <h1>Cloud Image Gallery</h1>
            </header>
            <ImageGrid />
        </Container>
    );
};

export default Layout