package main

type userInfo struct {
	UserName string `db:"USERNAME"`
	PassWord string `db:"PASSWORD"`
}
