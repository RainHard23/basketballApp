import React from 'react';
import './App.css';
import {Header} from "./common/components/Header/header";
import {MenuNavBar} from "./common/components/navigation/menu/MenuNavBar";
import {TeamCard} from "./modules/teams/components/teamcard/teamcard";
import {Pagination} from "./common/components/ui/Pagination";
import {CardsFooter} from "./common/components/FooterCards";
import {CardsdLayouts} from "./common/components/layouts/CardsLayouts";
import {TeamsPage} from "./modules/teams/components/teams/TeamsPage";
import  {PagesRouter} from "./route/PagesRouter";


function App() {
    const options = [
        {value: 'chocolate', label: 'Chocolate'},
        {value: 'strawberry', label: 'Strawberry'},
        {value: 'vanilla', label: 'Vanilla'},
        {value: 'vanilla1', label: 'Vanilla1'},
        {value: 'vanilla2', label: 'Vanilla2'},
    ]


    return (
        <div>
            {/*<Checkbox label={"Text"}/>*/}
            {/*<Button cancelBtn>*/}
            {/*    Add <img src={plus} alt=""*/}
            {/*/>*/}
            {/*</Button>*/}
            {/*<Input type={"text"} name={"kek"} label={"Login"} disabled={false} placeholder={"Search"}/>*/}
            {/*<Select1 options={options}/>*/}

            {/*<Pagination />*/}
            {/*<TeamCard />*/}
            {/*<CardsFooter />*/}
            <PagesRouter />

        </div>
    );
}

export default App;
