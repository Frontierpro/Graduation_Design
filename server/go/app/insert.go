package main

import (
	"fmt"
	"net/http"
	_"mysql"
	"sqlx"
	"encoding/json"
	"strings"
	"os"
)

type Info struct {
	User string
	Code string
	Title string
	Reading []string
	Listening []string
	Speaking []string
	Writing []string
}

func insertService(response http.ResponseWriter, request *http.Request) {
	decoder := json.NewDecoder(request.Body)
	var info Info
	decoder.Decode(&info)

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
	_ = d.Select(&paperList, "select * from Paper where User=? and ID=?", info.User, info.Code)
	if len(paperList) > 0 {
		fmt.Fprintf(response, `{"STATE": 1}`)
	} else {
		insertTitle := "insert into Paper (User, ID, Title, Status) values (?, ?, ?, ?)"
		_, _ = d.Exec(insertTitle, info.User, info.Code, info.Title, 1)
		if len(info.Reading) > 0 {
			insertReading := "insert into Reading (User, ID, Items) values (?, ?, ?)"
			_, _ = d.Exec(insertReading, info.User, info.Code, strings.Join(info.Reading, ","))
		}
		if len(info.Listening) > 0 {
			insertListening := "insert into Listening (User, ID, Items) values (?, ?, ?)"
			_, _ = d.Exec(insertListening, info.User, info.Code, strings.Join(info.Listening, ","))
		}
		if len(info.Speaking) > 0 {
			insertSpeaking := "insert into Speaking (User, ID, Items) values (?, ?, ?)"
			_, _ = d.Exec(insertSpeaking, info.User, info.Code, strings.Join(info.Speaking, ","))
		}
		if len(info.Writing) > 0 {
			insertWriting := "insert into Writing (User, ID, Items) values (?, ?, ?)"
			_, _ = d.Exec(insertWriting, info.User, info.Code, strings.Join(info.Writing, ","))
		}
		os.Mkdir("data/speaking/" + info.User + "_" + info.Code, 0755)
		os.Mkdir("data/writing/" + info.User + "_" + info.Code, 0755)
		fmt.Fprintf(response, `{"STATE": 0, "EVENT": 1}`)
	}

	return
}
