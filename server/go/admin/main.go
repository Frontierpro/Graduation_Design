package main

import "net/http"

func main() {
	http.HandleFunc("/admin/verify", verifyService)
	http.HandleFunc("/admin/signup", signupService)
	http.HandleFunc("/admin/signin", signinService)
	http.HandleFunc("/admin/setkey", setkeyService)
	http.ListenAndServe(":3000", nil)
}
