import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import InfoIcon from '@material-ui/icons/Info';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import { getPost, deletePost } from '../../../actions/posts';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  
  const openPost = (e) => {
    // dispatch(getPost(post._id, history));
    //console.log(post._id);
    history.push(`/stocks/${post._id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openPost}
      >
        <CardMedia className={classes.media}  title={post.name} />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          
        </div>
        {(user?.result?.admin) && ( // if user is admin, can edit stock
        <div className={classes.overlay2} name="edit">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentId(post._id);
            }}
            style={{ color: 'white' }}
            size="small"
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
        </div>
        )}
        
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.symbol}</Typography>
        <CardContent>
        <Typography className={classes.title} gutterBottom variant="h6" component="h2">{"Price:"}</Typography>
        <Typography className={classes.title} gutterBottom variant="h6" component="h6">{post.price + " USD"}</Typography>
        <Typography className={classes.title} gutterBottom variant="h6" component="h2">{"Category:"}</Typography>
        <Typography className={classes.title} gutterBottom variant="h7" component="h6">{post.category}</Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        
        {(user?.result?.admin) && (
          <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize="small" /> &nbsp; Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
