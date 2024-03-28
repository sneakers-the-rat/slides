# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = "2024-03-27: LinkML Arrays"
copyright = "2024, jonny saunders"
author = "jonny saunders"
release = "0.0.1"

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = [
    "myst_nb",
    "sphinx_design",
    "sphinxcontrib.bibtex",
    "sphinxcontrib.mermaid",
    "sphinx.ext.intersphinx",
]

templates_path = ["_templates"]
exclude_patterns = ["_build", "Thumbs.db", ".DS_Store"]
bibtex_bibfiles = ["2024-03-27.bib"]

# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = "furo"
html_static_path = ["_static"]
html_css_files = ["main.css", "notebooks.css"]
html_js_files = ["keys.js"]
html_title = "2024-03-27:<br>LinkML Arrays"

html_baseurl = "/slides/2024-03-27_linkml-arrays"
pygments_dark_style = "github-dark"

mermaid_init_js = """
mermaid.initialize({
  securityLevel: 'loose',
  theme: 'dark',
});
"""

myst_enable_extensions = ["fieldlist", "colon_fence"]

intersphinx_mapping = {
    "python": ("https://docs.python.org/3", None),
    "pydantic": ("https://docs.pydantic.dev/latest", None),
    "jinja2": ("https://jinja.palletsprojects.com/en/latest/", None),
    "numpydantic": ("https://numpydantic.readthedocs.io/en/latest/", None),
    "linkml": ("https://linkml.io/linkml/", None),
    "linkml_runtime": ("https://linkml.io/linkml/", None),
}
