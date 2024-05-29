from dash import html
import dash_bootstrap_components as dbc

def create_card(name):
    return dbc.Card([dbc.CardBody(name, className="card-text")], className="mb-3", style={'border-radius': '10px', 'background-color': '#ADD8E6'})

layout = html.Div([
    html.H3('Ergebnisse'),
    html.Div([
        create_card("Venture-to-Person-Fit"),
        create_card("Team-Core-Values-Fit"),
        create_card("Team-Competence-Fit"),
        create_card("Team-Core-Values-Business-Idea-Fit"),
        create_card("Team-Core-Competence-Business-Idea-Fit"),
    ])
])

