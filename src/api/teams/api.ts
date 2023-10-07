import {instance} from "../common/api/commonApi";

const userJSON = localStorage.getItem('user');
const user = userJSON ? JSON.parse(userJSON) : '';

export const teamApi = {
    getTeams(paramsQuery: any) {
        return instance.get<TeamsType>("api/Team/GetTeams", {
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

export type TeamsType = {
    data: TeamType[],
    count: number,
    page: number,
    size: number
}

export type TeamType = {
    name: string;
    foundationYear: number;
    division: string;
    conference: string;
    imageUrl: string;
    id: number;
}
