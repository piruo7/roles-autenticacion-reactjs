import React from 'react';
import { Card, CardContent, CardActions, CardMedia, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface PostCardProps {
  post: { id: number | string; title: string; body: string; };
  userRole: string | null;
  handleEditPost: () => void;
  handleDeletePost: () => void;
}

const PostCard: React.FC<PostCardProps> = ( { post, userRole, handleEditPost, handleDeletePost } ) => {
  return (
    <Card sx={ { maxWidth: 345, boxShadow: 3, borderRadius: 2 } }>
      <CardMedia
        component="img"
        height="140"
        image={ `https://picsum.photos/200/300?random=${ post.id }` }
        alt="Post image"
      />

      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          { post.title }
        </Typography>
        <Typography variant="body2" color="text.secondary">
          { post.body }
        </Typography>
      </CardContent>

      { userRole === 'admin' && (
        <CardActions>
          <IconButton color="primary" onClick={ handleEditPost }>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={ handleDeletePost }>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      ) }
    </Card>
  );
};

export default PostCard;
