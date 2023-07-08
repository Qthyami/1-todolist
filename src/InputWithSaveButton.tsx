import React, {ChangeEvent, useState} from 'react';

const InputWithSaveButton = () => {
    const [inputValue, setInputValue] = useState('');
    const [savedValue, setSavedValue] = useState('');

    const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value);
    };

    const handleSaveClick = () => {
        setSavedValue(inputValue);
        setInputValue('');
    };

    return (
        <div>
            <input type="text" value={inputValue} onChange={handleInputChange} />
            <button onClick={handleSaveClick}>Save</button>
            <span>{savedValue}</span>
        </div>
    );
};

export default InputWithSaveButton;
