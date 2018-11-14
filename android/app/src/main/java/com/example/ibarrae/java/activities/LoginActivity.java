package com.example.ibarrae.java.activities;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.EditText;

import com.example.ibarrae.java.R;
import com.example.ibarrae.java.dto.LoginDto;
import com.example.ibarrae.java.presenters.login.LoginPresenter;
import com.example.ibarrae.java.presenters.login.LoginPresenterImp;
import com.example.ibarrae.java.utils.ToastUtils;
import com.example.ibarrae.java.utils.ViewUtils;
import com.example.ibarrae.java.views.LoginView;

import butterknife.BindString;
import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;
import butterknife.Optional;

public class LoginActivity extends AppCompatActivity implements LoginView {

    @BindView(R.id.etUsername)
    EditText etUsername;
    @BindView(R.id.etPassword)
    EditText etPassword;
    @BindString(R.string.error_missing_username)
    String missingUsername;
    @BindString(R.string.error_missing_password)
    String missingPassword;
    @BindString(R.string.error_invalid_credentials)
    String invalidCredentials;
    @BindString(R.string.error_login)
    String loginError;
    @BindString(R.string.success_login)
    String loginSuccessful;
    LoginPresenter loginPresenter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        ButterKnife.bind(this);
        this.loginPresenter = new LoginPresenterImp(this);
    }

    @Override
    public void showUserNameError() {
        ViewUtils.showEditTextError(etUsername, missingUsername);
    }

    @Override
    public void showPasswordError() {
        ViewUtils.showEditTextError(etPassword, missingPassword);
    }

    @Optional
    @OnClick(R.id.btnLogin)
    public void onLogin() {
        String username = ViewUtils.getText(etUsername);
        String password = ViewUtils.getText(etPassword);
        this.loginPresenter.submitLogin(new LoginDto(username, password));
    }

    @Override
    public void showInvalidCredentialsToast() {
        ToastUtils.longDuration(this, invalidCredentials);
    }

    @Override
    public void showLoginErrorToast() {
        ToastUtils.longDuration(this, loginError);
    }

    @Override
    public void navigateToUserList() {
        Intent navigateToUserList = new Intent(getApplicationContext(), UserListActivity.class);
        startActivity(navigateToUserList);
    }
}
