from dash.dependencies import Input, Output
from pages import ikigai, questionnaire, ergebnisse, grafiken

def register_callbacks(app):
    @app.callback(
        Output('page-content', 'children'),
        [Input('url', 'pathname')]
    )
    def display_page(pathname):
        if pathname == '/ikigai':
            return ikigai.layout
        elif pathname == '/questionnaire':
            return questionnaire.layout
        elif pathname == '/Ergebnisse':
            return ergebnisse.layout
        elif '/grafiken' in pathname:
            return grafiken.layout

