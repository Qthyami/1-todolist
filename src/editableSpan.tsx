import React, {useState} from "react";

type EditableSpanPropsType = {
    title: string
    editMode: boolean;
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    let [editMode,setEditMode]= useState(false);
    return editMode
    ? <input> value={props.title}</input>
        : <span>{props.title}</span>
}