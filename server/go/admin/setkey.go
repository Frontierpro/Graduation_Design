package main

import (
	"fmt"
	"net/http"
	"redis"
	_"mysql"
	"sqlx"
	"encoding/json"
)

func setkeyService(response http.ResponseWriter, request *http.Request) {
	decoder := json.NewDecoder(request.Body)
	var params map[string]string
	decoder.Decode(&params)

	response.Header().Set("Content-Type", "application/json")

	c, err := redis.Dial("tcp", "192.168.0.4:81")
	if err != nil {
		fmt.Fprintf(response, `{"STATE": -1}`)
		return
	}
	defer c.Close()
	rec, _ := c.Do("HGET", "USER_CODE_MAP", params["txt"])
	if rec == nil || string(rec.([]byte)) != params["code"] {
		fmt.Fprintf(response, `{"STATE": 2}`)
		return
	}

	pong, _ := c.Do("PING")
	if pong != "PONG" {
		fmt.Fprintf(response, `{"STATE": -1}`)
		return
	}

	rec, _ = c.Do("TTL", params["code"])
	if rec.(int64) < 0 {
		fmt.Fprintf(response, `{"STATE": 3}`)
	} else {
		_, _ = c.Do("DEL", params["code"])

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
		} else {
			_, _ = d.Exec("update USER_INFO set PASSWORD=? where USERNAME=?", passWord, userName)
			fmt.Fprintf(response, `{"STATE": 0}`)
		}
	}

	return
}
