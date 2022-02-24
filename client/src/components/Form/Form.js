import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { createPost, updatePost } from '../../actions/posts';
import useStyles from './styles';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ name: '', symbol: '', category: '', price: '', open: '', high: '', low: '', close: '', avgVolume: '', mktcap: '' });
  //const [tickerData, setTickerData] = useState({ high: 0, low: 0, close: 0, volume: 0, divident: 0, mktcap: 0 });
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  const clear = () => {
    setCurrentId(0);
    setPostData({ name: '', symbol: '', category: '', price: '', open: '', high: '', low: '', close: '', avgVolume: '', mktcap: '' });
  };

  useEffect(() => {
    if (!post?.name) clear();
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: postData.name }, history));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name: postData.name }));
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In to create, manage or delete a stock.
        </Typography>
      </Paper>
    );
  }



  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post?.name}"` : 'Stock Information'}</Typography>
        <TextField name="name" variant="outlined" label="Name" fullWidth value={postData.name} onChange={(e) => setPostData({ ...postData, name: e.target.value })} />
        <TextField name="symbol" variant="outlined" label="Symbol" fullWidth value={postData.symbol} onChange={(e) => setPostData({ ...postData, symbol: e.target.value })} />
        <TextField name="categoty" variant="outlined" label="Category" fullWidth value={postData.category} onChange={(e) => setPostData({ ...postData, category: e.target.value })} />
        <TextField name="categoty" variant="outlined" label="Price" fullWidth value={postData.price} onChange={(e) => setPostData({ ...postData, price: e.target.value })} />
        <Divider style={{ margin: '20px 0' }} />
        <Typography variant="h6"> Ticker Information</Typography>
        <TextField name="categoty" variant="outlined" label="Open" fullWidth value={postData.open} onChange={(e) => setPostData({ ...postData, open: e.target.value })} />
        <TextField name="categoty" variant="outlined" label="High" fullWidth value={postData.high} onChange={(e) => setPostData({ ...postData, high: e.target.value })} />
        <TextField name="categoty" variant="outlined" label="Low" fullWidth value={postData.low} onChange={(e) => setPostData({ ...postData, low: e.target.value })} />
        <TextField name="categoty" variant="outlined" label="Close" fullWidth value={postData.close} onChange={(e) => setPostData({ ...postData, close: e.target.value })} />
        <TextField name="categoty" variant="outlined" label="Avg Volume" fullWidth value={postData.avgVolume} onChange={(e) => setPostData({ ...postData, avgVolume: e.target.value })} />
        <TextField name="categoty" variant="outlined" label="Market Cap" fullWidth value={postData.mktcap} onChange={(e) => setPostData({ ...postData, mktcap: e.target.value })} />

        <div></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
