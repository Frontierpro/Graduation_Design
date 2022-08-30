package main

import "net/http"

func main() {
	http.HandleFunc("/api/index", indexService)
	http.HandleFunc("/api/get", getService)
	http.ListenAndServe(":4000", nil)
}
