import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, AppBar, Toolbar, Button, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import PostCard from '../components/PostCard';
import PostDialog from '../components/PostDialog';

interface Post {
  id: number | string;
  title: string;
  body: string;
}

const Dashboard: React.FC = () => {
  const [ data, setData ] = useState<Post[]>( [] );
  const [ openAddModal, setOpenAddModal ] = useState<boolean>( false );
  const [ newPost, setNewPost ] = useState<Omit<Post, 'id'>>( { title: '', body: '' } );
  const [ isEditing, setIsEditing ] = useState<boolean>( false );
  const [ editPostId, setEditPostId ] = useState<number | string | null>( null );
  const navigate = useNavigate();

  const token = localStorage.getItem( 'token' );
  const userRole = token ? JSON.parse( atob( token.split( '.' )[ 1 ] ) ).role : null;

  useEffect( () => {
    const fetchData = async () => {
      try {
        const res = await axios.get<Post[]>( 'https://jsonplaceholder.typicode.com/posts' );
        setData( res.data );
      } catch ( err ) {
        console.error( 'Error fetching data', err );
      }
    };
    fetchData();
  }, [] );

  const handleLogout = () => {
    localStorage.removeItem( 'token' );
    navigate( '/' );
  };

  const handleOpenAddModal = () => {
    setNewPost( { title: '', body: '' } );
    setOpenAddModal( true );
    setIsEditing( false );
  };

  const handleCloseAddModal = () => {
    setOpenAddModal( false );
  };

  const handleAddPost = () => {
    const addedPost: Post = {
      id: uuidv4(),
      title: newPost.title,
      body: newPost.body,
    };
    setData( [ addedPost, ...data ] );
    handleCloseAddModal();
  };

  const handleEditPost = ( post: Post ) => {
    setNewPost( { title: post.title, body: post.body } );
    setEditPostId( post.id );
    setIsEditing( true );
    setOpenAddModal( true );
  };

  const handleSavePost = () => {
    const updatedPosts = data.map( ( post ) =>
      post.id === editPostId ? { ...post, title: newPost.title, body: newPost.body } : post
    );
    setData( updatedPosts );
    handleCloseAddModal();
  };

  const handleDeletePost = ( postId: number | string ) => {
    const updatedPosts = data.filter( ( post ) => post.id !== postId );
    setData( updatedPosts );
  };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={ { flexGrow: 1 } }>
            Dashboard
          </Typography>
          { userRole === 'admin' && (
            <>
              <Button color="inherit" onClick={ () => navigate( '/admin' ) }>
                Ir al Admin Panel
              </Button>
              <Button variant="contained" startIcon={ <AddIcon /> } onClick={ handleOpenAddModal }>
                Agregar Post
              </Button>
            </>
          ) }
          <IconButton color="inherit" onClick={ handleLogout }>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Typography variant="h4" gutterBottom style={ { marginTop: '20px' } }>
        Lista de Posts
      </Typography>

      <Grid container spacing={ 4 } style={ { padding: '20px' } }>
        { data.map( ( post ) => (
          <Grid item xs={ 12 } sm={ 6 } md={ 4 } key={ post.id }>
            <PostCard
              post={ post }
              userRole={ userRole }
              handleEditPost={ () => handleEditPost( post ) }
              handleDeletePost={ () => handleDeletePost( post.id ) }
            />
          </Grid>
        ) ) }
      </Grid>

      <PostDialog
        open={ openAddModal }
        isEditing={ isEditing }
        newPost={ newPost }
        setNewPost={ setNewPost }
        handleClose={ handleCloseAddModal }
        handleSave={ isEditing ? handleSavePost : handleAddPost }
        handleAdd={ handleAddPost }
      />
    </Container>
  );
};

export default Dashboard;
