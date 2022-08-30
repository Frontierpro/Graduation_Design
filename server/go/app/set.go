package main

import (
	"fmt"
	"net/http"
	_"mysql"
	"sqlx"
	"os"
	"io"
	"encoding/json"
)

func updateStatus(user string, code string, name string) string {
	d, err := sqlx.Open("mysql", "root:jjafah@tcp(192.168.0.4:88)/result")
	if err != nil {
		return "error"
	}
	defer d.Close()

	err = d.Ping()
	if err != nil {
		return "error"
	}

	_, _ = d.Exec("update Sheet set Status=? where User=? and ID=? and Name=?", 1, user, code, name)
	return ""
}

func setService(response http.ResponseWriter, request *http.Request) {
	decoder := json.NewDecoder(request.Body)
	var params map[string]string
	decoder.Decode(&params)

	response.Header().Set("Content-Type", "application/json")

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
	if len(sheetList) > 0 && sheetList[0].Status == 0 {
		insertQuery := "insert into " + params["db"]
		insertQuery += " (User, ID, Name, Title, Reply) values (?, ?, ?, ?, ?)"
		user := params["user"]
		code := params["code"]
		name := params["name"]
		title := params["title"]

		if params["db"] == "Speaking" {
			dir := `"http://106.12.17.34/data/speaking/` + user + "_" + code + "/"
			dir += md5Encrypto(name) + "/" + md5Encrypto(title) + `.wav"`
			_, _ = d.Exec(insertQuery, user, code, name, title, dir)
		} else if params["db"] == "Writing" {
			dir := "data/writing/" + user + "_" + code + "/"
			dir += md5Encrypto(name) + "/" + md5Encrypto(title) + ".txt"
			tar, _ := os.Create(dir)
			defer tar.Close()
			io.WriteString(tar, params["data"][1:len(params["data"]) - 1])
			dir = `"http://106.12.17.34/data/writing/` + user + "_" + code + "/"
			dir += md5Encrypto(name) + "/" + md5Encrypto(title) + `.txt"`
			_, _ = d.Exec(insertQuery, user, code, name, title, dir)
		} else {
			_, _ = d.Exec(insertQuery, user, code, name, title, params["data"])
		}
	}
	fmt.Fprintf(response, `{"STATE": 0, "EVENT": 3}`)

	return
}
