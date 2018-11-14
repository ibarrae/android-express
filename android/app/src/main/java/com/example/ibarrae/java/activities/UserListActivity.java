package com.example.ibarrae.java.activities;

import android.os.Bundle;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.view.View;

import com.example.ibarrae.java.R;
import com.example.ibarrae.java.adapters.UserAdapter;
import com.example.ibarrae.java.dto.UserResponseDto;
import com.example.ibarrae.java.presenters.user.UserListPresenter;
import com.example.ibarrae.java.presenters.user.UserListPresenterImp;
import com.example.ibarrae.java.views.UserListView;

import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

public class UserListActivity extends AppCompatActivity implements UserListView {

    @BindView(R.id.userListToolbar)
    Toolbar upperToolbar;
    @BindView(R.id.userList)
    RecyclerView userRecyclerView;
    UserListPresenter userListPresenter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_user_list);
        ButterKnife.bind(this);
        setSupportActionBar(upperToolbar);
        userListPresenter = new UserListPresenterImp(this);
        userListPresenter.loadUsers();
    }

    @OnClick(R.id.addUserButton)
    public void onClickAddUserButton(View view) {
        Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                .setAction("Action", null).show();
    }

    @Override
    public void loadUserRecyclerView(List<UserResponseDto> users) {
        UserAdapter userAdapter = new UserAdapter(this, users);
        GridLayoutManager grid = new GridLayoutManager(this, 1);
        userRecyclerView.setLayoutManager(grid);
        userRecyclerView.setAdapter(userAdapter);
    }
}
