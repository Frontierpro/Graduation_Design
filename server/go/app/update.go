package main

import (
	"fmt"
	"net/http"
	_"mysql"
	"sqlx"
	"encoding/json"
	"strconv"
)

func updateService(response http.ResponseWriter, request *http.Request) {
	decoder := json.NewDecoder(request.Body)
	var params map[string]string
	decoder.Decode(&params)

	response.Header().Set("Content-Type", "application/json")

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

	var paperList []paperInfo
	_ = d.Select(&paperList, "select * from Paper where User=? and ID=?", params["user"], params["code"])
	if len(paperList) == 0 {
		fmt.Fprintf(response, `{"STATE": 2}`)
	} else {
		status := 1 - paperList[0].Status
		updateStatus := "update Paper set Status=? where User=? and ID=?"
		_, _ = d.Exec(updateStatus, status, params["user"], params["code"])
		fmt.Fprintf(response, `{"STATE": 0, "EVENT": ` + strconv.Itoa(int(3 - status)) + `}`)
	}

	return
}
