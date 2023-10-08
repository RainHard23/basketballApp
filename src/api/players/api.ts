import {instance} from "../common/api/commonApi";

const userJSON = localStorage.getItem('user');
const user = userJSON ? JSON.parse(userJSON) : '';

export const playersApi = {
    getPlayers(paramsQuery: any) {
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
};

export type PlayersType = {
    data: PlayerType[],
    count: number,
    page: number,
    size: number
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
    teamName: string
}
