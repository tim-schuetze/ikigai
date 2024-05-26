import dash
import dash_core_components as dcc
import dash_html_components as html
import dash_bootstrap_components as dbc
from dash.dependencies import Input, Output, State

# Initialize the Dash app with Bootstrap theme
app = dash.Dash(__name__, external_stylesheets=[dbc.themes.BOOTSTRAP])
app.title = "Sidebar Example with Subcategories"

# Define a function to create a collapsible item
def create_collapsible_item(item_id, title, links, style=None):
    return html.Div([
        dbc.Button(
            title,
            id=f"button-{item_id}",
            className="mb-2",
            color="link",
            n_clicks=0,
        ),
        dbc.Collapse(
            dbc.Nav(
                [dbc.NavLink(link['name'], href=link['href']) for link in links],
                vertical=True,
                pills=True,
            ),
            id=f"collapse-{item_id}",
            is_open=False,
        )
    ], style=style)

# Define the layout of the app
app.layout = html.Div([
    dcc.Location(id='url', refresh=False),
    dbc.Row([
        dbc.Col(
            [
                html.H2("Sidebar", className="sidebar-title"),
                create_collapsible_item(
                    'panel1', 'Panel 1',
                    [
                        {'name': 'Subcategory 1.1', 'href': '/panel1/sub1'},
                        {'name': 'Subcategory 1.2', 'href': '/panel1/sub2'},
                    ]
                ),
                create_collapsible_item(
                    'panel2', 'Panel 2',
                    [
                        {'name': 'Subcategory 2.1', 'href': '/panel2/sub1'},
                        {'name': 'Subcategory 2.2', 'href': '/panel2/sub2'},
                    ]
                ),
                create_collapsible_item(
                    'panel3', 'Panel 3',
                    [
                        {'name': 'Subcategory 3.1', 'href': '/panel3/sub1'},
                        {'name': 'Subcategory 3.2', 'href': '/panel3/sub2'},
                    ],
                    style={'margin-bottom': '200px'} # Add top margin
                ),
            ],
            width=3,
            style={
                'background-color': '#f8f9fa',
                'padding': '20px',
                'height': '100vh'
            }
        ),
        dbc.Col(
            html.Div(id='page-content', style={'padding': '20px'}),
            width=9
        )
    ])
])

# List of panel ids
panel_ids = ['panel1', 'panel2', 'panel3']

# Dynamic callback to toggle the collapsible items
for panel_id in panel_ids:
    app.callback(
        Output(f"collapse-{panel_id}", "is_open"),
        [Input(f"button-{panel_id}", "n_clicks")],
        [State(f"collapse-{panel_id}", "is_open")],
        prevent_initial_call=True
    )(lambda n, is_open: not is_open if n else is_open)

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