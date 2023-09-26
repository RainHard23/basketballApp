import React from 'react';
import './App.css';
import {Checkbox} from "./common/components/checkbox/checkbox";
import Button from "./common/components/button/button";
import Input from "./common/components/input/input";
import plus from "./assests/icons/iconAdd.svg"
import {Select1} from "./common/components/select/select";


function App() {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
        { value: 'vanilla1', label: 'Vanilla1' },
        { value: 'vanilla2', label: 'Vanilla2' },
    ]



    return (
        <div>
            <Checkbox label={"Text"}/>
            <Button cancelBtn>
                Add <img src={plus} alt=""
            />
            </Button>
            <Input type={"text"} name={"kek"} label={"Login"} disabled={false} placeholder={"Search"}/>
            <Select1 options={options}/>
        </div>
    );
}

export default App;
