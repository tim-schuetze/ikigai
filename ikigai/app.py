import dash
import dash_bootstrap_components as dbc
from layout import layout
import callbacks

# Initialize the Dash app with Bootstrap theme
app = dash.Dash(__name__, external_stylesheets=[dbc.themes.BOOTSTRAP])
app.title = "Sidebar Example with Subcategories"

# Set the layout
app.layout = layout

# Register callbacks
callbacks.register_callbacks(app)

# Run the app
if __name__ == '__main__':
    app.run_server(debug=True)
