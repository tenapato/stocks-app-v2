import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider , Button } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';
import { LineChart, BarChart, Bar,ResponsiveContainer,Legend, Tooltip, Line,XAxis,YAxis,CartesianGrid} from 'recharts';
import { getStock, getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';




const Post = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  //console.log(id);

  useEffect(() => {
    dispatch(getStock(id));
  }, [id]);

  

  if (!post) return null;

  const openPost = (_id) => history.push(`/stocks/${_id}`);

 /* if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  } */

 

const data = [
  {
    name: "Open", 
    value: post.open,
  },
  {
    name: "High",
    value: post.high,
  },
  {
    name: "Low",
    value: post.low,
  },
  {
    name: "Close",
    value: post.close,
  },
]

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.name}</Typography>
          <Typography variant="h4" component="h2">{post.symbol}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.category}</Typography>
          
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="h3" component="h2">{"Price: " + post.price + " USD"}</Typography>
          <Typography variant="h5" component="h2">{"Ticker Info:"}</Typography>
          <div className={classes.section2}>
          <Divider style={{ margin: '20px 0' }} />
          
          <Typography variant="h7" component="h2">{"Open:"}</Typography>
          <Typography variant="h8" component="h3">{post.open + " USD"}</Typography>
          <Typography variant="h7" component="h2">{"Close:"}</Typography>
          <Typography variant="h8" component="h3">{post.close + " USD"}</Typography>
          <Typography variant="h7" component="h2">{"High:"}</Typography>
          <Typography variant="h8" component="h3">{post.high + " USD"}</Typography>
          <Typography variant="h7" component="h2">{"Low:"}</Typography>
          <Typography variant="h8" component="h3">{post.low + " USD"}</Typography>
          <Typography variant="h7" component="h2">{"Volume:"}</Typography>
          <Typography variant="h8" component="h3">{post.avgVolume + " USD"}</Typography>
          <Typography variant="h7" component="h2">{"Market Cap:"}</Typography>
          <Typography variant="h8" component="h3">{post.mktcap + " USD"}</Typography>
          <Button variant="contained" color="primary" > Update Stock</Button>
          </div>
          
        </div>
        
      </div>
      

      <BarChart width={600} height={600} data={data}>
        <Bar dataKey="value" fill="green" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
      </BarChart>
      
    </Paper>
  );
};

export default Post;
