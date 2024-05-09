import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  Grid, Card, CardContent, Typography, Pagination, Skeleton } from '@mui/material';
import "../../styles/admin.css";

interface Enquiry {
  _id: string;
  notes: string;
  createdAt: string;
  destination: string;
  duration: string;
  email: string;
  username: string;
  interest: string;
  travelers: string;
  date: string;
  updatedAt: string;
  userId: string;
  status: string;
}

const Admin: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [enquiriesPerPage] = useState(8);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await axios.get('https://travelopia-coding-assignment-3.onrender.com/enquiry', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        });
        setEnquiries(response.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, []);

  const totalRequests = enquiries.length;

  const indexOfLastEnquiry = currentPage * enquiriesPerPage;
  const indexOfFirstEnquiry = indexOfLastEnquiry - enquiriesPerPage;
  const currentEnquiries = enquiries.slice(indexOfFirstEnquiry, indexOfLastEnquiry);

  const paginate = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className='enquiries-section'>
      <div className='admin-banner'>
      {/* <img src="https://antongorlin.com/wp-content/uploads/ngg_featured/4k-wallpapers-nature-trees.jpg" alt="Banner" className="banner-image" /> */}
      </div>
      <div className='enquiry-banner' style={{ backgroundColor: 'rgb(133, 89, 35)' }}>
        <div className="overlay">
          <div className="total-requests" style={{ color: 'white' }}>
            Total Requests: {totalRequests}
          </div>
        </div>
      </div>
      {loading ? (
        <Grid container spacing={3} justifyContent="center">
          {[...Array(8)].map((_, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <Card variant="outlined" className='enquiry-card' style={{ backgroundColor: 'rgb(255, 255, 255)', color: 'rgb(133, 89, 35)' }}>
                <CardContent>
                  <Skeleton animation="wave" variant="rectangular" height={200} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <>
          <Typography variant="h2" className='enquiries-title' style={{ color: 'rgb(133, 89, 35)' }}>Enquiries</Typography>
          <Grid container spacing={3} justifyContent="center">
            {currentEnquiries.map((enquiry) => (
              <Grid key={enquiry._id} item xs={12} sm={6} md={4} lg={3}>
                <Card variant="outlined" className='enquiry-card' style={{ backgroundColor: 'rgb(255, 255, 255)', color: 'rgb(133, 89, 35)' }}>
                  <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom>
                      Destination: {enquiry.destination}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Username: {enquiry.username}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Email: {enquiry.email}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Duration: {enquiry.duration} days
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Interest: {enquiry.interest}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Travelers: {enquiry.travelers}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Date: {enquiry.date}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Notes: {enquiry.notes}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Pagination
            count={Math.ceil(enquiries.length / enquiriesPerPage)}
            page={currentPage}
            onChange={(event, page) => {
              console.log(event);
              
              paginate(page)}}
            style={{ textAlign: 'center', marginTop: '20px' }}
          />
        </>
      )}
    </section>
  );
}

export default Admin;
