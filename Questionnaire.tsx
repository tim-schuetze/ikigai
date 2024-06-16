import React, { useState } from 'react';

const categories = [
    { id: "entrepreneurial_orientation1", title: "Entrepreneurial Orientation (1)", description: "In the medium and longer term, considering all advantages and disadvantages (economic, personal, social recognition, labour stability, and so on), indicate your level of attraction towards each of the following professional options.", scale: ["Strongly disagree", "Disagree", "Somewhat disagree", "Undecided", "Somewhat agree", "Agree", "Strongly agree"] },
    { id: "entrepreneurial_orientation2", title: "Entrepreneurial Orientation (2)", description: "Indicate your level of agreement with the following sentences.", scale: ["Strongly disagree", "Disagree", "Somewhat disagree", "Undecided", "Somewhat agree", "Agree", "Strongly agree"] },
    { id: "clarity_business_idea", title: "Clarity about your Business Idea", description: "Referring to the business idea developed in class, please indicate your level of agreement with the following statements.", scale: ["Minimum Attraction (1)", "2", "3", "4", "5", "6", "Maximum Attraction (7)"] },
    { id: "clarity_personal_values", title: "Clarity about your Personal Values", description: "Referring to the business idea developed in class, please indicate your level of agreement with the following statements.", scale: ["Strongly disagree", "Disagree", "Somewhat disagree", "Undecided", "Somewhat agree", "Agree", "Strongly agree"] },
    { id: "clarity_core_competences", title: "Clarity about your Core Competences", description: "Referring to the business idea developed in class, please indicate your level of agreement with the following statements.", scale: ["Strongly disagree", "Disagree", "Somewhat disagree", "Undecided", "Somewhat agree", "Agree", "Strongly agree"] },
    { id: "personal_values_business_fit", title: "Perceived Personal Values - Business Idea Fit", description: "Referring to the business idea developed in class, please indicate your level of agreement with the following statements.", scale: ["Strongly disagree", "Disagree", "Somewhat disagree", "Undecided", "Somewhat agree", "Agree", "Strongly agree"] },
    { id: "core_competences_business_fit", title: "Perceived Core Competences - Business Idea Fit", description: "Referring to the business idea developed in class, please indicate your level of agreement with the following statements.", scale: ["Strongly disagree", "Disagree", "Somewhat disagree", "Undecided", "Somewhat agree", "Agree", "Strongly agree"] },
    { id: "perceived_impact", title: "Perceived Impact", description: "Referring to the business idea developed in class, please indicate your level of agreement with the following statements.", scale: ["Very negative", "Fairly negative", "Somewhat negative", "Undecided", "Somewhat positive", "Fairly positive", "Very positive"] },
    { id: "market_attractiveness", title: "Perceived Market Attractiveness", description: "Referring to the business idea developed in class, please indicate your level of agreement with the following statements.", scale: ["Very low", "Fairly low", "Somewhat low", "Undecided", "Somewhat high", "Fairly high", "Very high"] },
    { id: "anticipated_profitability", title: "Anticipated Profitability", description: "With respect to your specific offering, please estimate the following aspects.", scale: ["Very low", "Low", "Somewhat low", "Medium", "Somewhat high", "High", "Very high"] },
    { id: "access_key_resources", title: "Access to Key Resources", description: "Referring to the business idea developed in class, please indicate your level of agreement with the following statements.", scale: ["Strongly disagree", "Disagree", "Somewhat disagree", "Undecided", "Somewhat agree", "Agree", "Strongly agree"] },
    { id: "social_norms", title: "Social Norms", description: "If you decided to realize the business idea developed in class, people in your close environment would approve of that decision? Please indicate the level of approvement.", scale: ["Strongly disapprove", "Disapprove", "Somewhat disapprove", "Neutral", "Somewhat approve", "Approve", "Strongly approve"] },
    { id: "attitude1", title: "Attitude towards the Business Idea (1)", description: "Referring to the business idea developed in class, please rate the following statements.", scale: ["-5", "-4", "-3", "-2", "-1", "0", "1", "2", "3", "4", "5"] },
    { id: "attitude2", title: "Attitude towards the Business Idea (2)", description: "Referring to the business idea developed in class, please indicate your level of agreement with the following statements.", scale: ["Strongly disagree", "Disagree", "Somewhat disagree", "Undecided", "Somewhat agree", "Agree", "Strongly agree"] }
];

type QuestionCategory =
    | "entrepreneurial_orientation1"
    | "entrepreneurial_orientation2"
    | "clarity_business_idea"
    | "clarity_personal_values"
    | "clarity_core_competences"
    | "personal_values_business_fit"
    | "core_competences_business_fit"
    | "perceived_impact"
    | "market_attractiveness"
    | "anticipated_profitability"
    | "access_key_resources"
    | "social_norms"
    | "attitude1"
    | "attitude2";

const questions: Record<QuestionCategory, string[]> = {
    entrepreneurial_orientation1: [
        "Salaried work",
        "Liberal profession (Freiberufler)",
        "Entrepreneur"
    ],
    entrepreneurial_orientation2: [
        "Being an entrepreneur implies more advantages than disadvantages to me.",
        "A career as entrepreneur is attractive for me.",
        "If I had the opportunity and resources, I’d like to start a firm.",
        "Being an entrepreneur would entail great satisfactions for me.",
        "Among various options, I’d rather be an entrepreneur."
    ],
    clarity_business_idea: [
        "I know which product or service I want to develop.",
        "I know the potential customers for my offering.",
        "I know the problems I want to solve with my offering.",
        "I know the value proposition of the product or service.",
        "I can easily describe the business idea to a friend or partner."

    ],
    clarity_personal_values: [
        "I know my most important personal values.",
        "I know what is important to me in my life.",
        "I know what motivates me in life."
    ],
    clarity_core_competences: [
        "I know the things I am good at doing.",
        "I have knowledge that helps me solving problems in my professional life.",
        "I know my most developed skills.",
        "I know my attitude towards entrepreneurship."
    ],
    personal_values_business_fit: [
        "The business idea fits well to my personal values.",
        "My personal values are well reflected in the business idea.",
        "The business idea represents what is important to me.",
        "The business idea motivates me doing what is important to me."
    ],
    core_competences_business_fit: [
        "With my core competences it would be very easy for me to realize the business idea.",
        "With my core competences, I can control the realization process of my business idea.",
        "I know the necessary practical details to realize my business idea.",
        "I have the right skills to realize my business idea.",
        "If I tried to realize my business idea, I would have a high probability of succeeding."
    ],
    perceived_impact: [
        "Estimate the impact of your offering on the ecological environment.",
        "Estimate the impact of your offering on the people`s well- being.",
        "Estimate the impact of your offering on your own life."

    ],
    market_attractiveness: [
        "Estimate the anticipated market size for your offering.",
        "Estimate the anticipated market growth in the next 5-10 years.",
        "Estimate the anticipated intensity of your competitors.",
        "Estimate the anticipated entry barriers to the market.",
        "Estimate the anticipated threat of substitutes affecting your offering."
    ],
    anticipated_profitability: [
        "Estimate the anticipated short term net profitability.",
        "Estimate the anticipated potential to increase the profitability over time through efficiency gains.",
        "Estimate the anticipated potential to increase the profitability through additional revenue streams."
    ],
    access_key_resources: [
        "I have the resources needed to successfully realize the business idea.",
        "I have easy access to resources needed to successfully realize the business idea.",
        "My team has the resources needed to successfully realize the business idea.",
        "My team has easy access to resources needed to successfully realize the business idea."
    ],
    social_norms: [
        "Your close family",
        "Your friends",
        "Your fellow students"
    ],
    attitude1: [
        "Not Attractive - Attractive",
        "Undesirable - Desirable",
        "Not promising - Promising",
        "Meaningless - Meaningful",
        "Boring - Inspiring",
        "Shortsighted -  Visionary",
        "Dislikable - Likable"
    ],
    attitude2: [
        "After my studies, I would love to realize this business idea",
        "If I had the right team, I would love to realize this business idea",
        "If I could take a semester off, I would love to realize this business idea",
        "If I had a substantial funding, I would love to realize this business idea",
        "Realizing the business idea would entail great satisfactions for me.",
        "After my studies, I would love to apply for the EXIST Business Start-up Grant to realize my business idea"
    ]
};

const Questionnaire = () => {
    const [currentQuestionIndices, setCurrentQuestionIndices] = useState<{ [key in QuestionCategory]: number }>(
        categories.reduce((acc, category) => {
            const categoryId = category.id as QuestionCategory;
            acc[categoryId] = 0;
            return acc;
        }, {} as { [key in QuestionCategory]: number })
    );

    const [answers, setAnswers] = useState<{ [key in QuestionCategory]: number[] }>(
        categories.reduce((acc, category) => {
            const categoryId = category.id as QuestionCategory;
            acc[categoryId] = Array(questions[categoryId].length).fill(0);
            return acc;
        }, {} as { [key in QuestionCategory]: number[] })
    );

    const handleAnswerChange = (category: QuestionCategory, questionIndex: number, value: number) => {
        setAnswers({
            ...answers,
            [category]: answers[category].map((answer, idx) =>
                idx === questionIndex ? value : answer
            )
        });
    };

    const nextQuestion = (category: QuestionCategory) => {
        if (answers[category][currentQuestionIndices[category]] === 0) {
            alert("Please answer the question before proceeding.");
        } else {
            setCurrentQuestionIndices({
                ...currentQuestionIndices,
                [category]: currentQuestionIndices[category] + 1
            });
        }
    };

    const prevQuestion = (category: QuestionCategory) => {
        setCurrentQuestionIndices({
            ...currentQuestionIndices,
            [category]: currentQuestionIndices[category] - 1
        });
    };


    const handleSubmit = (categoryId: QuestionCategory, categoryTitle: string) => {
        if (answers[categoryId][currentQuestionIndices[categoryId]] === 0) {
            alert("Please answer the question before submitting.");
        } else {
            alert(`You have completed the ${categoryTitle} section. Thank you for your responses!`);
        }
    };



    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            margin: '0 auto',
            padding: '20px',
            maxWidth: '800px'
        }}>
            {categories.map((category, index) => (
                <div key={category.id} style={{
                    marginBottom: '40px',
                    padding: '20px',
                    borderRadius: '8px',
                    backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#f0f0f0',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px'
                    }}>
                        <div style={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: '#b85c38',
                            marginRight: '20px'
                        }}>{categories.findIndex(cat => cat.id === category.id) + 1}</div>
                        <div style={{flexGrow: 1}}>
                            <h2 style={{color: '#b85c38'}}>{category.title}</h2>
                            <p>{category.description}</p>
                            <div style={{marginTop: '30px'}}>
                                <p>Question {currentQuestionIndices[category.id as QuestionCategory] + 1}: {questions[category.id as QuestionCategory][currentQuestionIndices[category.id as QuestionCategory]]}</p>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginTop: '10px',
                                    position: 'relative',
                                    padding: '10px 0'
                                }}>
                                    {category.scale.map((label, value) => (
                                        <label key={value} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            flexDirection: 'column',
                                            width: `${100 / category.scale.length}%`,
                                            textAlign: 'center'
                                        }}>
                                            <span style={{fontSize: '12px', marginBottom: '5px'}}>{label}</span>
                                            <input
                                                type="radio"
                                                name={`${category.id}_q${currentQuestionIndices[category.id as QuestionCategory]}`}
                                                value={value + 1}
                                                checked={answers[category.id as QuestionCategory][currentQuestionIndices[category.id as QuestionCategory]] === value + 1}
                                                onChange={() => handleAnswerChange(category.id as QuestionCategory, currentQuestionIndices[category.id as QuestionCategory], value + 1)}
                                                style={{margin: '5px'}}
                                            />
                                        </label>
                                    ))}
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => prevQuestion(category.id as QuestionCategory)}
                                        disabled={currentQuestionIndices[category.id as QuestionCategory] === 0}
                                        style={{
                                            marginTop: '20px',
                                            padding: '10px 20px',
                                            border: 'none',
                                            borderRadius: '4px',
                                            backgroundColor: '#b85c38',
                                            color: 'white',
                                            cursor: 'pointer',
                                            marginRight: '10px'
                                        }}
                                    >
                                        Back
                                    </button>
                                    {currentQuestionIndices[category.id as QuestionCategory] < questions[category.id as QuestionCategory].length - 1 ? (
                                        <button
                                            type="button"
                                            onClick={() => nextQuestion(category.id as QuestionCategory)}
                                            style={{
                                                marginTop: '20px',
                                                padding: '10px 20px',
                                                border: 'none',
                                                borderRadius: '4px',
                                                backgroundColor: '#b85c38',
                                                color: 'white',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Next
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => handleSubmit(category.id as QuestionCategory, category.title)}
                                            style={{
                                                marginTop: '20px',
                                                padding: '10px 20px',
                                                border: 'none',
                                                borderRadius: '4px',
                                                backgroundColor: '#b85c38',
                                                color: 'white',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Submit
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Questionnaire;

function handleSubmit(arg0: string, title: any): void {
    throw new Error('Function not implemented.');
}

