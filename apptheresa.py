import dash
import dash_core_components as dcc
import dash_html_components as html
from dash import dcc, html
from dash.dependencies import Input, Output

# Initialisiere das Dash-Board
app = dash.Dash(__name__)

# Definiere das Layout des Dash-Boards
app.layout = html.Div([
    html.Div([
        html.H2("Navigation"),
        dcc.Link("- Overview", href="/", className="nav-link"),
        html.Br(),
        dcc.Link("- Your Profile", href="/", className="nav-link"),
        html.Br(),
        dcc.Link("1. Venture-to-Person-Fit", href="/venture", className="nav-link"),
        html.Br(),
        dcc.Link("2. Team Core Values fit", href="/teamvalues", className="nav-link") ,
        html.Br(),
        dcc.Link("3. Team-Competence-Fit", href="/competences", className="nav-link"),
        html.Br(),
        dcc.Link("4. Team-Core Values- business idea fit", href="/coreValues", className="nav-link"),
        html.Br(),
        dcc.Link("5. Team Core Competences- Business idea fit", href="/teamcore_competences", className="nav-link"),
        html.Br(),
        dcc.Link("-Reports", href="/reports", className="nav-link"),
    ], style={'width': '20%', 'display': 'inline-block', 'verticalAlign': 'top'}),
    
    html.Div(id='page-content', style={'width': '75%', 'display': 'inline-block', 'padding': '20px'})
])

# Definiere den Inhalt der verschiedenen Seiten
@app.callback(Output('page-content', 'children'),
              [Input('url', 'pathname')])
def display_page(pathname):
    if pathname == '/venture':
        return html.Div([
            html.H3("venture to person"),
            dcc.Textarea(
                placeholder='Enter text...',
                value='1. Your Profile',
                style={'width': '100%', 'height': 200},
            )
        ])
    elif pathname == '/teamvalues':
        return html.Div([
            html.H3("Team Core Values"),
            dcc.Textarea(
                placeholder='Enter text...',
                value='2. Team core values',
                style={'width': '100%', 'height': 200},
            )
        ])
    elif pathname == '/coreValues':
        return html.Div([
            html.H3("Core Values"),
            dcc.Textarea(
                placeholder='Enter text...',
                value='3. Venture to Person',
                style={'width': '100%', 'height': 200},
            )
        ])
    elif pathname == '/values':
        return html.Div([
            html.H3("Team Core Values"),
            dcc.Textarea(
                placeholder='Enter text...',
                value='4. Team Core Values',
                style={'width': '100%', 'height': 200},
            )
        ])
    elif pathname == '/teamcore_competences':
        return html.Div([
            html.H3("Team Core Competences"),
            dcc.Textarea(
                placeholder='Enter text...',
                value='5. Team Core Competences',
                style={'width': '100%', 'height': 200},
            )
        ])
    elif pathname == '/reports':
        return html.Div([
            html.H3("Reports"),
            dcc.Textarea(
                placeholder='Enter text...',
                value='6. Reports',
                style={'width': '100%', 'height': 200},
            )
        ])
    else:
        return html.Div([
            html.H3("Overview"),
            dcc.Textarea(
                placeholder='Enter text...',
                value='7. Overview',
                style={'width': '100%', 'height': 200},
            )
        ])

# Fügt die URL-Komponente zur Verfolgung der Seiten hinzu
app.layout.children.append(dcc.Location(id='url', refresh=False))

# Starte den Server
if __name__ == '__main__':
    app.run_server(debug=True)


   




                