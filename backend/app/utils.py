from random import random
from datetime import datetime
from pathlib import Path
from functools import lru_cache

base_path = Path(__file__).parent.resolve()

class WordManager:
    def __init__(self, words_file=f"{base_path}/data/words.txt", history_file=f"{base_path}/data/word_history.txt"):
        self.words_file = words_file
        self.history_file = history_file
        self.current_word = None
        self.last_update = None
        self._load_last_word()

    def _load_last_word(self):
        try:
            with open(self.history_file, 'r', encoding='utf-8') as f:
                lines = f.readlines()
                if lines:
                    last_line = lines[-1].strip()
                    date_str, word = last_line.split(" - ", 1)
                    self.last_update = datetime.strptime(date_str, "%Y-%m-%d %H:%M:%S")
                    self.current_word = word
        except FileNotFoundError:
            pass 

    def _save_word(self, word):
        with open(self.history_file, 'a', encoding='utf-8') as f:
            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            f.write(f"{timestamp} - {word}\n")

    def _get_random_word(self):
        try:
            with open(self.words_file, 'r', encoding='utf-8') as file:
                word = None
                count = 0
                
                for line in file:
                    current_word = line.strip()
                    if current_word: 
                        count += 1
                        if random() < 1/count:
                            word = current_word
                            
                return word if count > 0 else None
        except FileNotFoundError:
            print(f"Ошибка: Файл {self.words_file} не найден")
            return None
        except Exception as e:
            print(f"Произошла ошибка: {str(e)}")
            return None
    
    def get_current_word(self):
        now = datetime.now()
        if self.last_update is None or (now - self.last_update).days >= 1:
            self.current_word = self._get_random_word()
            self.last_update = now
            if self.current_word:
                self._save_word(self.current_word)
        return self.current_word


@lru_cache(maxsize=150)
def is_word_real(target_word: str):
    target_word = target_word.lower()
    with open(f'{base_path}/data/many_words.txt', 'r', encoding='utf-8') as file:
        for word in file:
            word = word[:-1]
            if word == target_word:
                return True
        return False
    