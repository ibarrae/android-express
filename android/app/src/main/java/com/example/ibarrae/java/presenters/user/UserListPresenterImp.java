package com.example.ibarrae.java.presenters.user;

import com.example.ibarrae.java.models.UserListModel;
import com.example.ibarrae.java.presenters.BasePresenter;
import com.example.ibarrae.java.views.UserListView;

public class UserListPresenterImp extends BasePresenter<UserListView> implements UserListPresenter {

    public UserListPresenterImp(UserListView view) {
        this.view = view;
    }

    public void loadUsers() {
        UserListModel userListModel = new UserListModel(this.view);
        userListModel.getUsers();
    }
}
