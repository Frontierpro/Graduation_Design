package main

import (
	"fmt"
	"net/http"
	_"mysql"
	"sqlx"
	"encoding/json"
	"strconv"
)

func getService(response http.ResponseWriter, request *http.Request) {
	decoder := json.NewDecoder(request.Body)
	var params map[string]string
	decoder.Decode(&params)

	response.Header().Set("Content-Type", "application/json")

	route := params["route"]
	src := params["src"]
	user := params["user"]
	section := params["section"]
	id := params["id"]

	auth := 0
	if src == "cc" {
		auth = checkAuth(user)
	}
	if auth < 0 {
		fmt.Fprintf(response, `{"STATE": ` + strconv.Itoa(auth) + `}`)
		return
	}

	d, err := sqlx.Open("mysql", "root:jjafah@tcp(192.168.0.4:87)/tpo")
	if err != nil {
		fmt.Fprintf(response, `{"STATE": -3}`)
		return
	}
	defer d.Close()

	err = d.Ping()
	if err != nil {
		fmt.Fprintf(response, `{"STATE": -3}`)
		return
	}

	var textList []textInfo

	if route == "reading" {
		_ = d.Select(&textList, "select * from reading where section=? and id=?", section, id)
	} else if route == "listening" {
		_ = d.Select(&textList, "select * from listening where section=? and id=?", section, id)
	} else if route == "speaking" {
		_ = d.Select(&textList, "select * from speaking where section=? and id=?", section, id)
	} else {
		_ = d.Select(&textList, "select * from writing where section=? and id=?", section, id)
	}

	if auth > 0 {
		fmt.Fprintf(response, `{"STATE": 0, "DATA": `+ textList[0].Dist + `}`)
	} else if route == "reading" {
		fmt.Fprintf(response, `{"STATE": 0, "DATA": `+ answerFilter(textList[0].Dist) + `}`)
	} else {
		fmt.Fprintf(response, `{"STATE": 0, "DATA": `+ textFilter(textList[0].Dist, route) + `}`)
	}

	return
}
