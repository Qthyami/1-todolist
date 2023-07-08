import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import {Button, IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (title: string) => void;
};

export const AddItemForm = (props: AddItemFormPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {

        setNewTaskTitle(e.currentTarget.value);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === "Enter") {
            addItem();
        }
    };

    const addItem = () => {
        if (newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle);

            setNewTaskTitle("");
        } else {
            setError("Title is required");
        }
    };

    return (
        <div>
            <TextField
                value={newTaskTitle}
                variant={"outlined"}
                label={"Type value"}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? "error" : ""}
                error={error ? true : false}
                helperText={error}
            />
            <IconButton onClick={addItem} color={"primary"}><ControlPoint/></IconButton>


        </div>
    );
};
