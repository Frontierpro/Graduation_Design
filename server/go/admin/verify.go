package main

import (
	"fmt"
	"net/http"
	"redis"
	"math/rand"
	"time"
	"encoding/json"
	"strconv"
)

type smtpResponse struct {
	TTL int64
}

func verifyService(response http.ResponseWriter, request *http.Request) {
	decoder := json.NewDecoder(request.Body)
	var params map[string]string
	decoder.Decode(&params)

	response.Header().Set("Content-Type", "application/json")

	c, err := redis.Dial("tcp", "192.168.0.4:81")
	if err != nil {
		fmt.Fprintf(response, `{"TTL": -1}`)
		return
	}
	defer c.Close()

	pong, _ := c.Do("PING")
	if pong != "PONG" {
		fmt.Fprintf(response, `{"TTL": -1}`)
		return
	}

	rec, _ := c.Do("TTL", params["userName"])
	if rec.(int64) > 0 {
		res, _ := json.Marshal(smtpResponse{TTL: rec.(int64)})
		fmt.Fprintf(response, string(res))
	} else {
		verifyCode := ""
		rand.Seed(time.Now().UnixNano())
		for i := 0; i < 6; i++ {
			verifyCode += strconv.Itoa(rand.Intn(10))
		}

		err := sendMail(params["userName"], verifyCode)
		if err != nil {
			fmt.Fprintf(response, `{"TTL": -2}`)
			return
		}

		_, _ = c.Do("SET", params["userName"], verifyCode)
		_, _ = c.Do("EXPIRE", params["userName"], 60)
		_, _ = c.Do("HSET", "USER_CODE_MAP", params["userName"], verifyCode)
		_, _ = c.Do("SET", verifyCode, params["userName"])
		_, _ = c.Do("EXPIRE", verifyCode, 600)

		fmt.Fprintf(response, `{"TTL": 0}`)
	}

	return
}
