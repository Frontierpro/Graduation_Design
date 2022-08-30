package main

import (
	"fmt"
	"net/http"
	_"mysql"
	"sqlx"
	"encoding/json"
	"strconv"
	"os"
)

func checkStatus(user string, code string) int {
	d, err := sqlx.Open("mysql", "root:jjafah@tcp(192.168.0.4:88)/sketch")
	if err != nil {
		return -3
	}
	defer d.Close()

	err = d.Ping()
	if err != nil {
		return -3
	}

	var paperList []paperInfo
	_ = d.Select(&paperList, "select * from Paper where User=? and ID=?", user, code)
	if len(paperList) == 0 {
		return 2
	} else {
		return 1 - int(paperList[0].Status)
	}
}

func initService(response http.ResponseWriter, request *http.Request) {
	decoder := json.NewDecoder(request.Body)
	var params map[string]string
	decoder.Decode(&params)

	response.Header().Set("Content-Type", "application/json")

	status := checkStatus(params["user"], params["code"])
	if status != 0 {
		fmt.Fprintf(response, `{"STATE": ` + strconv.Itoa(status) + `}`)
		return
	}

	d, err := sqlx.Open("mysql", "root:jjafah@tcp(192.168.0.4:88)/result")
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

	var sheetList []sheetInfo
	query := "select * from Sheet where User=? and ID=? and Name=?"
	_ = d.Select(&sheetList, query, params["user"], params["code"], params["name"])
	if len(sheetList) > 0 && params["exit"] == "none" {
		fmt.Fprintf(response, `{"STATE": 3}`)
		return
	} else if len(sheetList) == 0 {
		dir := "data/speaking/" + params["user"] + "_" + params["code"] + "/"
		dir += md5Encrypto(params["name"])
		os.Mkdir(dir, 0755)
		dir = "data/writing/" + params["user"] + "_" + params["code"] + "/"
		dir += md5Encrypto(params["name"])
		os.Mkdir(dir, 0755)
		insertQuery := "insert into Sheet (User, ID, Name, Status) values (?, ?, ?, ?)"
		_, _ = d.Exec(insertQuery, params["user"], params["code"], params["name"], 0)
	}
	fmt.Fprintf(response, `{"STATE": 0, "EVENT": 1}`)

	return
}
