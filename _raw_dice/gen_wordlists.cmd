@ECHO OFF
python download_wordlists.py
python dwtojs.py eff_large_wordlist.txt
python dwtojs.py eff_short_wordlist_1.txt
python dwtojs.py eff_short_wordlist_2_0.txt
python dwtojs.py diceware.wordlist.txt
python dwtojs.py beale.wordlist.txt
python dwtojs.py francais.wordlist.txt
python dwtojs.py diceware_german.txt
python dwtojs.py diceware_german_msfw.txt
python dwtojs.py diceware_tr.txt
python dwtojs.py diceware-sv.txt
python dwtojs.py diceware_latin.txt
python dwtojs.py bad-words.txt
pause
