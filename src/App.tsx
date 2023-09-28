import React from 'react';
import './App.css';
import {Header} from "./common/components/navigation/Header";
import {MenuNavBar} from "./common/components/navigation/MenuNavBar";
import {TeamCard} from "./pages/entities/teams/components/teamCard/TeamCard";
import {Pagination} from "./common/components/ui/Pagination";
import {CardsFooter} from "./pages/entities/FooterCards";
import {CardsdLayouts} from "./pages/entities/CardsLayouts";
import {TeamsPage} from "./pages/entities/teams/components/teams/TeamsPage";
import {PagesRouter} from "./pages/routes/PagesRouter";



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
