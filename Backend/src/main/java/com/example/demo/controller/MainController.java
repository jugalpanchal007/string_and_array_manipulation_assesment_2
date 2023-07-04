package com.example.demo.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.service.FileOperationService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class MainController {

	@Autowired
	FileOperationService fileOperationService;

	@PostMapping("/convert")
	public Map<String, String> convertFile(@RequestParam("file") MultipartFile file) {
		Map<String, String> response = new HashMap<>();

		if (file.isEmpty()) {
			response.put("error", "File is empty");
			return response;
		}

		try {
			String data = new String(file.getBytes());

			response.put("originalData", data);
			response.put("uppercaseData", data.toUpperCase());
			response.put("lowercaseData", data.toLowerCase());
			response.put("camelCaseData", fileOperationService.convertToCamelCase(data));

			return response;
		} catch (Exception e) {
			response.put("error", "Failed to convert file");
			return response;
		}
	}

	@PostMapping("/sort")
	public String sortWordsFromFile(@RequestParam("file") MultipartFile file,
			@RequestParam("exclusionNumber") int exclusionNumber) {
		List<String> words = readWordsFromFile(file);
		List<String> sortedWords = words.stream().map(word -> fileOperationService.sortWord(word, exclusionNumber))
				.collect(Collectors.toList());

		return StringUtils.collectionToDelimitedString(sortedWords, " ");
	}

	private List<String> readWordsFromFile(MultipartFile file) {
		List<String> words = new ArrayList<>();

		try {
			InputStream inputStream = file.getInputStream();
			BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));

			String line;
			while ((line = reader.readLine()) != null) {
				words.addAll(Arrays.asList(line.split("\\s+")));
			}

			reader.close();
			inputStream.close();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return words;
	}

}
