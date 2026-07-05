import streamlit as st
import streamlit.components.v1 as components
import base64
import os

st.set_page_config(
    page_title="Nako Home Care",
    page_icon="🐶",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Hide Streamlit header, footer and adjust margins to make the iframe fill the screen
st.markdown("""
    <style>
        #MainMenu {visibility: hidden;}
        footer {visibility: hidden;}
        header {visibility: hidden;}
        div.block-container {
            padding-top: 0rem;
            padding-bottom: 0rem;
            padding-left: 0rem;
            padding-right: 0rem;
            height: 100vh;
        }
        iframe {
            width: 100%;
            height: calc(100vh - 5px);
            border: none;
            display: block;
            margin: 0;
            padding: 0;
        }
    </style>
""", unsafe_allow_html=True)

def get_base64_image(image_path):
    if os.path.exists(image_path):
        with open(image_path, "rb") as image_file:
            encoded = base64.b64encode(image_file.read()).decode()
            return f"data:image/png;base64,{encoded}"
    return ""

def load_app():
    # Load files
    with open("index.html", "r", encoding="utf-8") as f:
        html = f.read()
    
    with open("src/styles.css", "r", encoding="utf-8") as f:
        css = f.read()
        
    with open("src/data.js", "r", encoding="utf-8") as f:
        data_js = f.read()
        
    with open("src/app.js", "r", encoding="utf-8") as f:
        app_js = f.read()
        
    # Get base64 logo
    logo_base64 = get_base64_image("assets/nako-logo.png")
    
    # Inline the logo in JavaScript
    if logo_base64:
        app_js = app_js.replace('"assets/nako-logo.png"', f'"{logo_base64}"')
        app_js = app_js.replace("'assets/nako-logo.png'", f"'{logo_base64}'")
    
    # Inline CSS and JS into HTML
    # Replace stylesheet link tag with styles
    html = html.replace(
        '<link rel="stylesheet" href="src/styles.css" />',
        f'<style>{css}</style>'
    ).replace(
        '<link rel="stylesheet" href="src/styles.css">',
        f'<style>{css}</style>'
    )
    
    # Replace script tags with inlined JavaScript content
    html = html.replace(
        '<script src="src/data.js"></script>',
        f'<script>{data_js}</script>'
    ).replace(
        '<script src="src/app.js"></script>',
        f'<script>{app_js}</script>'
    )
    
    return html

try:
    html_content = load_app()
    # Embed the single self-contained HTML page
    components.html(html_content, height=1000, scrolling=True)
except Exception as e:
    st.error(f"Error loading application files: {e}")
