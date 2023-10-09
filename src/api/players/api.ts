import {instance} from "../common/api/commonApi";

const userJSON = localStorage.getItem('user');
const user = userJSON ? JSON.parse(userJSON) : '';


export const playersApi = {


    getPlayers(paramsQuery: ParamsType) {
        return instance.get<PlayersType>("api/Player/GetPlayers", {
            headers: {Authorization: "Bearer " + user.token},
            params: paramsQuery
        })
            .then((res) => res.data)
            .catch((error) => {
                console.error("Error fetching teams:", error);
                throw error;
            });
    },
    getTeam(paramsQuery: any) {
        return instance.get<TeamType>("api/team/get", {
            headers: {Authorization: "Bearer " + user.token},
            params: {id: paramsQuery.team}
        })
            .then((res) => res.data)
            .catch((error) => {
                console.error("Error fetching teams:", error);
                throw error;
            });
    },
    getPlayerId(id: number) {
        return instance.get<PlayerType>("api/Player/Get", {
            headers: {Authorization: "Bearer " + user.token},
            params: {id: id}
        })
            .then((res) => res.data)
            .catch((error) => {
                console.error("Error fetching teams:", error);
                throw error;
            });
    },

};

export type ParamsType = {
    name: string,
    page: number,
    pageSize: number,
}

export type TeamType = {
    id: number,
}

export type PlayersType = {
    data: PlayerType[],
    count: number,
    page: number,
    size: number,
    team: number,
}

export type PlayerType = {
    name: string,
    number: number,
    position: string,
    team: number,
    birthday: Date
    height: number,
    weight: number,
    avatarUrl: string,
    id: number
    teamName?: string
}
