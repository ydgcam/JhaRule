import React from 'react';
import { Typography, Card, CardContent, Grid, CardActions, Collapse, Stack } from '@mui/material';
import { format } from 'date-fns';
import { useState } from 'react';
import { JobHazardDocument } from '../types/jha';
import { ConfirmationDialog } from './ConfirmationDialog';
import { CardStyles, DeleteButton, EditButton, ExpandMoreComp, AlertDialog } from './Inputs';
import { useNavigate } from 'react-router-dom';

interface DocumentCardProps {
  key: string,
  jha: JobHazardDocument,
  refreshCallbackFn: () => void;
}

const DocumentCard = (props: DocumentCardProps): JSX.Element => {

  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [openDeleteScheduleModal, setOpenDeleteScheduleModal] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [alertDetails, setAlertDetails] = useState<string | null>(null);

  return (
    <>
      <Card sx={CardStyles.card}>
        <CardContent sx={CardStyles.cardContentCard}>
          <Grid container spacing={3}>
            <Grid item xs={4} sx={CardStyles.gridItem}>
              <Typography variant='h4'>{props.jha.title}</Typography>
            </Grid>
            <Grid item xs={2} sx={CardStyles.gridItem}>
              <Typography variant='h6'>Author: {props.jha.author}</Typography>
            </Grid>
            <Grid item xs={2} sx={CardStyles.gridItem}>
              <EditButton fn={() => { navigate(`/documents/${props.jha.uid}`); }}/>
            </Grid>
            <Grid item xs={2} sx={CardStyles.gridItem}>
              <DeleteButton fn={() => setOpenDeleteScheduleModal(true)}/>
            </Grid>
            <Grid item xs={2} sx={CardStyles.gridItem}>
              <CardActions>
                <ExpandMoreComp
                  expand={expanded}
                  onClick={() => {setExpanded(!expanded);}}
                  aria-expanded={expanded}
                  aria-label='show more'
                />
              </CardActions>
            </Grid>
          </Grid>
        </CardContent>
        <Collapse in={expanded} timeout='auto' unmountOnExit sx={CardStyles.collapse}>
          <CardContent sx={CardStyles.cardContentCollapse}>
            <Grid container>
              <Grid item xs={6}>
                <Stack spacing={2}>
                  <>
                    <Typography variant='h6'>Date posted: </Typography>
                    <Typography variant='caption'>
                      {
                        format(props.jha.datePosted, 'MM/dd/yyyy h:mm aa')
                      }
                    </Typography>
                  </>
                  <>
                    <Typography variant='h6'>Last updated: </Typography>
                    <Typography variant='caption'>
                      {
                        format(props.jha.dateRecorded, 'MM/dd/yyyy h:mm aa')
                      }
                    </Typography>
                  </>
                </Stack>
              </Grid>
              <Grid item xs={6}>
              </Grid>
            </Grid>
          </CardContent>
        </Collapse>
      </Card>
      <ConfirmationDialog 
        title={'Delete Document'}
        text={'Are you sure you want to delete this document?'}
        isSubmitting={isSubmitting}
        open={openDeleteScheduleModal}
        closeFn={() => setOpenDeleteScheduleModal(false)}
        action={() => { 
          setSubmitting(true);
          /*deleteDocument(props.schedule).then((res) => {
            setSubmitting(false);
            if (isOk(res)) {
              props.refreshCallbackFn(); 
            }
            setOpenDeleteScheduleModal(false);
          });*/
        }}/>
      <AlertDialog 
        title={'Error occured deleting document'} 
        details={alertDetails || ''} 
        open={alertDetails !== null} 
        onClose={() => setAlertDetails(null)}
      />
    </>
  );
};

export default DocumentCard; 