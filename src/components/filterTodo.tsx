import React, { FC } from "react";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { filterActions } from "../services/todoService";
const FilterTodo: FC = () => {
  const setFilterOpt = (e: any) => {
    filterActions.filterTodo(e.target.value);
  };
  const filterOpt = [
    {
      value: "dateCreated",
      label: "date created",
    },
    {
      value: "name",
      label: "name",
    },
    {
      value: "importance",
      label: "importance",
    },
    {
      value: "dateDue",
      label: "date due",
    },
    {
      value: "completed",
      label: "completed",
    },
  ];
  return (
    <div className="filter-todo-wrapper d-flex flex-column flex-wrap justify-content-center align-content-center p-3">
      <div className="border-bottom mb-3">
        <h5>Filter Todo:</h5>
      </div>
      <div>
        <TextField
          id="outlined-select-currency-native"
          select
          label="Filter by"
          //   value={null}
          onChange={setFilterOpt}
          SelectProps={{
            native: true,
          }}
          helperText="Filter todos"
          variant="outlined"
        >
          {filterOpt.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label[0].toUpperCase() +
                option.label.substring(1, option.label.length)}
            </option>
          ))}
        </TextField>
      </div>
    </div>
  );
};

export default FilterTodo;
