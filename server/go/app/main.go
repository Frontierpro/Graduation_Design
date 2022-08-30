package main

import "net/http"

func main() {
	http.HandleFunc("/app/insert", insertService)
	http.HandleFunc("/app/delete", deleteService)
	http.HandleFunc("/app/update", updateService)
	http.HandleFunc("/app/upload", uploadService)
	http.HandleFunc("/app/init", initService)
	http.HandleFunc("/app/fetch", fetchService)
	http.HandleFunc("/app/get", getService)
	http.HandleFunc("/app/set", setService)
	http.ListenAndServe(":5000", nil)
}
