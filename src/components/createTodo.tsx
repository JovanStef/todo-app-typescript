
import React , {FC} from "react";
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';
import { IProps } from "../models/IProps";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(0.5),
        width: '15ch',
      },
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      }
  }),
);
const CreateTodo:FC<IProps>=(props:IProps)=>{
    const importance = [
        {
            value: 'low',
            label: 'Low',
        },
        {
            value: 'medium',
            label: 'Medium',
        },
        {
            value: 'high',
            label: 'High',
        }
    ];
    const classes = useStyles();
    const handleSubmit=(event: any)=> {
        console.log(event.target[0].value)
        console.log(event.target[2].value)
        console.log(event.target[4].value)
        console.log(event.target[5].value)
        props.todoFromChild({
          id:uuidv4(),
          name:event.target[0].value,
          importance:event.target[2].value,
          dateDue:event.target[4].value,
          desc:event.target[5].value,
          dateCreated:new Date(),
          completed:false
        })
        event.preventDefault();

      }

    return(
      <div className="d-flex flex-wrap justify-content-center ">
        <div className="create-todo-wrapper d-flex flex-column flex-wrap justify-content-center p-3">
        <div className="border-bottom mb-3"><h5>Create Todo:</h5></div>
        
            <form className={classes.root + " d-flex flex-wrap"} noValidate autoComplete="off" onSubmit={handleSubmit}>
                {/* Todo name */}
            <TextField
          id="outlined-helperText"
          label="Name"
          defaultValue=" "
          helperText="Todo name"
          variant="outlined"
        />

        {/* Todo importance */}
        <TextField
          id="outlined-select-currency-native"
          select
          label="Importance"
        //   value={currImportance}
        //   onChange={handleChange}
          SelectProps={{
            native: true,
          }}
          helperText="Please select"
          variant="outlined"
          
        >
          {importance.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>

        {/* Date created */}
        <TextField
        id="date"
        label="Due date"
        type="date"
        // defaultValue={date}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      ></TextField>
      <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={2}
          defaultValue=" "
          variant="outlined"
        ></TextField>
        
        <input type="submit" value="Save" className="btn btn-secondary align-self-center"/>
        </form>
        </div>
        </div>
    )
}

export default CreateTodo;