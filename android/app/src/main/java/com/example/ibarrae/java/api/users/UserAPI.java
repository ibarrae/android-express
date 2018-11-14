package com.example.ibarrae.java.api.users;

import com.example.ibarrae.java.dto.UserResponseDto;
import com.example.ibarrae.java.utils.Constants;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Header;

public interface UserAPI {

    @GET("/api/users")
    Call<List<UserResponseDto>> getUsers(@Header(Constants.AUTHORIZATION_HEADER) String token);
}
