package main

import (
	_"mysql"
	"sqlx"
)

func checkAuth(user string) int {
	d, err := sqlx.Open("mysql", "root:jjafah@tcp(192.168.0.4:86)/admin")
	if err != nil {
		return -3
	}
	defer d.Close()

	err = d.Ping()
	if err != nil {
		return -3
	}

	var userList []userInfo
	_ = d.Select(&userList, "select * from USER_INFO where USERNAME=?", user)
	return len(userList)
}
