import dash
import dash_core_components as dcc
import dash_html_components as html
import dash_bootstrap_components as dbc
from dash.dependencies import Input, Output, State

# Initialize the Dash app with Bootstrap theme
app = dash.Dash(__name__, external_stylesheets=[dbc.themes.BOOTSTRAP, 'https://use.fontawesome.com/releases/v5.15.3/css/all.css'])
app.title = "Collapsible Sidebar Example with Subcategories"

# Function to create a collapsible item
def create_collapsible_item(panel_id, title, links):
    return html.Div([
        dbc.Button(
            title, id=f"button-{panel_id}", className="mb-2", color="link", n_clicks=0, style={'text-align': 'left', 'padding-left': '20px'}
        ),
        dbc.Collapse(
            dbc.Nav(
                [dbc.NavLink(link['name'], href=link['href'], style={'padding-left': '40px'}) for link in links],
                vertical=True, pills=True,
            ),
            id=f"collapse-{panel_id}", is_open=False,
        )
    ], style={'margin-bottom': '10px'})

# Define the layout of the app
app.layout = html.Div([
    dcc.Location(id='url', refresh=False),
    dbc.Row([
        dbc.Col(
            [
                html.Div(html.I(className="fas fa-bars fa-2x", id="toggle-button", style={'cursor': 'pointer'}), style={'padding-top': '20px'}),
                dbc.Collapse(
                    html.Div([
                        html.H2(className="sidebar-title", style={'padding-top': '20px'}),
                        html.Div([
                            create_collapsible_item('panel1', 'Overview', []),
                            create_collapsible_item('panel2', 'Your Profile', [{'name': 'Subcategory 2.1', 'href': '/panel2/sub1'}, {'name': 'Subcategory 2.2', 'href': '/panel2/sub2'}, {'name': 'Subcategory 2.3', 'href': '/panel2/sub3'}, {'name': 'Subcategory 2.4', 'href': '/panel2/sub4'}, {'name': 'Subcategory 2.5', 'href': '/panel2/sub5'}]),
                            create_collapsible_item('panel3', 'Reports', []),
                        ], style={'padding-top': '50px'})
                    ], style={'background-color': '#f8f9fa', 'padding': '20px', 'height': '100vh', 'overflow-y': 'auto'}),
                    id="sidebar-collapse", is_open=True
                )
            ], width=3, id="sidebar-col"
        ),
        dbc.Col(html.Div(id='page-content', style={'padding': '20px'}), width=9)
    ], style={'margin': '0'})
])


# Callback for collapsing items and sidebar
@app.callback(
    [Output(f"collapse-{panel_id}", "is_open") for panel_id in ['panel1', 'panel2', 'panel3']] + [Output("sidebar-collapse", "is_open")],
    [Input(f"button-{panel_id}", "n_clicks") for panel_id in ['panel1', 'panel2', 'panel3']] + [Input("toggle-button", "n_clicks")],
    [State(f"collapse-{panel_id}", "is_open") for panel_id in ['panel1', 'panel2', 'panel3']] + [State("sidebar-collapse", "is_open")],
    prevent_initial_call=True,
)
def toggle_collapses(*args):
    ctx = dash.callback_context
    triggered_id = ctx.triggered[0]['prop_id'].split('.')[0]
    is_open_list = list(args[-4:])
    if triggered_id == "toggle-button":
        is_open_list[-1] = not is_open_list[-1]
    else:
        panel_index = ['button-panel1', 'button-panel2', 'button-panel3'].index(triggered_id)
        is_open_list[panel_index] = not is_open_list[panel_index]
    return is_open_list

# Callback to update the page content
@app.callback(Output('page-content', 'children'), [Input('url', 'pathname')])
def display_page(pathname):
    content_map = {
        '/panel1/sub1': ('Panel 1 - Subcategory 1', 'Content for Panel 1 Subcategory 1.'),
        '/panel1/sub2': ('Panel 1 - Subcategory 2', 'Content for Panel 1 Subcategory 2.'),
        '/panel2/sub1': ('Panel 2 - Subcategory 1', 'Content for Panel 2 Subcategory 1.'),
        '/panel2/sub2': ('Panel 2 - Subcategory 2', 'Content for Panel 2 Subcategory 2.'),
        '/panel3/sub1': ('Panel 3 - Subcategory 1', 'Content for Panel 3 Subcategory 1.'),
        '/panel3/sub2': ('Panel 3 - Subcategory 2', 'Content for Panel 3 Subcategory 2.')
    }
    title, content = content_map.get(pathname, ('Welcome', 'Please select a panel from the sidebar.'))
    return html.Div([html.H3(title), html.P(content)])

# Run the app
