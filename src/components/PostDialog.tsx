import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField } from '@mui/material';

interface PostDialogProps {
  open: boolean;
  isEditing: boolean;
  newPost: { title: string; body: string; };
  setNewPost: ( post: { title: string; body: string; } ) => void;
  handleClose: () => void;
  handleSave: () => void;
  handleAdd: () => void;
}

const PostDialog: React.FC<PostDialogProps> = ( { open, isEditing, newPost, setNewPost, handleClose, handleSave, handleAdd } ) => {
  return (
    <Dialog open={ open } onClose={ handleClose }>
      <DialogTitle>{ isEditing ? 'Editar Post' : 'Agregar Nuevo Post' }</DialogTitle>
      <DialogContent>
        <DialogContentText>
          { isEditing ? 'Edita el título y contenido del post.' : 'Agrega un nuevo post con título y contenido.' }
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Título"
          fullWidth
          variant="outlined"
          value={ newPost.title }
          onChange={ ( e ) => setNewPost( { ...newPost, title: e.target.value } ) }
        />
        <TextField
          margin="dense"
          label="Contenido"
          fullWidth
          variant="outlined"
          multiline
          minRows={ 4 }
          value={ newPost.body }
          onChange={ ( e ) => setNewPost( { ...newPost, body: e.target.value } ) }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={ handleClose }>Cancelar</Button>
        <Button onClick={ isEditing ? handleSave : handleAdd } variant="contained" color="primary">
          { isEditing ? 'Guardar Cambios' : 'Agregar Post' }
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostDialog;
