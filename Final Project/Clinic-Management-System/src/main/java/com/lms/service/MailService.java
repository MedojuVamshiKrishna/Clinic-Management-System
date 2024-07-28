package com.lms.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.lms.model.MailStructure;

@Service
public class MailService {
    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromMail;

    public void sendMail(String mail, MailStructure mailStructure) {
        SimpleMailMessage mailMsg = new SimpleMailMessage();
        mailMsg.setFrom(fromMail);
        mailMsg.setSubject(mailStructure.getSubject());
        mailMsg.setText(mailStructure.getMessage());
        mailMsg.setTo(mail);

        mailSender.send(mailMsg);
    }
}
