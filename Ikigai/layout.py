import dash_bootstrap_components as dbc
from dash import html, dcc

def create_nav_link(name, href, style):
    return dbc.NavLink(name, href=href, style=style)

layout = html.Div([
    dcc.Location(id='url', refresh=False),
    dbc.Row([
        dbc.Col(
            [
                html.Br(),
                create_nav_link("Ikigai", "/ikigai", {'color': 'black', 'text-decoration': 'none', 'font-size': '20px', 'padding-left': '30px', 'padding-bottom': '50px'}),
                create_nav_link("Questionnaire", "/questionnaire", {'color': 'black', 'text-decoration': 'none', 'font-size': '20px', 'padding-left': '30px', 'padding-bottom': '50px'}),
                create_nav_link("Ergebnisse", "/Ergebnisse", {'color': 'black', 'text-decoration': 'none', 'font-size': '20px', 'padding-left': '30px', 'padding-bottom': '50px'}),
        
                dbc.Collapse([
                    create_nav_link("Venture-to-Person-Fit", "/profile/venture-to-person-fit", {'color': 'black', 'text-decoration': 'none', 'font-size': '16px', 'padding-left': '50px'}),
                    create_nav_link("Team Core Values-Fit", "/profile/team-core-values-fit", {'color': 'black', 'text-decoration': 'none', 'font-size': '16px', 'padding-left': '50px'}),
                    create_nav_link("Team Competence-Fit", "/profile/team-competence-fit", {'color': 'black', 'text-decoration': 'none', 'font-size': '16px', 'padding-left': '50px'}),
                    create_nav_link("Team Core Values-Business Idea Fit", "/profile/team-core-values-business-idea-fit", {'color': 'black', 'text-decoration': 'none', 'font-size': '16px', 'padding-left': '50px'}),
                    create_nav_link("Team Core Competence-Business Idea Fit", "/profile/team-core-competence-business-idea-fit", {'color': 'black', 'text-decoration': 'none', 'font-size': '16px', 'padding-left': '50px'}),
                ], id='subcategories', is_open=True),
                create_nav_link("Grafiken", "/grafiken", {'color': 'black', 'text-decoration': 'none', 'font-size': '20px', 'padding-left': '30px', 'padding-top': '50px'}),
            ],
            width=3,
            style={'padding-top': '20px', 'background-color': '#D3D3D3', 'height': '100vh'}  # Light gray
         ),
        dbc.Col([
            html.Div([
                dbc.Col(id='page-content', width=12),
                dbc.Row(  # Add this row for the black bar
                    dbc.Col(
                        html.Div("IKIGAI for Entrepreneurs", className="text-white text-center"),
                        style={'background-color': 'black', 'padding': '20px', 'margin-left': '0', 'margin-right': '0'},
                    ),
                ),
            ], style={'display': 'flex', 'flex-direction': 'column', 'justify-content': 'space-between', 'height': '100vh'}),  # Add flex properties here
        ], width=9),
    ]),
])

