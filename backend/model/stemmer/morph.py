# coding=utf-8
from __future__ import unicode_literals
__author__ = 'pravesh'


class Morph:

    def read_root_list(self):
        """
        Read root words with their POS (Part-of-Speech) tags.
        
        POS tags classify words grammatically:
        - NN: Noun (घर, मान्छे)
        - VF: Finite Verb (पढ्, जा)  
        - ADJ: Adjective (राम्रो, ठूलो)
        - PPG: Postposition (मा, बाट, लाई)
        - CCON: Coordinating Conjunction (र, तर)
        """
        with open(self.root_file_name, "r", encoding="utf-8") as f:
            content = f.read()
        for word in content.split("\n"):
            if not word.strip():  # Skip empty lines
                continue
            # some of the words have pos information .. e.g. अखानो|NN, some are in the form र|CCON|N
            tokens = word.split("|")
            pos, suffix = "", ""
            if len(tokens) == 1:
                root = tokens[0]
            elif len(tokens) == 2:
                root, pos = tokens
            else:
                root, pos, suffix = tokens[0], tokens[1], tokens[2]
            self.roots.append(root)
            self.pos[root] = pos or None  # Store POS tag for each root
            self.root_suffix[root] = suffix or None

    def read_suffix_list(self):
        """
        Read suffixes mapped to their morphological rule numbers.
        
        Format: suffix|rule_number
        Examples:
        - हरू|1   (plural suffix uses rule 1)
        - लाई|2   (dative case suffix uses rule 2)
        - को|4    (genitive case suffix uses rule 4)
        
        The rule number corresponds to transformation rules in suffix_rule.txt
        """
        with open(self.suffix_file_name, "r", encoding="utf-8") as f:
            content = f.read()
        for word in content.split("\n"):
            if not word.strip():  # Skip empty lines
                continue
            if "|" not in word:  # Skip malformed lines
                continue
            suffix, rule = word.split("|")
            self.suffixes.append(suffix)
            self.suffix_rules[suffix] = rule  # Map suffix to its rule number

    def read_suffix_rule(self):
        """
        Read morphological transformation rules that define how suffixes modify root words.
        
        Rule format: RN SFX(X) sub-rules morph morph-tag ignore
        
        Components:
        - RN: Rule number (1-104, 9998 for default)
        - SFX/SFXX: Rule type (SFX=regular, SFXX=irregular)
        - sub-rules: Number of transformation patterns following
        - morph: The suffix form (हरू, छ, एका)
        - morph-tag: English tag (HRU, CHA, EKO)
        - ignore: Whether to ignore in second parse
        
        Sub-rules define character transformations:
        - "हरू ." means remove हरू, add nothing
        - "ाएका ाउ" means replace ाएका with ाउ
        """
        with open(self.suffix_rule_file_name, "r", encoding="utf-8") as f:
            content = f.read()
        tokens = content.split("\n")
        # Remove all empty lines.
        tokens = [t for t in tokens if t.strip()]
        tokens = list(tokens)  # Convert to list for popping
        while tokens:
            rule = tokens.pop(0)
            parts = rule.split(" ")
            if len(parts) < 6:
                continue  # Skip malformed lines
            num, type_rule, subrule, morph, tag, ignore = parts[:6]
            try:
                num, subrule = int(num), int(subrule)
            except ValueError:
                continue  # Skip lines with invalid numbers
            
            # Store rule metadata and initialize strip_rule list
            self.suffix_rules[num] = dict(type=type_rule, subrule=subrule, morph=morph, tag=tag, ignore=ignore,
                                          strip_rule=[])
            strip_rule = []
            
            # Parse sub-rules that define character transformations
            for i in range(subrule):
                if not tokens:
                    break
                line = tokens.pop(0)
                # regular suffix transformations
                if type_rule == "SFX":
                    parts = line.split(" ")
                    if len(parts) >= 2:
                        delete, insert = parts[0], parts[1]
                        # "." means add/remove nothing
                        strip_rule.append(dict(insert=insert.replace(".", ""), delete=delete))
                # irregular suffix transformations (complex patterns)
                elif type_rule == "SFXX":
                    # todo irregular suffix here
                    pass

            # Sort transformations by length of what to delete (longest first)
            if strip_rule and "delete" in strip_rule[0]:
                strip_rule = sorted(strip_rule, key=lambda sub_rule: len(sub_rule["delete"]))
            self.suffix_rules[num]['strip_rule'] = strip_rule

    def __init__(self, root_file_name, suffix_file_name, suffix_rule_file_name):
        """
        Initialize the morphological analyzer with linguistic data files.

        :param root_file_name: File containing root words with POS tags
        :param suffix_file_name: File mapping suffixes to rule numbers  
        :param suffix_rule_file_name: File defining morphological transformation rules
        """
        # Core data structures
        self.suffix_rule_file_name = suffix_rule_file_name
        self.roots = []                    # List of root words
        self.pos = {}                      # Mapping: root -> POS tag (NN, VF, ADJ, etc.)
        self.root_suffix = {}              # Mapping: root -> suffix (if any)

        self.root_file_name = root_file_name
        # Load root words and their POS tags
        self.read_root_list()

        # Suffix processing
        self.suffixes = []                 # List of suffix forms
        self.suffix_rules = {}             # Mapping: suffix -> rule_number OR rule_number -> rule_data
        self.suffix_file_name = suffix_file_name
        self.read_suffix_list()           # Load suffix -> rule mappings
        self.read_suffix_rule()           # Load rule definitions and transformations

