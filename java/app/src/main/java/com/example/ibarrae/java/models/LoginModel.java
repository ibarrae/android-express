package com.example.ibarrae.java.models;

import com.example.ibarrae.java.dto.LoginDto;
import com.example.ibarrae.java.models.api.LoginAPI;
import com.example.ibarrae.java.models.api.RetrofitClient;
import com.example.ibarrae.java.models.api.callback.LoginCallback;
import com.example.ibarrae.java.models.dto.LoginResponseDto;
import com.example.ibarrae.java.utils.HeaderUtils;
import com.example.ibarrae.java.views.LoginView;

import retrofit2.Call;

public class LoginModel extends BaseModel<LoginView> {

    public LoginModel(LoginView view) {
        super(view);
    }

    public void login(LoginDto loginDto) {
        LoginAPI loginService = new RetrofitClient().getService(LoginAPI.class);
        LoginCallback loginCallback = new LoginCallback(super.view);
        Call<LoginResponseDto> loginCall = loginService
                .login(HeaderUtils.createBasicAuthorizationHeader(loginDto));
        loginCall.enqueue(loginCallback);
    }
}
