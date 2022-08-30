package main

import (
	"fmt"
	"net/http"
	_"mysql"
	"sqlx"
	"encoding/json"
)

func signinService(response http.ResponseWriter, request *http.Request) {
	decoder := json.NewDecoder(request.Body)
	var params map[string]string
	decoder.Decode(&params)

	response.Header().Set("Content-Type", "application/json")

	userName := md5Encrypto(params["txt"])
	passWord := md5Encrypto(params["pwd"])

	d, err := sqlx.Open("mysql", "root:jjafah@tcp(192.168.0.4:86)/admin")
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

	var userList []userInfo
	_ = d.Select(&userList, "select * from USER_INFO where USERNAME=?", userName)
	if len(userList) == 0 {
		fmt.Fprintf(response, `{"STATE": 1}`)
	} else if userList[0].PassWord == passWord {
		fmt.Fprintf(response, `{"STATE": 0}`)
	} else {
		fmt.Fprintf(response, `{"STATE": 2}`)
	}

	return
}
