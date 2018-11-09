package com.example.ibarrae.java.models.dto;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class LoginResponseDto {

    @SerializedName("token")
    @Expose
    private String token;

    public LoginResponseDto(String token) {
        this.token = token;
    }
}
