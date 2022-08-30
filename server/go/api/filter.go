package main

import "regexp"

func letterFilter (str string) string {
	tmp, _ := regexp.Compile(`[A-Z]`)
	res := tmp.ReplaceAllString(str, "*")
	return res
}

func answerFilter (str string) string {
	tmp, _ := regexp.Compile(`([\s]*)\"answer\": \"([A-Z|,|\s]+)\",([\s]*)`)
	res := tmp.ReplaceAllStringFunc(str, letterFilter)
	return res
}

func textFilter (str string, route string) string {
	if route == "listening" {
		tmp, _ := regexp.Compile(`\"text\": \[([\s\S]*)\], \"items\": `)
		return answerFilter(tmp.ReplaceAllString(str, "\"text\": [\"Listening Text ...\"], \"items\": "))
	} else {
		tmp, _ := regexp.Compile(`\"text\": \[([\s\S]+)\], \"title\": `)
		return tmp.ReplaceAllString(str, "\"text\": [\"...\"], \"title\": ")
	}
}
