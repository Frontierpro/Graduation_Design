package main

import (
	"fmt"
	"net/http"
	_"mysql"
	"sqlx"
	"encoding/json"
	"strings"
)

func getNext(user string, code string, name string, db string, items string) string {
	d, err := sqlx.Open("mysql", "root:jjafah@tcp(192.168.0.4:88)/result")
	if err != nil {
		return "error"
	}
	defer d.Close()

	err = d.Ping()
	if err != nil {
		return "error"
	}

	itemList := strings.Split(items, ",")
	for _, item := range itemList {
		var resultList []resultInfo
		query := "select * from " + db + " where User=? and ID=? and Name=? and Title=?"
		_ = d.Select(&resultList, query, user, code, name, item)
		if len(resultList) == 0 {
			return item
		}
	}

	return ""
}

func getService(response http.ResponseWriter, request *http.Request) {
	decoder := json.NewDecoder(request.Body)
	var params map[string]string
	decoder.Decode(&params)

	response.Header().Set("Content-Type", "application/json")

	if params["db"] == "Ending" {
		status := updateStatus(params["user"], params["code"], params["name"])
		if status == "error" {
			fmt.Fprintf(response, `{"STATE": -3}`)
		} else {
			fmt.Fprintf(response, `{"STATE": 0, "EVENT": 2, "DATA": ""}`)
		}
		return
	}

	d, err := sqlx.Open("mysql", "root:jjafah@tcp(192.168.0.4:88)/sketch")
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

	var sketchList []sketchInfo
	query := "select * from " + params["db"] + " where User=? and ID=?"
	_ = d.Select(&sketchList, query, params["user"], params["code"])
	if len(sketchList) == 0 {
		fmt.Fprintf(response, `{"STATE": 0, "EVENT": 2, "DATA": ""}`)
		return
	}
	item := getNext(params["user"], params["code"], params["name"], params["db"], sketchList[0].Items)
	if item == "error" {
		fmt.Fprintf(response, `{"STATE": -3}`)
	} else {
		fmt.Fprintf(response, `{"STATE": 0, "EVENT": 2, "DATA": "`+ item +`"}`)
	}

	return
}
