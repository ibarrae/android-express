package com.example.ibarrae.java.api.login;

import com.example.ibarrae.java.dto.LoginResponseDto;
import com.example.ibarrae.java.utils.Constants;

import retrofit2.Call;
import retrofit2.http.Header;
import retrofit2.http.POST;

public interface LoginAPI {

    @POST("/api/login")
    Call<LoginResponseDto> login(@Header(Constants.AUTHORIZATION_HEADER) String credentials);
}
