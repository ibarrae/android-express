package com.example.ibarrae.java.utils;

import android.util.Base64;

import com.example.ibarrae.java.dto.LoginDto;

public class HeaderUtils {

    public static String createBasicAuthorizationHeader(LoginDto loginDto) {
        String credentials = loginDto.getUsername() + ":" + loginDto.getPassword();
        return "Basic " + Base64.encodeToString(credentials.getBytes(), Base64.NO_WRAP);
    }

    public static String createBearerAuthorizationHeader(String token) {
        return "Bearer " + token;
    }
}
