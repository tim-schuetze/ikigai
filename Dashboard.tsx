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
  gap: 20px; /* Added gap between score boxes */
`;

const SmallScoreContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
  gap: 20px; /* Added gap between score boxes */
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
  position: relative;

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
  margin-bottom: 30px; /* Added margin-bottom to create space below the progress bar */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProgressBarLabel = styled.h4`
  margin-right: 10px; /* Added space between label and progress bar */
`;

const ProgressBar = styled.div<{ percentage: number }>`
  width: 70%;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  position: relative;

  &::before {
    content: "${({ percentage }) => percentage}%";
    position: absolute;
    top: 0;
    left: ${({ percentage }) => percentage}%;
    transform: translateX(-50%);
    display: block;
    height: 100%;
    color: ${({ percentage }) => (percentage > 0 ? '#fff' : 'transparent')};
    background-color: ${({ percentage }) => (percentage > 0 ? '#265c82' : 'transparent')};
    padding: 0 5px;
    border-radius: 10px;
    transition: width 0.3s ease-in-out;
  }

  &::after {
    content: "";
    display: block;
    height: 100%;
    width: ${({ percentage }) => percentage}%;
    background-color: #265c82;
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
  background: #8c96a0;
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
  color: #000000;
  padding: 10px;
  border-radius: 8px;
  margin-top: 10px;
  width: 100%;
  text-align: center;
`;

const TooltipContainer = styled.div<{ higher: boolean }>`
  position: absolute;
  bottom: ${({ higher }) => (higher ? '90px' : '20px')}; /* Adjusted these values to move the icon lower */
  right: 10px;
  background: #e0e0e0; /* Match the background color of the rest */
  color: #fff;
  padding: 5px;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  cursor: pointer;
`;

const TooltipText = styled.div`
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 125%; /* Position the tooltip above the icon */
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;

  ${TooltipContainer}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;

const TEAM_COLOR = '#74aeb2'; // Green for Team Score
const BACKGROUND_COLOR = '#E0E0E0'; // Background color for unused portions

const scores = {
    teamIkigai: 80,
    personalIkigai: 75,
    constructs: [
        { id: 'construct1', name: 'Entrepreneurial Orientation', team: 35, personal: 60, alert: 'Error message 1' },
        { id: 'construct2', name: 'Clarity about the Business Idea', team: 65, personal: 70, alert: 'Error message 2' },
        { id: 'construct3', name: 'Clarity about your Personal Values', team: 75, personal: 80, alert: 'Error message 3' },
        { id: 'construct4', name: 'Clarity about your Core Competences', team: 50, personal: 55, alert: 'Error message 4' },
        { id: 'construct5', name: 'Perceived Personal Values - Business Idea Fit', team: 45, personal: 50, alert: 'Error message 5' },
        { id: 'construct6', name: 'Perceived Core Competences - Business Idea Fit', team: 55, personal: 60, alert: 'Error message 6' },
        { id: 'construct7', name: 'Perceived Impact', team: 65, personal: 70, alert: 'Error message 7' },
        { id: 'construct8', name: 'Perceived Market Attractiveness', team: 75, personal: 80, alert: 'Error message 8' },
        { id: 'construct9', name: 'Anticipated Profitability', team: 85, personal: 90, alert: 'Error message 9' },
        { id: 'construct10', name: 'Access to Key Resources', team: 95, personal: 100, alert: 'Error message 10' },
        { id: 'construct11', name: 'Social Norms', team: 30, personal: 35, alert: 'Error message 11' },
        { id: 'construct12', name: 'Attitude towards the Business Idea', team: 25, personal: 30, alert: 'Error message 12' },
    ],
};

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleCollapsible = () => {
        setIsOpen(!isOpen);
    };

    const renderScoreBox = (construct: { id: string; name: string; team: number; personal: number; alert: string }) => (
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
                <ProgressBarLabel>Personal</ProgressBarLabel>
                <ProgressBar percentage={construct.personal} />
            </ProgressBarContainer>
            {construct.team < 40 && (
                <>
                    <AlertBox>Please discuss {construct.name} again</AlertBox>
                    <TooltipContainer higher>
                        ?
                        <TooltipText>{construct.alert}</TooltipText>
                    </TooltipContainer>
                </>
            )}
            {construct.team >= 40 && (
                <TooltipContainer higher={false}>
                    ?
                    <TooltipText>{construct.id}</TooltipText>
                </TooltipContainer>
            )}
        </SmallScoreBox>
    );

    return (
        <DashboardContainer>
            <MainScoreContainer>
                <ScoreBox>
                    <h3>team venture</h3>
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
                    <TooltipContainer higher={false}>
                        ?
                        <TooltipText>teamIkigai</TooltipText>
                    </TooltipContainer>
                </ScoreBox>
                <ScoreBox>
                    <h3>your venture</h3>
                    <ProgressBarContainer>
                        <ProgressBarLabel>Personal</ProgressBarLabel>
                        <ProgressBar percentage={scores.personalIkigai} />
                    </ProgressBarContainer>
                    {/* Conditionally render the percentage */}
                    {false && <p>{scores.personalIkigai}%</p>}
                    <TooltipContainer higher={false}>
                        ?
                        <TooltipText>personalIkigai</TooltipText>
                    </TooltipContainer>
                </ScoreBox>
            </MainScoreContainer>

            <LargeScoreContainer>
                {renderScoreBox(scores.constructs.find(c => c.id === 'construct5')!)}
                {renderScoreBox(scores.constructs.find(c => c.id === 'construct6')!)}
                {renderScoreBox(scores.constructs.find(c => c.id === 'construct9')!)}
                {renderScoreBox(scores.constructs.find(c => c.id === 'construct8')!)}
            </LargeScoreContainer>

            <CollapsibleContainer>
                <CollapsibleHeader onClick={toggleCollapsible}>
                    {isOpen ? 'Hide other scores' : 'Show other scores'}
                </CollapsibleHeader>
                {isOpen && (
                    <CollapsibleContent>
                        <SmallScoreContainer>
                            {scores.constructs
                                .filter(c => !['construct5', 'construct6', 'construct9', 'construct8'].includes(c.id))
                                .map(renderScoreBox)}
                        </SmallScoreContainer>
                    </CollapsibleContent>
                )}
            </CollapsibleContainer>
        </DashboardContainer>
    );
};

export default Dashboard;
