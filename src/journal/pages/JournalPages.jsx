import { AddOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { starNewNote } from '../../store/journal/thunks'
import { JournalLayout } from '../layout/JournalLayout'
import { NoteViews, NothingSelectedView } from '../views'


export const JournalPages = () => {

  const dispatch = useDispatch();
  const {isSeving, active} = useSelector(state => state.journal);


  const onClickNewNote = () => {
    dispatch( starNewNote() );
  }


  return (
    <JournalLayout>
       {
        (!!active) ? <NoteViews /> : <NothingSelectedView />
       }   

      <IconButton
        onClick={onClickNewNote}
        disabled = {isSeving}
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': {background: 'error.main', opacity: 0.9},
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{fontSize: 30 }} />

      </IconButton>

    </JournalLayout>
    
  )
}
