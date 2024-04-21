import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Grid, Paper, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import axios from 'axios';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

import PriceHistory from '../components/PriceHistory';


export default function ProductPage() {
    const { id } = useParams(); // Get the `id` param from the URL
    // const [product, setProduct] = useState({ id: '', productName: '', imageLink: '', price: '' });
    const [product, setProduct] = React.useState([]);
    const [review, setReview] = React.useState([]);
    const [priceHistory, setPriceHistory] = React.useState([]);
    const [specifications, setSpecifications] = React.useState([]);


    useEffect(() => {
        // fetch all products and console.log it 
        const fetchData = async () => {
            try {
                // console.log(id)
                // const response = await axios.get('http://localhost:8080/techCompare/products/search', {params:{name: id}});
                // setProduct(response.data[0]);
                // setReview(response.data[0].review)
                // setPriceHistory(response.data[0].priceHistory)
                // setSpecifications(response.data[0].specifications)
                // console.log((response.data[0].review))
                const response = await axios.get('http://localhost:8080/techCompare/products/getproduct', {params:{productStringId: id}});
                setProduct(response.data);
                setReview(response.data.review)
                setPriceHistory(response.data.priceHistory)
                setSpecifications(response.data.specifications)
                console.log((response.data.review))
            } catch (error) {
                console.error('Error fetching data: ', error);
                // Handle errors here based on your application's needs
            }
        };
        console.log("fetchData")
        fetchData();
    }, [id]);


  return (
    <Container maxWidth="md" sx={{pt: 5}}>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <p>Image</p>
            </Grid>
            <Grid item xs={6}>
                {/* <p>id: {product.productStringId}</p> */}

                <Typography variant="h3" component="h2" sx={{pb: 5}}>
                    {product.productName}
                </Typography>
                <Typography variant="h4" component="h2">
                    $ {product.currentPrice}
                </Typography>
                <Box sx={{pt: 3}}>
                    <Typography variant="h6" component="h2">
                        Specifications:
                    </Typography>
                    <Box sx={{pl:3, pt:1}}>
                        {Object.entries(specifications).map(([key, value]) => {
                            if (value) { // This will check if the value is not null and not an empty string
                                return (
                                    <Typography variant="body1" sx={{ m: 0.5 }} key={key}>
                                        {`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}
                                    </Typography>
                                );
                            }
                            return null; // If value is null, return null to render nothing for this entry
                        })}
                    </Box>
                </Box>
            </Grid>
        </Grid>
        {/* Review part */}
        <Divider sx={{m:4}}></Divider>
        <Typography variant="h4">
            Review:
        </Typography>
        <Stack spacing={2} sx={{mt:1, p:2}}>
            {review.map((item, index) => (
                <Paper elevation={2} sx={{p:2}}>
                    <Typography>User: {item.email}</Typography>
                    <Typography>{item.comment}</Typography>
                </Paper>
                ))}
        </Stack>

        {/* Price History */}
        <Divider sx={{m:4}}></Divider>
        <Typography variant="h4">
            Price History:
        </Typography>
        {priceHistory.map((item, index) => (
                <Paper elevation={2} sx={{p:2}}>
                    <Typography>{item.time}</Typography>
                    <Typography>{item.price}</Typography>
                </Paper>
                ))}
        <PriceHistory priceHistory={priceHistory}/>
    </Container>
  );
}
