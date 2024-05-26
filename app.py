import dash
import dash_core_components as dcc
import dash_html_components as html
import dash_bootstrap_components as dbc
from dash.dependencies import Input, Output, State

# Initialize the Dash app with Bootstrap theme
app = dash.Dash(__name__, external_stylesheets=[dbc.themes.BOOTSTRAP])
app.title = "Sidebar Example with Subcategories"

# Define a function to create a collapsible item
def create_collapsible_item(panel_id, title, links):
    return html.Div([
        dbc.Button(
            title,
            id=f"button-{panel_id}",
            className="mb-2",
            color="link",
            n_clicks=0,
            style={'color': 'black', 'text-decoration': 'none', 'font-size': '50px'},  # Add font-size here
        ),
        dbc.Collapse(
            dbc.Nav(
                [dbc.NavLink(link['name'], href=link['href'], style={'color': 'black', 'text-decoration': 'none'}) for link in links],
                vertical=True,
                pills=True,
            ),
            id=f"collapse-{panel_id}",
            is_open=False,
        )
    ], style={'margin-bottom': '10px'})

# Define the layout of the app
app.layout = html.Div([
    dcc.Location(id='url', refresh=False),
    dbc.Row([
        dbc.Col(
            [
                dbc.NavLink("Overview", href="/overview", style={'color': 'black', 'text-decoration': 'none', 'font-size': '20px'}),

                create_collapsible_item(
                    'panel1', 'Your Profile',
                    [
                        {'name': 'Subcategory 1.1', 'href': '/panel1/sub1'},
                        {'name': 'Subcategory 1.2', 'href': '/panel1/sub2'},
                    ]
                ),
                create_collapsible_item(
                    'panel2', 'Reports',
                    [
                        {'name': 'Subcategory 2.1', 'href': '/panel2/sub1'},
                        {'name': 'Subcategory 2.2', 'href': '/panel2/sub2'},
                    ]
                ),
            ],
            width=3,
            style={'padding-top': '20px', 'background-color': '#D3D3D3'}  # Light gray
        ),
        dbc.Col(id='page-content', width=9)
    ])
])

# Callbacks to toggle the collapsible items
@app.callback(
    Output("collapse-panel1", "is_open"),
    [Input("button-panel1", "n_clicks")],
    [State("collapse-panel1", "is_open")],
    prevent_initial_call=True,
)
def toggle_collapse_panel1(n, is_open):
    if n:
        return not is_open
    return is_open

@app.callback(
    Output("collapse-panel2", "is_open"),
    [Input("button-panel2", "n_clicks")],
    [State("collapse-panel2", "is_open")],
    prevent_initial_call=True,
)
def toggle_collapse_panel2(n, is_open):
    if n:
        return not is_open
    return is_open

# Define the callback to update the page content
@app.callback(
    Output('page-content', 'children'),
    [Input('url', 'pathname')]
)
def display_page(pathname):
    if pathname == '/panel1/sub1':
        return html.Div([
            html.H3('Panel 1 - Subcategory 1'),
            html.P('Content for Panel 1 Subcategory 1.')
        ])
    elif pathname == '/panel1/sub2':
        return html.Div([
            html.H3('Panel 1 - Subcategory 2'),
            html.P('Content for Panel 1 Subcategory 2.')
        ])
    elif pathname == '/panel2/sub1':
        return html.Div([
            html.H3('Panel 2 - Subcategory 1'),
            html.P('Content for Panel 2 Subcategory 1.')
        ])
    elif pathname == '/panel2/sub2':
        return html.Div([
            html.H3('Panel 2 - Subcategory 2'),
            html.P('Content for Panel 2 Subcategory 2.')
        ])
    elif pathname == '/panel3/sub1':
        return html.Div([
            html.H3('Panel 3 - Subcategory 1'),
            html.P('Content for Panel 3 Subcategory 1.')
        ])
    elif pathname == '/panel3/sub2':
        return html.Div([
            html.H3('Panel 3 - Subcategory 2'),
            html.P('Content for Panel 3 Subcategory 2.')
        ])
    else:
        return html.Div([
            html.H3('Welcome'),
            html.P('Please select a panel from the sidebar.')
        ])

# Run the app
if __name__ == '__main__':
    app.run_server(debug=True)