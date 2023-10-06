import {instance} from "../../common/api/commonApi";

export const teamApi = {
    getTeams() {
        return instance.get<TeamsType>("api/Team/GetTeams");
    },
};

export type TeamsType = {
    data: [
        {
            "name": "string",
            "foundationYear": number,
            "division": "string",
            "conference": "string",
            "imageUrl": "string",
            "id": number
        }
    ],
    count: number,
    page: number,
    size: number
}
