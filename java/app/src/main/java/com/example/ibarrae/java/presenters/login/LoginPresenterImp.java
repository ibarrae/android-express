package com.example.ibarrae.java.presenters.login;

import android.text.TextUtils;

import com.example.ibarrae.java.dto.LoginDto;
import com.example.ibarrae.java.presenters.BasePresenter;
import com.example.ibarrae.java.views.LoginView;

public class LoginPresenterImp extends BasePresenter<LoginView> implements LoginPresenter {

    public LoginPresenterImp(LoginView loginView) {
        this.view = loginView;
    }

    @Override
    public void submitLogin(LoginDto loginDto) {
        if (TextUtils.isEmpty(loginDto.getUsername())) {
            view.showUserNameError();
            return;
        }
        if (TextUtils.isEmpty(loginDto.getPassword())) {
            view.showPasswordError();
            return;
        }
    }

}
