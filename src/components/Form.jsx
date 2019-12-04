import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const Form = ({
  onSendMessage,
  onChange,
  value
}) => (
  <form
    noValidate
    autoComplete="off"
    onSubmit={onSendMessage}
    className="Message-form"
  >
    <Grid container>
      <Grid container xs={10}>
        <TextField
          fullWidth
          label="Message"
          margin="normal"
          value={value}
          onChange={onChange}
        />
      </Grid>
      <Grid container xs={2}>
        <Button
          variant="contained"
          color="primary"
          endIcon={<Icon>send</Icon>}
          onClick={onSendMessage}
        >
          Send
        </Button>
      </Grid>
    </Grid>
  </form>
)

export default Form;
