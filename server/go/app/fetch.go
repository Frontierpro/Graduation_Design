package main

import (
	"fmt"
	"net/http"
	_"mysql"
	"sqlx"
	"encoding/json"
)

func strFormat(resList []resultInfo) string {
	if len(resList) == 0 {
		return "[]"
	}
	str := "["
	for _, res := range resList {
		str += `{"title": "` + res.Title + `", "reply": ` + res.Reply + `}, `
	}
	str = str[0:len(str) - 2] + "]"
	return str
}

func fetchService(response http.ResponseWriter, request *http.Request) {
	decoder := json.NewDecoder(request.Body)
	var user string
	decoder.Decode(&user)

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
	_ = d.Select(&sheetList, "select * from Sheet where User=? and Status=?", user, 1)
	if len(sheetList) == 0 {
		fmt.Fprintf(response, `{"STATE": 0, "EVENT": 4, "DATA": []}`)
		return
	}
	
	data := "["
	for _, sheet := range sheetList {
		reply := `{"code": "` + sheet.ID + `", "name": "` + sheet.Name + `"`

		var readingList []resultInfo
		query := "select * from Reading where User=? and ID=? and Name=?"
		_ = d.Select(&readingList, query, user, sheet.ID, sheet.Name)
		reply += `, "reading": ` + strFormat(readingList)

		var listeningList []resultInfo
		query = "select * from Listening where User=? and ID=? and Name=?"
		_ = d.Select(&listeningList, query, user, sheet.ID, sheet.Name)
		reply += `, "listening": ` + strFormat(listeningList)

		var speakingList []resultInfo
		query = "select * from Speaking where User=? and ID=? and Name=?"
		_ = d.Select(&speakingList, query, user, sheet.ID, sheet.Name)
		reply += `, "speaking": ` + strFormat(speakingList)

		var writingList []resultInfo
		query = "select * from Writing where User=? and ID=? and Name=?"
		_ = d.Select(&writingList, query, user, sheet.ID, sheet.Name)
		reply += `, "writing": ` + strFormat(writingList)

		data += reply + `}, `

		updateStatus := "update Sheet set Status=? where User=? and ID=? and Name=?"
		_, _ = d.Exec(updateStatus, 2, user, sheet.ID, sheet.Name)
		_, _ = d.Exec("delete from Reading where User=? and ID=? and Name=?", user, sheet.ID, sheet.Name)
		_, _ = d.Exec("delete from Listening where User=? and ID=? and Name=?", user, sheet.ID, sheet.Name)
		_, _ = d.Exec("delete from Speaking where User=? and ID=? and Name=?", user, sheet.ID, sheet.Name)
		_, _ = d.Exec("delete from Writing where User=? and ID=? and Name=?", user, sheet.ID, sheet.Name)
	}
	data = data[0:len(data) - 2] + "]"
	fmt.Fprintf(response, `{"STATE": 0, "EVENT": 4, "DATA": ` + data + `}`)

	return
}
