import React, { useState } from 'react';
import styled from 'styled-components';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f2f5;
`;

const MainScoreContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;

const LargeScoreContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 20px;
`;

const SmallScoreContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;

const ScoreBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 45%;
  margin-bottom: 20px;
  text-align: center;

  h3 {
    margin: 0 0 10px;
    font-size: 18px;
    color: #333;
  }

  p {
    margin: 0;
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }
`;

const SmallScoreBox = styled(ScoreBox)`
  width: 45%;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProgressBar = styled.div<{ percentage: number }>`
  width: 70%;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  margin-right: 10px;

  &::before {
    content: "${({ percentage }) => percentage}%";
    position: absolute;
    top: 0;
    left: ${({ percentage }) => percentage}%;
    transform: translateX(-50%);
    display: block;
    height: 100%;
    color: ${({ percentage }) => (percentage > 0 ? '#fff' : 'transparent')};
    background-color: ${({ percentage }) => (percentage > 0 ? '#B22222' : 'transparent')};
    padding: 0 5px;
    border-radius: 10px;
    transition: width 0.3s ease-in-out;
  }

  &::after {
    content: "";
    display: block;
    height: 100%;
    width: ${({ percentage }) => percentage}%;
    background-color: #B22222;
    transition: width 0.3s ease-in-out;
  }
`;

const PieLabel = styled.div<{ percentage: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  color: #333;
`;

const CollapsibleContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const CollapsibleHeader = styled.div`
  background: #D2691E;
  color: white;
  padding: 10px;
  cursor: pointer;
  border-radius: 8px;
  text-align: center;
`;

const CollapsibleContent = styled.div`
  padding: 10px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const AlertBox = styled.div`
  background-color: #ffcccc;
  color: #D2691E;
  padding: 10px;
  border-radius: 8px;
  margin-top: 10px;
  width: 100%;
  text-align: center;
`;

const TEAM_COLOR = '#008000'; // Grün für Team Score
const BACKGROUND_COLOR = '#E0E0E0'; // Hintergrundfarbe für nicht belegte Anteile

const scores = {
    teamIkigai: 80,
    personalIkigai: 75,
    constructs: [
        { id: 'construct1', name: 'Entrepreneurial Orientation', team: 35, personal: 60 },
        { id: 'construct2', name: 'Clarity about the Business Idea', team: 65, personal: 70 },
        { id: 'construct3', name: 'Clarity about your Personal Values', team: 75, personal: 80 },
        { id: 'construct4', name: 'Clarity about your Core Competences', team: 50, personal: 55 },
        { id: 'construct5', name: 'Perceived Personal Values - Business Idea Fit', team: 45, personal: 50 },
        { id: 'construct6', name: 'Perceived Core Competences - Business Idea Fit', team: 55, personal: 60 },
        { id: 'construct7', name: 'Perceived Impact', team: 65, personal: 70 },
        { id: 'construct8', name: 'Perceived Market Attractiveness', team: 75, personal: 80 },
        { id: 'construct9', name: 'Anticipated Profitability', team: 85, personal: 90 },
        { id: 'construct10', name: 'Access to Key Resources', team: 95, personal: 100 },
        { id: 'construct11', name: 'Social Norms', team: 30, personal: 35 },
        { id: 'construct12', name: 'Attitude towards the Business Idea', team: 25, personal: 30 },
    ],
};

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleCollapsible = () => {
        setIsOpen(!isOpen);
    };

    const renderScoreBox = (construct: { id: string; name: string; team: number; personal: number }) => (
        <SmallScoreBox key={construct.id}>
            <h3>{construct.name}</h3>
            <div style={{ position: 'relative' }}>
                <PieChart width={150} height={150}>
                    <Pie
                        data={[
                            { name: 'Team', value: construct.team },
                            { name: 'Rest', value: 100 - construct.team },
                        ]}
                        startAngle={180}
                        endAngle={0}
                        innerRadius={40}
                        outerRadius={60}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        <Cell key="team" fill={TEAM_COLOR} />
                        <Cell key="rest" fill={BACKGROUND_COLOR} />
                    </Pie>
                    <Tooltip />
                </PieChart>
                <PieLabel percentage={construct.team}>{construct.team}%</PieLabel>
            </div>
            <ProgressBarContainer>
                <h4>Persönlich</h4>
                <ProgressBar percentage={construct.personal} />
            </ProgressBarContainer>
            {construct.team < 40 && <AlertBox>Bitte redet nochmal über {construct.name}</AlertBox>}
        </SmallScoreBox>
    );

    return (
        <DashboardContainer>
            <MainScoreContainer>
                <ScoreBox>
                    <h3>Team Ikigai</h3>
                    <div style={{ position: 'relative' }}>
                        <PieChart width={150} height={150}>
                            <Pie
                                data={[
                                    { name: 'Team', value: scores.teamIkigai },
                                    { name: 'Rest', value: 100 - scores.teamIkigai },
                                ]}
                                startAngle={180}
                                endAngle={0}
                                innerRadius={40}
                                outerRadius={60}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                <Cell key="team" fill={TEAM_COLOR} />
                                <Cell key="rest" fill={BACKGROUND_COLOR} />
                            </Pie>
                            <Tooltip />
                        </PieChart>
                        <PieLabel percentage={scores.teamIkigai}>{scores.teamIkigai}%</PieLabel>
                    </div>
                </ScoreBox>
                <ScoreBox>
                    <h3>Persönlicher Ikigai</h3>
                    <ProgressBarContainer>
                        <ProgressBar percentage={scores.personalIkigai} />
                    </ProgressBarContainer>
                    <p>{scores.personalIkigai}%</p>
                </ScoreBox>
            </MainScoreContainer>

            <LargeScoreContainer>
                {renderScoreBox(scores.constructs.find(c => c.id === 'construct4')!)}
                {renderScoreBox(scores.constructs.find(c => c.id === 'construct6')!)}
                {renderScoreBox(scores.constructs.find(c => c.id === 'construct7')!)}
                {renderScoreBox(scores.constructs.find(c => c.id === 'construct8')!)}
            </LargeScoreContainer>

            <CollapsibleContainer>
                <CollapsibleHeader onClick={toggleCollapsible}>
                    {isOpen ? 'Andere Scores verbergen' : 'Andere Scores anzeigen'}
                </CollapsibleHeader>
                {isOpen && (
                    <CollapsibleContent>
                        <SmallScoreContainer>
                            {scores.constructs
                                .filter(c => !['construct4', 'construct6', 'construct7', 'construct8'].includes(c.id))
                                .map(renderScoreBox)}
                        </SmallScoreContainer>
                    </CollapsibleContent>
                )}
            </CollapsibleContainer>
        </DashboardContainer>
    );
};

export default Dashboard;
