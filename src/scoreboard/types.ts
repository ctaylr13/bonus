export type TeamSide = {
    team: { name: string };
    leagueRecord?: { wins: number; losses: number };
    score?: number;
};

export type Game = {
    gamePk: number;
    gameDate: string;
    status: { detailedState: string };
    teams: { away: TeamSide; home: TeamSide };
    venue: { name: string };
};

export type ScheduleResponse = {
    dates: { date: string; games: Game[] }[];
};
