from dash import html
import dash_bootstrap_components as dbc

layout = dbc.Container([
    dbc.Row([
        dbc.Col([
            html.Div([
                html.H3('Ikigai', style={'margin-bottom': '10px'}),
                html.P('Ikigai is a Japanese concept that translates to "reason for being" or "purpose in life." It describes the things that make life worthwhile and helps find a balance between personal passions, skills, what the world needs, and what one can be paid for. In a business context, Ikigai can serve as a guide to developing business ideas that are not only economically successful but also personally fulfilling and socially beneficial.')
            ], style={'display': 'flex', 'flex-direction': 'column', 'justify-content': 'center', 'height': '100%'})
        ], width=6),  # Text in der linken Spalte
        dbc.Col([
            html.Div([
                html.Img(src='/assets/ikigai_logo.jpg', style={'width': '100%', 'border-radius': '10px'})
            ], style={'display': 'flex', 'justify-content': 'center', 'align-items': 'center', 'height': '100%'})
        ], width=6),  # Bild in der rechten Spalte
    ], style={'height': '80vh', 'align-items': 'center'})  # Zentrierung auf der Seite
], fluid=True)

