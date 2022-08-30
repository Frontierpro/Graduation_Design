package main

import (
	"gomail"
	"crypto/tls"
	"strconv"
)

func sendMail(userName string, verifyCode string) error {
	conn := map[string]string{
		"user": "metahost@163.com",
		"pass": "FGSNUBKWHDWEAIFD",
		"host": "smtp.163.com",
		"port": "465",
	}

	port, _ := strconv.Atoi(conn["port"])

	htmlBody := "【系统邮件，请勿回复】<br/>"
	htmlBody += "【META-TPO】账号验证码: <b>" + verifyCode + "</b><br/>"
	htmlBody += "&nbsp;10分钟内有效，且只能使用一次，请妥善保管;<br/>"
	htmlBody += "&nbsp;若未进行任何【META-TPO】客户端验证码申领操作，<br/>&nbsp;请忽略此邮件!"

	msg := gomail.NewMessage()
	msg.SetHeader("From", msg.FormatAddress(conn["user"], "META-TPO"))
	msg.SetHeader("To", userName)
	msg.SetHeader("Subject", "META-TPO 账号邮箱验证")
	msg.SetBody("text/html", htmlBody)

	d := gomail.NewDialer(conn["host"], port, conn["user"], conn["pass"])
	d.TLSConfig = &tls.Config{InsecureSkipVerify: true}
	err := d.DialAndSend(msg)
	return err
}
