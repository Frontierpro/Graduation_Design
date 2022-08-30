package main

type paperInfo struct {
	User string `db:"User"`
	ID string `db:"ID"`
	Title string `db:"Title"`
	Status uint8 `db:"Status"`
}

type sheetInfo struct {
	User string `db:"User"`
	ID string `db:"ID"`
	Name string `db:"Name"`
	Status uint8 `db:"Status"`
}

type sketchInfo struct {
	User string `db:"User"`
	ID string `db:"ID"`
	Items string `db:"Items"`
}

type resultInfo struct {
	User string `db:"User"`
	ID string `db:"ID"`
	Name string `db:"Name"`
	Title string `db:"Title"`
	Reply string `db:"Reply"`
}
