import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';

//Utils
import { getFormById, getUserById } from '../../Utils/api';

import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 345,
    maxWidth: 345,
    margin: 10,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function HomepageCardRespondido({ form_id }) {
  const [form, setForm] = useState([]);
  const formID = form_id;
  const [name, setName] = useState('');
  const user_id = localStorage.getItem('id');

  useEffect(() => {
    getFormById(formID)
      .then((res) => {
        setForm(res.data);
        setName(res.data.nome);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log('FORME AQUI', form.user_id);

  const history = useHistory();

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const openForm = () => {
    history.push(`/receita/${formID}`);
  };

  const showLink = () => {
    alert(form.link);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      {name.length == 0 ? (
        <CircularProgress />
      ) : (
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {name[0]}
              </Avatar>
            }
            title={name}
          />
          <CardContent>
            <Typography variant="body1" color="textPrimary" component="p">
              {form.nome}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton
              onClick={openForm}
              target="blank"
              aria-label="open form"
            >
              <AssignmentOutlinedIcon />
            </IconButton>
            <IconButton onClick={showLink} aria-label="share">
              <ShareIcon />
            </IconButton>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Description:</Typography>
              <Typography paragraph>{form.descricao}</Typography>
            </CardContent>
          </Collapse>
        </Card>
      )}
    </>
  );
}
