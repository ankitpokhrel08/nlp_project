# Nepali Morphological Analyzer 🇳🇵

A comprehensive morphological analysis tool for the Nepali language that can identify root words, suffixes, and grammatical patterns in Nepali text. This tool includes both a Python library and a web-based Streamlit interface.

## Features

- **Root Word Identification**: Analyze Nepali words to find their root forms
- **Suffix Analysis**: Identify grammatical suffixes and their morphological rules
- **Part-of-Speech Tagging**: Determine grammatical categories of words
- **Morphological Rules**: Apply 100+ transformation rules for Nepali morphology
- **Web Interface**: Easy-to-use Streamlit web application
- **Batch Processing**: Analyze multiple words or entire texts

## Core Concepts

### POS (Part-of-Speech) Tags

POS tags classify words into grammatical categories. This analyzer uses the following POS tags:

| POS Tag  | Full Name                | Description                       | Examples                        |
| -------- | ------------------------ | --------------------------------- | ------------------------------- |
| **NN**   | Noun                     | Common nouns                      | घर (house), मान्छे (person)     |
| **VF**   | Finite Verb              | Main verbs with tense/person      | पढ् (read), जा (go)             |
| **ADJ**  | Adjective                | Descriptive words                 | राम्रो (good), ठूलो (big)       |
| **ADR**  | Adverb                   | Modifies verbs/adjectives         | बिस्तारै (slowly)               |
| **PN**   | Proper Noun              | Names of people/places            | राम (Ram), काठमाडौं (Kathmandu) |
| **PPG**  | Postposition             | Nepali equivalent of prepositions | मा (in), बाट (from), लाई (to)   |
| **CCON** | Coordinating Conjunction | Connecting words                  | र (and), तर (but)               |

### Morphological Rules

Rules define how suffixes transform root words. Each rule has:

- **Rule Number**: Unique identifier (1-104, plus 9998 for default)
- **Rule Type**: SFX (regular) or SFXX (irregular transformations)
- **Sub-rules**: Number of transformation patterns
- **Morph**: The actual suffix form
- **Tag**: English abbreviation of the suffix
- **Transformations**: How to strip/add characters

#### Rule Examples:

```
1 SFX 1 हरू HRU N     # Rule 1: Plural suffix
हरू .                  # Remove हरू, add nothing to get root

7 SFX 2 छ CHA N       # Rule 7: Present tense suffix
ँछ .                   # Remove ँछ, add nothing
छ .                    # Remove छ, add nothing

11 SFX 3 एका EKO Y     # Rule 11: Past participle (complex)
एका ाउ               # Replace ाएका with ाउ
ेका ्                  # Replace ेका with ्
एका .                  # Remove एका, add nothing
```

### Rule Application Examples:

| Word  | Suffix | Rule | Root | Transformation           |
| ----- | ------ | ---- | ---- | ------------------------ |
| घरहरू | हरू    | 1    | घर   | Remove हरू → घर          |
| पढ्छ  | छ      | 7    | पढ्  | Remove छ → पढ्           |
| गरेका | एका    | 11   | गर्  | Replace ेका with ् → गर् |

## Dataset

The tool uses linguistic data from:

- **Root Words**: Over 20,000 Nepali root words from Brihat Nepali Shabdakosh (courtesy of Dr. Nobal Bikram Niraula)
- **Morphological Rules**: Comprehensive suffix transformation rules for Nepali grammar
- **POS Tags**: Part-of-speech information for grammatical analysis

## Installation

1. Clone the repository:

```bash
git clone https://github.com/PraveshKoirala/stemmer.git
cd stemmer
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

## Usage

### Web Interface (Streamlit)

Run the Streamlit web application:

```bash
streamlit run app.py
```

The web interface provides:

- **Single Word Analysis**: Analyze individual Nepali words
- **Multiple Words**: Batch analysis of word lists
- **Text Analysis**: Full text morphological analysis
- **Search Functionality**: Search through root words and suffixes
- **Export Options**: Download results as CSV

### Python Library

Use the morphological analyzer in your Python code:

```python
from morph import Morph

# Initialize the analyzer
morph = Morph(
    root_file_name="files/root",
    suffix_file_name="files/suffix.txt",
    suffix_rule_file_name="files/suffix_rule.txt"
)

# Access root words
print(f"Total roots: {len(morph.roots)}")
print(f"Sample roots: {morph.roots[:5]}")

# Access suffixes and rules
print(f"Total suffixes: {len(morph.suffixes)}")
print(f"Sample suffixes: {morph.suffixes[:5]}")

# Check if a word is a root
word = "घर"
if word in morph.roots:
    pos = morph.pos.get(word, "Unknown")
    print(f"'{word}' is a root word with POS: {pos}")
```

## File Structure

```
stemmer/
├── app.py                    # Streamlit web application
├── morph.py                  # Core morphological analyzer
├── main.py                   # Main script (currently minimal)
├── requirements.txt          # Python dependencies
├── files/
│   ├── root                  # Root words with POS tags (20,000+ words)
│   ├── suffix.txt           # Suffix list with rule mappings
│   ├── suffix_rule.txt      # Morphological transformation rules
│   ├── new_root.txt         # Additional root words
│   └── shabdakosh-words.txt # Original dictionary words
└── utils/
    ├── __init__.py
    └── root.py              # Utility functions for word processing
```

## Data Format

### Root Words (`files/root`)

```
घर|NN              # Root word with POS tag (Noun)
राम्रो|ADJ          # Adjective
पढ्|VF             # Verb (finite)
```

### Suffixes (`files/suffix.txt`)

```
हरू|1              # Plural suffix mapped to rule 1
लाई|2              # Dative case suffix mapped to rule 2
को|4               # Genitive case suffix mapped to rule 4
```

### Suffix Rules (`files/suffix_rule.txt`)

```
1 SFX 1 हरू HRU N   # Rule 1: SFX type, 1 sub-rule, morpheme हरू, tag HRU
हरू .              # Sub-rule: remove हरू, add nothing
```

## Morphological Analysis Examples

| Input Word | Root   | Suffix | POS | Analysis                   |
| ---------- | ------ | ------ | --- | -------------------------- |
| घरहरू      | घर     | हरू    | NN  | Plural noun                |
| राम्रोलाई  | राम्रो | लाई    | ADJ | Adjective with dative case |
| पढ्छु      | पढ्    | छु     | VF  | First person singular verb |

## Technical Details

### POS Tags Used

- **NN**: Noun
- **VF**: Finite Verb
- **ADJ**: Adjective
- **ADR**: Adverb
- **PN**: Proper Noun
- **PPG**: Postposition
- **CCON**: Coordinating Conjunction

### Rule Types

- **SFX**: Regular suffix transformation rules
- **SFXX**: Irregular suffix transformation rules

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Acknowledgments

- Dr. Nobal Bikram Niraula for the Brihat Nepali Shabdakosh word list
- Original morphological rules based on Nepali grammar research
- Devanagari script support for Unicode Nepali text

## License

This project is available for educational and research purposes. Please acknowledge the data sources when using this tool in academic work.

## Author

**Pravesh Koirala** - Original implementation of the morphological analyzer
