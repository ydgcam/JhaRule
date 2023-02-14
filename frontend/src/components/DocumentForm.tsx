import { Grid, TextField, Stack, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { JobHazardDocument } from "../types/jha";
import { Step } from "../types/step";
import { CreateButton } from "./Inputs";
import StepForm from './StepForm';

export interface DocumentFormProps {
  document?: JobHazardDocument;
}

const DocumentForm = (props: DocumentFormProps) => {

  const [title, setTitle] = useState(props.document ? props.document.title : 'New Document Title');
  const [author, setAuthor] = useState(props.document ? (props.document.authorFirst + ' ' + props.document.authorLast) : 'Authored By');
  const [steps, setSteps] = useState<Step[]>([]);

  const createJHA = () => {};
  const createStep = () => {};
  return (
    <Grid container id='page' bgcolor='common.white' style={{ minHeight: '100vh' }} spacing={0} direction='column'>
      <Grid item>
        <Stack>
          <TextField required fullWidth name='title' label={title} variant='standard' color='primary'
            value={title} onChange={(event) => {setTitle(event.target.value)}}/>
          <TextField required fullWidth name='author' label={author} variant='standard' color='primary'
            value={author} onChange={(event) => {setAuthor(event.target.value)}}/>
          <Grid container id='steps' bgcolor='container' spacing={0} direction='column'>
            <Grid item container direction='row'>
              <Grid item xs={6}>
                <Typography variant='h1'>Steps</Typography>
              </Grid>
              <Grid item xs={2}>
                <CreateButton entity={'Next Step'} fn={createStep}/>
              </Grid>
            </Grid>
            {
              steps.map((val, index) => {
                return (
                  <Grid item>
                    <StepForm
                      key={val.uid}
                      step={val}
                    />
                  </Grid>
                );
              })
            }
          </Grid>
          <Grid container>
            <Grid item xs={4}>
              <Button type='submit' variant="contained">
                <Typography variant='button'>Submit</Typography>
              </Button>
            </Grid>
          </Grid>
        </Stack>  
      </Grid>
    </Grid>
  );

}
export default DocumentForm;