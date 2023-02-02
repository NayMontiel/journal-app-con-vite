import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DeleteOutline, SaveOutlined, UploadOutlined} from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';

import { ImageGallery } from '../components'
import { useForm } from '../../hooks/useForm'
import { setActiveNote, starDeletingNote, starSeveNote, starUploadingFiles } from '../../store/journal';



export const NoteViews = () => {
    
    const dispatch = useDispatch();
    const {active:note, messageSaved, isSaving} = useSelector(state => state.journal)

    const {body, title, data, onInputChange, formState} = useForm(note);

    const dateString = useMemo(() => {
        const date = new Date(data);
        return date.toUTCString();

    }, [data]);

    const fileInputRef = useRef();

    useEffect(() => {
      dispatch(setActiveNote(formState))
         
    }, [formState])

    useEffect(() => {
      if (messageSaved.length > 0) {
        Swal.fire({
            title: 'Exito!',
            text: 'Nota Actualizada',
            icon: 'success',
            confirmButtonText: 'OK'
          })
      }
    
    }, [messageSaved])
    
    
    const onSeveNote = () => {
        dispatch(starSeveNote())
    };

    const onFileInputChange = ({target}) => {
        if(target.files === 0) return;
            
         dispatch(starUploadingFiles(target.files));

    }

    const onDelete = () => {
        Swal.fire({
            title: 'Seguro de eliminar esta nota?',
            text: "Esto no se puede revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#262254',
            cancelButtonColor: 'rgba(228,15,15,0.9472163865546218)',
            confirmButtonText: 'si' 
        }).then((result) => {
                if (result.isConfirmed) {
                   dispatch( starDeletingNote())
                  Swal.fire(
                    'Eliminado!',
                    'La nota a sido eliminada.',
                    'success'
                  )
                }
              })
       
    }


  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{mb: 1}}  >
        <Grid item >
            <Typography fontSize={39} fontWeight='light' >
                {dateString}
            </Typography>
        </Grid>

        <Grid item >

            <input type="file" multiple onChange={onFileInputChange} ref={fileInputRef} style={{display: 'none'}} />

            <IconButton color='primary' disabled={isSaving} onClick={() => fileInputRef.current.click()} >
                <UploadOutlined />            
            </IconButton>
            
           <Button color='primary' sx={{padding: 2 }} onClick={onSeveNote} disabled={isSaving} >
               <SaveOutlined sx={{mr: 1, fontSize: 30}} /> 
                Guardar
           </Button>
        </Grid>

        <Grid container>
            <TextField 
                type='text'
                variant='filled'
                fullWidth
                placeholder='Ingrese Un Titulo'
                label= 'Titulo'
                sx={{border: 'none', mb: 1 }}
                name='title'
                value={title}
                onChange={onInputChange}
            />

            <TextField 
                type='text'
                variant='filled'
                fullWidth
                multiline
                placeholder='¿Que Sucedio Hoy? '
                minRows={5}
                sx={{border: 'none', mb: 1 }}
                name='body'
                value={body}
                onChange={onInputChange}
            />

        </Grid>

        <Grid container justifyContent='end' >
            <Button sx={{mt: 2}} color='error' onClick={onDelete} >
                <DeleteOutline />  
                Borrar          
            </Button>
        </Grid>

        <ImageGallery sx={{mt: 3}} images={ note.imageURL } />
                
    </Grid>
  )
}
