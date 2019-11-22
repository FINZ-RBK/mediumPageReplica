import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SignUpForm from "./SignUpForm";
const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog
        padding="0px"
        maxWidth="40%"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        ></DialogTitle>
        <DialogContent style={{ padding: "0px" }}>
          <Container>
            <Row>
              <Col sm={1.5} style={{ padding: "0px", width: "20%" }}>
                <div>
                  <img
                    src="https://miro.medium.com/max/214/1*4A5l12K8ize1400kV83dPw.png"
                    width="214"
                    height="550"
                  ></img>
                </div>
              </Col>
              <Col
                sm={7.8}
                style={{
                  padding: "0px",
                  textAlign: "center",
                  width: "60%"
                }}
              >
                <div>
                  <SignUpForm handleClose={handleClose.bind(this)}></SignUpForm>
                </div>
              </Col>
              <Col
                sm={1.5}
                style={{ padding: "0px", textAlignL: "end", width: "20%" }}
              >
                <div>
                  <img
                    src="https://miro.medium.com/max/214/1*XVLaTKHOGlnXqvnPe2Ahaw.png"
                    width="100%"
                    height="550"
                  ></img>
                </div>
              </Col>
            </Row>
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  );
}
