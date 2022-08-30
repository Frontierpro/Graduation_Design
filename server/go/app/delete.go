package main

import (
	"fmt"
	"net/http"
	_"mysql"
	"sqlx"
	"encoding/json"
	"os"
)

func deleteService(response http.ResponseWriter, request *http.Request) {
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

	b, err := sqlx.Open("mysql", "root:jjafah@tcp(192.168.0.4:88)/result")
	if err != nil {
		fmt.Fprintf(response, `{"STATE": -3}`)
		return
	}
	defer b.Close()

	err = b.Ping()
	if err != nil {
		fmt.Fprintf(response, `{"STATE": -3}`)
		return
	}

	var paperList []paperInfo
	_ = d.Select(&paperList, "select * from Paper where User=? and ID=?", params["user"], params["code"])
	if len(paperList) == 0 {
		fmt.Fprintf(response, `{"STATE": 2}`)
	} else {
		_, _ = d.Exec("delete from Paper where User=? and ID=?", params["user"], params["code"])
		_, _ = d.Exec("delete from Reading where User=? and ID=?", params["user"], params["code"])
		_, _ = d.Exec("delete from Listening where User=? and ID=?", params["user"], params["code"])
		_, _ = d.Exec("delete from Speaking where User=? and ID=?", params["user"], params["code"])
		_, _ = d.Exec("delete from Writing where User=? and ID=?", params["user"], params["code"])
		_, _ = b.Exec("delete from Sheet where User=? and ID=?", params["user"], params["code"])
		_, _ = b.Exec("delete from Reading where User=? and ID=?", params["user"], params["code"])
		_, _ = b.Exec("delete from Listening where User=? and ID=?", params["user"], params["code"])
		_, _ = b.Exec("delete from Speaking where User=? and ID=?", params["user"], params["code"])
		_, _ = b.Exec("delete from Writing where User=? and ID=?", params["user"], params["code"])
		os.RemoveAll("data/speaking/" + params["user"] + "_" + params["code"])
		os.RemoveAll("data/writing/" + params["user"] + "_" + params["code"])
		fmt.Fprintf(response, `{"STATE": 0, "EVENT": 0}`)
	}

	return
}
