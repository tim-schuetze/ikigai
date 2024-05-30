from dash.dependencies import Input, Output
from pages import ikigai, venture, teamcore, teamcompetence, competencebusiness, valuesbusiness

def register_callbacks(app):
    @app.callback(
        Output('page-content', 'children'),
        [Input('url', 'pathname')]
    )
    def display_page(pathname):
        if pathname == '/ikigai':
            return ikigai.layout
        elif pathname == '/venture':
            return venture.layout
        elif pathname == '/teamcore':
            return teamcore.layout
        elif pathname == "/teamcompetence":
            return teamcompetence.layout
        elif pathname == "/competencebusiness":
            return competencebusiness.layout
        elif pathname == "/valuesbusiness":
            return valuesbusiness.layout
        
        

