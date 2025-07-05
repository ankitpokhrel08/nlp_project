# app.py

import streamlit as st
from main import lemmatize_word

st.title("Lemmatizer API Interface")

input_text = st.text_input("Enter a word to lemmatize:")

if st.button("Lemmatize"):
    if input_text:
        result = lemmatize_word(input_text)
        st.write(f"**Lemmatized Word:** {result}")
    else:
        st.warning("Please enter a word.")
