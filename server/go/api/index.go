package main

import (
	"fmt"
	"net/http"
	"redis"
	"encoding/json"
	"strings"
)

func indexService(response http.ResponseWriter, request *http.Request) {
	decoder := json.NewDecoder(request.Body)
	var params []string
	decoder.Decode(&params)

	response.Header().Set("Content-Type", "application/json")

	c, err := redis.Dial("tcp", "192.168.0.4:82")
	if err != nil {
		fmt.Fprintf(response, `{"STATE": -1}`)
		return
	}
	defer c.Close()

	pong, _ := c.Do("PING")
	if pong != "PONG" {
		fmt.Fprintf(response, `{"STATE": -1}`)
		return
	}

	args := []interface{}{}
	for _, param := range params {
		args = append(args, param)
	}

	var resList []string
	rec, _ := c.Do("SUNION", args...)
	for _, res := range rec.([]interface{}) {
		resList = append(resList, string(res.([]byte)))
	}

	RES := `["` + strings.Join(resList, `", "`) + `"]`
	fmt.Fprintf(response, `{"STATE": 0, "RES": ` + RES + `}`)

	return
}
