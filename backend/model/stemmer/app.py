# coding=utf-8
import streamlit as st
import os
import re
import pandas as pd
from morph import Morph

# Set page config
st.set_page_config(
    page_title="Nepali Morphological Analyzer",
    page_icon="🇳🇵",
    layout="centered"
)

# Cache the morphological analyzer to avoid reloading files
@st.cache_resource
def load_morph_analyzer():
    """Load the morphological analyzer with all required files."""
    try:
        root_file = "files/root"
        suffix_file = "files/suffix.txt"
        suffix_rule_file = "files/suffix_rule.txt"
        
        # Check if files exist
        if not all(os.path.exists(f) for f in [root_file, suffix_file, suffix_rule_file]):
            st.error("Required data files not found. Please ensure all files are in the 'files' directory.")
            return None
            
        morph = Morph(root_file, suffix_file, suffix_rule_file)
        return morph
    except Exception as e:
        st.error(f"Error loading morphological analyzer: {str(e)}")
        return None

def analyze_word(morph, word):
    """Analyze a single Nepali word."""
    if not morph or not word.strip():
        return None
    
    word = word.strip()
    results = {
        'word': word,
        'is_root': False,
        'analyses': []
    }
    
    # Check if the word is directly in the root list
    if word in morph.roots:
        results['is_root'] = True
        pos = morph.pos.get(word, "Unknown")
        results['analyses'].append({
            'type': 'Root Word',
            'root': word,
            'suffix': '',
            'pos': pos,
            'rule': ''
        })
    
    # Try to find possible roots by removing suffixes
    for suffix in morph.suffixes:
        if word.endswith(suffix) and len(word) > len(suffix):
            potential_root = word[:-len(suffix)]
            if potential_root in morph.roots:
                pos = morph.pos.get(potential_root, "Unknown")
                rule = morph.suffix_rules.get(suffix, "Unknown")
                results['analyses'].append({
                    'type': 'Root + Suffix',
                    'root': potential_root,
                    'suffix': suffix,
                    'pos': pos,
                    'rule': rule
                })
    
    return results

def main():
    st.title("🇳🇵 Nepali Morphological Analyzer")
    st.markdown("### Analyze Nepali words to find their roots and grammatical structure")
    
    # Load the morphological analyzer
    with st.spinner("Loading analyzer..."):
        morph = load_morph_analyzer()
    
    if not morph:
        st.error("Failed to load the morphological analyzer.")
        st.stop()
    
    # Input section
    st.subheader("� Enter your input:")
    
    input_text = st.text_area(
        "Enter a word, multiple words, or a paragraph in Nepali:",
        placeholder="Examples:\n• Single word: घर\n• Multiple words: घर किताब पढ्छु\n• Paragraph: म घरमा किताब पढ्छु।",
        height=100
    )
    
    if input_text.strip():
        # Extract words from input (remove punctuation and split)
        words = re.findall(r'[\u0900-\u097F]+', input_text)
        
        if not words:
            st.warning("No Nepali words found in the input.")
            return
        
        st.subheader("📊 Analysis Results:")
        
        # Display statistics
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric("Total Words", len(words))
        
        analyzed_words = []
        root_count = 0
        analyzed_count = 0
        
        for word in words:
            result = analyze_word(morph, word)
            if result:
                analyzed_words.append(result)
                if result['is_root']:
                    root_count += 1
                if result['analyses']:
                    analyzed_count += 1
        
        with col2:
            st.metric("Root Words", root_count)
        with col3:
            st.metric("Analyzed Words", analyzed_count)
        
        # Display detailed results
        st.subheader("🔍 Detailed Analysis:")
        
        # Prepare data for the table
        table_data = []
        for result in analyzed_words:
            word = result['word']
            if not result['analyses']:
                # Word not found in database
                table_data.append({
                    'Word': word,
                    'Analysis Type': 'Unknown',
                    'Root': '-',
                    'Suffix': '-',
                    'Part of Speech': 'Not found',
                    'Rule': '-'
                })
            else:
                # Add each analysis as a separate row
                for analysis in result['analyses']:
                    table_data.append({
                        'Word': word,
                        'Analysis Type': analysis['type'],
                        'Root': analysis['root'],
                        'Suffix': analysis['suffix'] if analysis['suffix'] else '-',
                        'Part of Speech': analysis['pos'],
                        'Rule': analysis['rule'] if analysis['rule'] else '-'
                    })
        
        # Create and display the DataFrame
        if table_data:
            df = pd.DataFrame(table_data)
            
            # Style the dataframe for better readability
            st.dataframe(
                df,
                use_container_width=True,
                hide_index=True,
                column_config={
                    "Word": st.column_config.TextColumn("Word", width="medium"),
                    "Analysis Type": st.column_config.TextColumn("Type", width="medium"),
                    "Root": st.column_config.TextColumn("Root", width="medium"),
                    "Suffix": st.column_config.TextColumn("Suffix", width="small"),
                    "Part of Speech": st.column_config.TextColumn("POS", width="small"),
                    "Rule": st.column_config.TextColumn("Rule", width="small")
                }
            )
            
            # Download option
            csv = df.to_csv(index=False)
            st.download_button(
                label="📥 Download results as CSV",
                data=csv,
                file_name="nepali_morphological_analysis.csv",
                mime="text/csv"
            )

if __name__ == "__main__":
    main()
