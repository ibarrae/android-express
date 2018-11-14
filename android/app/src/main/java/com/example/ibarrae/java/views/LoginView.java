package com.example.ibarrae.java.views;

public interface LoginView {
    void showUserNameError();

    void showPasswordError();

    void showInvalidCredentialsToast();

    void showLoginErrorToast();

    void navigateToUserList();
}
