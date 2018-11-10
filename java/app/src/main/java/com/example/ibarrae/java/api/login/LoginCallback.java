package com.example.ibarrae.java.api.login;

import com.example.ibarrae.java.api.BaseCallback;
import com.example.ibarrae.java.dto.LoginResponseDto;
import com.example.ibarrae.java.utils.Constants;
import com.example.ibarrae.java.utils.EspressoIdleHandler;
import com.example.ibarrae.java.views.LoginView;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginCallback extends BaseCallback<LoginView> implements Callback<LoginResponseDto> {

    public LoginCallback(LoginView view) {
        this.view = view;
    }

    @Override
    public void onResponse(Call<LoginResponseDto> call, Response<LoginResponseDto> response) {
        Integer status = response.code();
        if (Constants.OK.equals(status)) {
            view.showLoginSuccessToast();
        } else if (Constants.UNAUTHORIZED.equals(status)) {
            view.showInvalidCredentialsToast();
        } else {
            view.showLoginErrorToast();
        }
        EspressoIdleHandler.decrement();
    }

    @Override
    public void onFailure(Call<LoginResponseDto> call, Throwable t) {
        view.showLoginErrorToast();
        EspressoIdleHandler.decrement();
    }
}
