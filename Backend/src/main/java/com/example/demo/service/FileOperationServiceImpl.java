package com.example.demo.service;

import java.util.Arrays;

import org.springframework.stereotype.Service;

@Service
public class FileOperationServiceImpl implements FileOperationService {

	@Override
	public String convertToCamelCase(String data) {
		StringBuilder result = new StringBuilder();

		String[] words = data.split("\\s+");

		for (int i = 0; i < words.length; i++) {
			String word = words[i];

			word = Character.toUpperCase(word.charAt(0)) + word.substring(1);

			result.append(word);

			if (i < words.length - 1) {
				result.append(" ");
			}
		}

		return result.toString();
	}

	@Override
	public String sortWord(String word, int exclusionNumber) {
		if (exclusionNumber >= word.length()) {
			return word;
		}

		String excludedCharacters = word.substring(0, exclusionNumber);
		String remainingCharacters = word.substring(exclusionNumber);
		char[] sortedChars = remainingCharacters.toCharArray();
		Arrays.sort(sortedChars);

		return excludedCharacters + new String(sortedChars);
	}

}
