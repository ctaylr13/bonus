import { styled } from "@linaria/react";
import type { Game, TeamSide } from "./types";

type ScoreboardProps = {
    games: Game[];
    date: string;
    loading: boolean;
    error: string;
};

const formatRecord = (side: TeamSide) =>
    side.leagueRecord ? `${side.leagueRecord.wins}-${side.leagueRecord.losses}` : "";

const formatStartTime = (iso: string) =>
    new Date(iso).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

const Scoreboard = ({ games, date, loading, error }: ScoreboardProps) => {
    return (
        <Page>
            <Header>
                <h1>MLB scoreboard</h1>
                {date && <Subtitle>{date}</Subtitle>}
            </Header>

            {loading && <Muted>Loading…</Muted>}
            {error && <ErrorBox>{error}</ErrorBox>}
            {!loading && !error && games.length === 0 && <Muted>No games scheduled.</Muted>}

            <List>
                {games.map((game) => {
                    const { away, home } = game.teams;
                    const started = away.score !== undefined && home.score !== undefined;

                    return (
                        <Row key={game.gamePk}>
                            <Matchup>
                                <TeamLine>
                                    <TeamName>{away.team.name}</TeamName>
                                    <Record>{formatRecord(away)}</Record>
                                    {started && <Score>{away.score}</Score>}
                                </TeamLine>
                                <TeamLine>
                                    <TeamName>{home.team.name}</TeamName>
                                    <Record>{formatRecord(home)}</Record>
                                    {started && <Score>{home.score}</Score>}
                                </TeamLine>
                            </Matchup>

                            <Meta>
                                <State>{game.status.detailedState}</State>
                                {!started && <Muted>{formatStartTime(game.gameDate)}</Muted>}
                                <Venue>{game.venue.name}</Venue>
                            </Meta>
                        </Row>
                    );
                })}
            </List>
        </Page>
    );
};

const Page = styled.main`
    max-width: 760px;
    margin: 0 auto;
    padding: 40px 24px;
    font-family: ui-sans-serif, system-ui, sans-serif;
`;

const Header = styled.header`
    margin-bottom: 24px;

    h1 {
        margin: 0;
        font-size: 32px;
        font-weight: 600;
        letter-spacing: -0.02em;
    }
`;

const Subtitle = styled.p`
    margin: 4px 0 0;
    color: #666;
    font-size: 14px;
`;

const Muted = styled.span`
    color: #777;
    font-size: 13px;
`;

const ErrorBox = styled.p`
    padding: 12px 14px;
    border: 1px solid #e0b4b0;
    border-radius: 8px;
    background: #fdf3f2;
    color: #a33;
    font-size: 14px;
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Row = styled.article`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 14px 16px;
    border: 1px solid #e6e6e6;
    border-radius: 10px;
`;

const Matchup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const TeamLine = styled.div`
    display: flex;
    align-items: baseline;
    gap: 8px;
`;

const TeamName = styled.span`
    font-size: 15px;
    font-weight: 500;
`;

const Record = styled.span`
    color: #888;
    font-size: 12px;
`;

const Score = styled.span`
    font-family: ui-monospace, monospace;
    font-size: 15px;
    font-weight: 600;
`;

const Meta = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
    text-align: right;
`;

const State = styled.span`
    font-size: 13px;
    font-weight: 500;
`;

const Venue = styled.span`
    color: #999;
    font-size: 12px;
`;

export default Scoreboard;
