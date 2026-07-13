import { useState, useEffect, useContext } from "react";
// Swapped Material UI icons for Lucide React!
import { Dribbble, Users, CalendarDays } from "lucide-react";
import axios from "axios";

import StatsCard from "../components/StatsCard";
import Card from "../components/Card";
import TopScorer from "../components/TopScorer";
import Standing from "../components/Standing";
import Matches from "../components/Matches";
import { SideNavContext } from "../../contexts/Sidenavontext";

// Directly targeting your live Render backend
const API_URL = 'https://efootball-tz.onrender.com';

const Dashboard = () => {
  const [standing, setStandings] = useState([]);
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useContext(SideNavContext);

  const fetchStandings = async () => {
    try {
      const res = await axios.get(`${API_URL}/teams/standings`);
      setStandings(res.data);
    } catch (err) {
      setError("Failed to fetch teams");
    }
  };

  const fetchTeams = async () => {
    try {
      const res = await axios.get(`${API_URL}/teams`);
      setTeams(res.data);
    } catch (err) {
      setError("Failed to fetch teams");
    }
  };

  const fetchMatches = async () => {
    try {
      const res = await axios.get(`${API_URL}/matches`);
      setMatches(res.data);
    } catch (err) {
      setError("Failed to fetch matches");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchStandings(), fetchMatches() , fetchTeams()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading)
    return <div className="text-center text-white py-8">Loading teams...</div>;
  if (error)
    return <div className="text-center text-white py-8">Error: {error}</div>;

  const topscorer = [...standing].sort(
    (a, b) => b.GF + b.KOGF - (a.GF + a.KOGF)
  );

  const sortedTeams = standing
    .map((team) => ({
      ...team,
      pts:
        Number(team.wins) * 3 +
        Number(team.draws) -
        Number(team.sanction || 0),
    }))
    .sort(
      (a, b) =>
        b.pts - a.pts || (b.GF - b.GA) - (a.GF - a.GA) || b.GF - a.GF
    );

  const goals = standing.reduce((acc, team) => acc + team.GF + team.KOGF, 0);
  const matchesPlayed = matches.filter((m) => m.played === 1).length;
  const totalTeams = teams.length;

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Welcome {user?.name}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        <StatsCard
          label="Total Goals"
          value={goals}
          icon={
            <Dribbble size={32} className="text-primary" />
          }
        />
        <StatsCard
          label="Total Teams"
          value={totalTeams}
          icon={
            <Users size={32} className="text-primary" />
          }
        />
        <StatsCard
          label="Matches Played"
          value={matchesPlayed}
          icon={
            <CalendarDays size={32} className="text-primary" />
          }
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
        <Card title="Top Scorer">
          <TopScorer teams={topscorer} />
        </Card>
        <Card title="Standing">
          <Standing teams={sortedTeams} />
        </Card>
        <Card title="Matches">
          <Matches matches={matches} />
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
