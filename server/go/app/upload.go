package main

import (
	"fmt"
	"net/http"
	"os"
	"io"
	"strings"
)

func uploadService(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")

	src, handler, _ := request.FormFile("file")
	defer src.Close()

	nameList := strings.Split(handler.Filename, "?")
	dir := "data/speaking/" + nameList[0] + "/"
	dir += md5Encrypto(nameList[1]) + "/" + md5Encrypto(nameList[2]) + ".wav"
	tar, _ := os.Create(dir)
	defer tar.Close()
	io.Copy(tar, src)

	fmt.Fprintf(response, `{"STATE": 0, "EVENT": 3}`)

	return
}
