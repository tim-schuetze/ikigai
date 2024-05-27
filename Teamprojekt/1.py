#test


import dash
from dash import html
from dash import dcc
import dash_bootstrap_components as dbc
from dash.dependencies import Input, Output

# Initialize the Dash app with Bootstrap theme
app = dash.Dash(__name__, external_stylesheets=[dbc.themes.BOOTSTRAP])
app.title = "Sidebar Example with Subcategories"
def create_nav_link(name, href, style):
    return dbc.NavLink(name, href=href, style=style)

def create_card(name):
    return dbc.Card([dbc.CardBody(name, className="card-text")], className="mb-3", style={'border-radius': '10px', 'background-color': '#ADD8E6'})

# Define the layout of the app
app.layout = html.Div([
    dcc.Location(id='url', refresh=False),
    dbc.Row([
        dbc.Col(
            [
                html.Br(),  # Adding spacing at the top of the sidebar
                create_nav_link("Overview", "/overview", {'color': 'black', 'text-decoration': 'none', 'font-size': '20px', 'padding-left': '30px', 'padding-bottom': '50px'}),
                create_nav_link("Your Profile", "/profile", {'color': 'black', 'text-decoration': 'none', 'font-size': '20px', 'padding-left': '30px', 'padding-bottom': '0px'}),
                dbc.Collapse([
                    create_nav_link("Venture-to-Person-Fit", "/profile/venture-to-person-fit", {'color': 'black', 'text-decoration': 'none', 'font-size': '16px', 'padding-left': '50px'}),
                    create_nav_link("Team Core Values-Fit", "/profile/team-core-values-fit", {'color': 'black', 'text-decoration': 'none', 'font-size': '16px', 'padding-left': '50px'}),
                    create_nav_link("Team Competence-Fit", "/profile/team-competence-fit", {'color': 'black', 'text-decoration': 'none', 'font-size': '16px', 'padding-left': '50px'}),
                    create_nav_link("Team Core Values-Business Idea Fit", "/profile/team-core-values-business-idea-fit", {'color': 'black', 'text-decoration': 'none', 'font-size': '16px', 'padding-left': '50px'}),
                    create_nav_link("Team Core Competence-Business Idea Fit", "/profile/team-core-competence-business-idea-fit", {'color': 'black', 'text-decoration': 'none', 'font-size': '16px', 'padding-left': '50px'}),
                ], id='subcategories', is_open=True),
                create_nav_link("Reports", "/reports", {'color': 'black', 'text-decoration': 'none', 'font-size': '20px', 'padding-left': '30px', 'padding-top': '50px'}),
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

# Define the callback to update the page content
@app.callback(
    Output('page-content', 'children'),
    [Input('url', 'pathname')]
)
def display_page(pathname):
    if pathname == '/overview':
        return html.Div([
            html.H3('1'),
            html.P('Content for Overview page.')
        ])
    elif pathname == '/profile':
        return html.Div([
            html.H3('2'),
            html.Div([
                create_card("Venture-to-Person-Fit"),
                create_card("Team-Core-Values-Fit"),
                create_card("Team-Competence-Fit"),
                create_card("Team-Core-Values-Business-Idea-Fit"),
                create_card("Team-Core-Competence-Business-Idea-Fit"),
            ])
        ])
    elif '/profile' in pathname:
        return html.Div([
            html.H3('3'),  # Display the headline
            html.P('Content for Profile page.')
        ])
    elif pathname == '/reports':
        return html.Div([
            html.H3('4'),
            html.P('Content for Reports page.')
        ])
    else:
        return html.Div([
            html.H3('5'),
            html.P('Please select a panel from the sidebar.')
        ])

# Run the app
if __name__ == '__main__':
    app.run_server(debug=True)