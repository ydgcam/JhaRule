import { Card, CardContent, CardActions, Collapse, CardHeader, Grid } from '@mui/material';
import { useState } from 'react';
import { JhaFE } from '../types/jha';
import { ConfirmationDialog, DoButton } from './Inputs';
import { CardStyles, DeleteButton, ExpandMoreComp, AlertDialog } from './Inputs';
import { StringFunctions } from '../types/utils';
import DocumentDataView from './DocumentDataView';
import { isOk } from '../types/result';
import StepList from './StepList';
import { deleteJha } from '../services/jha-service';
import DocumentForm from './DocumentForm';
import { BorderAllRounded } from '@mui/icons-material';

interface DocumentCardProps {
  key: string,
  jha: JhaFE,
  refreshCallbackFn: () => void;
}

const DocumentCard = (props: DocumentCardProps): JSX.Element => {

  const [expanded, setExpanded] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [alertDetails, setAlertDetails] = useState<string | null>(null);
  
  const handleDelete = () => { setOpenDeleteModal(true); }

  return (
    <>
      <Card sx={CardStyles.card}>
        <CardHeader title={props.jha.title} subheader={'Author: ' + StringFunctions.formatName(props.jha.author)}/>
        <CardContent sx={CardStyles.cardContentCard}>
          <DocumentDataView values={props.jha}/>
        </CardContent>
        <CardActions>
          <DocumentForm jha={props.jha} refreshCallBackFn={props.refreshCallbackFn}/>
          <DeleteButton fn={handleDelete} text={'this job hazard analysis document'}/>
          <DoButton text='Show Steps' fn={() => setExpanded(!expanded)}/>
        </CardActions>
        <Collapse in={expanded} timeout='auto' unmountOnExit sx={CardStyles.collapse}>
          <CardContent sx={CardStyles.cardContentCollapse}>
            <Grid container>
              <StepList jha={props.jha}/>
            </Grid>
          </CardContent>
        </Collapse>
      </Card>
      <ConfirmationDialog 
        title={'Delete Job Hazard Analysis'}
        text={'Are you sure you want to delete this Job Hazard Analysis?'}
        isSubmitting={isSubmitting}
        open={openDeleteModal}
        closeFn={() => setOpenDeleteModal(false)}
        action={() => { 
          setSubmitting(true);
          deleteJha(props.jha.uid).then((res) => {
            setSubmitting(false);
            if (isOk(res)) {
              props.refreshCallbackFn(); 
            }
            setOpenDeleteModal(false);
          });
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