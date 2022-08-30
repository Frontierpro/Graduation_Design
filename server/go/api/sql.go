package main

type userInfo struct {
	UserName string `db:"USERNAME"`
	PassWord string `db:"PASSWORD"`
}

type textInfo struct {
	Section uint8 `db:"section"`
	Id uint8 `db:"id"`
	Dist string `db:"dist"`
}
